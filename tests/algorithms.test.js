import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {customers} from '../js/data.js';
import {pointsFrom,assign,objective} from '../js/utils.js';
import {createState,nextStep,run} from '../js/engine.js';
import {compare} from '../js/compare.js';
import {updateCentroids} from '../js/kmeans.js';
import {updateMedoids} from '../js/kmedoids.js';
test('200 records khớp toàn bộ CSV Kaggle',()=>{
 const rows=readFileSync(new URL('../assets/Mall_Customers.csv',import.meta.url),'utf8').trim().split(/\r?\n/).slice(1);
 assert.equal(rows.length,200);assert.equal(new Set(customers.map(r=>r.id)).size,200);
 rows.forEach((line,i)=>{const [id,gender,age,income,spending]=line.split(',');assert.deepEqual(customers[i],{id:+id,gender,age:+age,income:+income,spending:+spending});});
});
for(const name of ['kmeans','kmedoids'])test(`${name}: phase riêng, objective không tăng, convergence đúng mọi features/K`,()=>{
 for(const [x,y] of [['income','spending'],['age','income'],['age','spending']])for(let k=1;k<=8;k++){
  const p=pointsFrom(customers,x,y);let s=createState(),oldObjective=Infinity,count=0;
  while(s.status!=='Converged'&&count++<500){const before=s;s=nextStep(s,p,k,name);
   if(s.phase==='update')assert.deepEqual(s.labels,before.labels);
   if(s.phase==='assignment')assert.deepEqual(s.reps,before.reps);
   if(s.objective!==null){assert.ok(s.objective<=oldObjective+1e-7);oldObjective=s.objective;}
   if(name==='kmedoids')assert.ok(s.reps.every(r=>p.some(v=>v.id===r.id&&v.x===r.x&&v.y===r.y)));
  }
  assert.equal(s.status,'Converged');assert.deepEqual(s.labels,assign(p,s.reps));assert.equal(s.objective,objective(p,s.labels,s.reps,name==='kmeans'));assert.deepEqual(run(p,k,name),s);
 }
});
test('Update trên dữ liệu nhỏ có đáp án biết trước; cluster rỗng',()=>{
 const p=[{id:1,x:0,y:0},{id:2,x:2,y:0},{id:3,x:10,y:0}],reps=[p[0],{id:4,x:99,y:99}];
 assert.equal(updateCentroids(p,[0,0,0],reps)[0].x,4);
 assert.equal(updateMedoids(p,[0,0,0],reps)[0].id,2);
 assert.deepEqual(updateCentroids(p,[0,0,0],reps)[1],reps[1]);
});
test('Outlier comparison không mutate dataset; bật/tắt phục hồi baseline',()=>{
 const p=pointsFrom(customers,'income','spending'),snapshot=JSON.stringify(p),base=compare(p,5),experiment=compare(p,5,true);
 assert.equal(experiment.data.length,203);assert.equal(experiment.data.filter(p=>p.synthetic).length,3);assert.equal(JSON.stringify(p),snapshot);assert.deepEqual(compare(p,5),base);
 for(const name of ['kmeans','kmedoids'])assert.equal(experiment[name].status,'Converged');
});
