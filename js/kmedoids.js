import {initialize,assign,distance,objective} from './utils.js?v=20261012-pam';
export const initializeMedoids=initialize;
export const assignToMedoids=assign;
export const SWAP_EPSILON=1e-9;
// PAM SWAP: every medoid can exchange with EVERY non-medoid, across clusters.
// The nearest/second-nearest distances give the exact reassigned cost of a swap.
export function evaluateSwaps(points,reps){
 const labels=assign(points,reps),before=objective(points,labels,reps,false);
 const medoidIds=new Set(reps.map(r=>r.id));
 const candidates=points.filter(p=>!medoidIds.has(p.id));
 const distances=candidates.map(c=>points.map(p=>distance(p,c)));
 const nearest=points.map((p,i)=>distance(p,reps[labels[i]]));
 const second=points.map((p,i)=>Math.min(...reps.filter((_,j)=>j!==labels[i]).map(r=>distance(p,r))));
 const swaps=[];
 for(let medoidIndex=0;medoidIndex<reps.length;medoidIndex++){
  candidates.forEach((incoming,c)=>{
   let after=0;
   for(let i=0;i<points.length;i++)after+=Math.min(distances[c][i],labels[i]===medoidIndex?second[i]:nearest[i]);
   swaps.push({medoidIndex,outgoing:reps[medoidIndex],incoming,before,after,delta:after-before});
  });
 }
 // Stable order resolves ties by medoid slot, then input order.
 swaps.sort((a,b)=>a.delta-b.delta);
 return {best:swaps[0]??null,swaps,count:swaps.length};
}
export function applySwap(reps,swap){return reps.map((r,i)=>i===swap.medoidIndex?{...swap.incoming}:r);}
export const kmedoids={initialize:initializeMedoids,assign:assignToMedoids,squared:false};
