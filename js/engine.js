import {kmeans} from './kmeans.js';
import {kmedoids} from './kmedoids.js';
import {objective} from './utils.js';
export const algorithms={kmeans,kmedoids};
export const createState=()=>({phase:'original',iteration:0,reps:[],previous:[],labels:[],status:'Ready',objective:null,stable:false});
// Bước 3–5: một lần gọi = đúng một phase. Update tuyệt đối không Assignment lại.
export function nextStep(state,points,k,name){
  if(['Converged','Limit reached'].includes(state.status))return state;
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
