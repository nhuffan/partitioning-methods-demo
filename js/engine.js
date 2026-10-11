import {kmeans} from './kmeans.js?v=20261012-pam';
import {kmedoids,evaluateSwaps,applySwap,SWAP_EPSILON} from './kmedoids.js?v=20261012-pam';
import {objective} from './utils.js?v=20261012-pam';
export const algorithms={kmeans,kmedoids};
export const createState=()=>({phase:'original',iteration:0,reps:[],previous:[],labels:[],status:'Ready',objective:null,stable:false});
// Bước 3–5: một lần gọi = đúng một phase. Update tuyệt đối không Assignment lại.
export function nextStep(state,points,k,name){
  if(['Converged','Limit reached'].includes(state.status))return state;
  if(name==='kmedoids')return nextPamStep(state,points,k);
  const s={...state},a=algorithms[name];s.previous=[];s.status='Running';
  if(s.phase==='original'){s.reps=a.initialize(points,k);s.phase='initialize';}
  else if(s.phase==='initialize'||(s.phase==='update'&&!s.stable)){
    s.labels=a.assign(points,s.reps);s.phase='assignment';
  }else if(s.phase==='assignment'){
    s.previous=s.reps;s.reps=a.update(points,s.labels,s.reps);s.iteration++;
    s.stable=a.converged(s.previous,s.reps);s.phase='update';
    if(s.iteration>=200&&!s.stable)s.status='Limit reached';
  }else if(s.phase==='update'&&s.stable){s.phase='converged';s.status='Converged';}
  s.objective=objective(points,s.labels,s.reps,a.squared);return s;
}
export function run(points,k,name){let s=createState();while(!['Converged','Limit reached'].includes(s.status))s=nextStep(s,points,k,name);return s;}

// PAM has its own state machine; K-Means phase behavior is unchanged.
function nextPamStep(state,points,k){
 const s={...state,previous:[],status:'Running'};
 if(s.phase==='original'){
  s.reps=kmedoids.initialize(points,k);s.phase='initialize';s.evaluationRounds=0;s.evaluatedSwaps=0;s.swapHistory=[];s.evaluation=null;s.swap=null;
 }else if(s.phase==='initialize'||s.phase==='best-swap'&&!s.stable){
  s.labels=kmedoids.assign(points,s.reps);s.phase='assignment';s.evaluation=null;s.swap=null;
 }else if(s.phase==='assignment'){
  s.evaluation=evaluateSwaps(points,s.reps);s.evaluationRounds++;s.evaluatedSwaps+=s.evaluation.count;s.phase='swap-evaluation';
 }else if(s.phase==='swap-evaluation'){
  s.swap=s.evaluation.best;s.stable=!s.swap||s.swap.delta>=-SWAP_EPSILON;s.phase='best-swap';
  if(!s.stable){
   s.previous=s.reps;s.reps=applySwap(s.reps,s.swap);
   // Reassign now so the displayed objective is exactly the evaluated E_new.
   s.labels=kmedoids.assign(points,s.reps);s.iteration++;
   s.swapHistory=[...s.swapHistory,s.swap];
   if(s.iteration>=200)s.status='Limit reached';
  }
 }else if(s.phase==='best-swap'&&s.stable){s.phase='converged';s.status='Converged';}
 s.objective=objective(points,s.labels,s.reps,false);return s;
}
