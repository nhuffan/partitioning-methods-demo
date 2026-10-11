import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateSwaps,applySwap,SWAP_EPSILON} from '../js/kmedoids.js';
import {assign,objective,pointsFrom,initialize} from '../js/utils.js';
import {createState,nextStep,run} from '../js/engine.js';
import {customers} from '../js/data.js';
import {injectOutliers} from '../js/compare.js';
const cost=(p,r)=>objective(p,assign(p,r),r,false);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
function verifyAll(p,reps){
 const e=evaluateSwaps(p,reps);assert.equal(e.count,reps.length*(p.length-reps.length));
 for(const swap of e.swaps){const after=cost(p,applySwap(reps,swap));near(swap.after,after);near(swap.delta,after-cost(p,reps));}
 if(e.best)near(e.best.after,Math.min(...e.swaps.map(s=>cost(p,applySwap(reps,s)))));
 return e;
}
test('PAM exact swap costs match independent reassignment, including cross-cluster, ties, k=1 and k=n',()=>{
 const p=[0,2,3,10,12,30].map((x,i)=>({id:i,x,y:0}));
 for(let k=1;k<=p.length;k++)verifyAll(p,initialize(p,k));
 const same=p.map(r=>({...r,x:0}));assert.equal(run(same,2,'kmedoids').iteration,0);
 const small=[0,2,10].map((x,i)=>({id:i,x,y:0}));const best=verifyAll(small,[small[0]]).best;
 assert.equal(best.incoming.id,1);near(best.delta,-2);
 assert.equal(run(p,p.length,'kmedoids').iteration,0);
});
test('PAM phase isolation, accepted swap cost, deterministic path and single-swap optimality',()=>{
 for(const [x,y] of [['income','spending'],['age','income'],['age','spending']])for(const out of [false,true])for(let k=1;k<=8;k++){
  let p=pointsFrom(customers,x,y);if(out)p=injectOutliers(p);
  let s=createState(),steps=0;
  while(s.status!=='Converged'&&steps++<200){const before=s;s=nextStep(s,p,k,'kmedoids');
   if(s.phase==='swap-evaluation'){assert.deepEqual(s.reps,before.reps);assert.deepEqual(s.labels,before.labels);assert.equal(s.objective,before.objective);assert.equal(s.evaluation.count,k*(p.length-k));}
   if(s.phase==='best-swap'&&!s.stable){assert.equal(s.reps.filter((r,i)=>r.id!==before.reps[i].id).length,1);assert.ok(s.swap.delta<-SWAP_EPSILON);near(s.objective-before.objective,s.swap.delta);assert.deepEqual(s.labels,assign(p,s.reps));}
   if(s.phase==='best-swap'&&s.stable)assert.deepEqual(s.reps,before.reps);
  }
  assert.equal(s.status,'Converged');assert.deepEqual(nextStep(s,p,k,'kmedoids'),s);
  const final=verifyAll(p,s.reps);assert.ok(!final.best||final.best.delta>=-SWAP_EPSILON);
  assert.equal(s.evaluationRounds,s.iteration+1);assert.deepEqual(run(p,k,'kmedoids'),s);
 }
});
test('Default PAM baseline/outliers and unchanged K-Means reference results',()=>{
 const p=pointsFrom(customers,'income','spending'),base=run(p,5,'kmedoids'),out=run(injectOutliers(p),5,'kmedoids');
 near(base.objective,2619.347867360262);assert.equal(base.iteration,8);assert.deepEqual(base.reps.map(r=>r.id),[25,81,167,162,16]);
 near(out.objective,3079.3383144568384);assert.equal(out.iteration,6);
 const km=run(p,5,'kmeans');near(km.objective,66674.36000494967);assert.equal(km.iteration,6);
 near(run(injectOutliers(p),5,'kmeans').objective,74982.60496247192);
});
