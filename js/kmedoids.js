import {initialize,assign,groups,distance} from './utils.js';
export const initializeMedoids=initialize;
export const assignToMedoids=assign;
// Bước 4: thử mỗi observation trong cluster, chọn tổng Euclidean distance nhỏ nhất.
// Đây là alternating K-Medoids, không phải PAM (không có global swap-search).
export const updateMedoids=(points,labels,reps)=>groups(points,labels,reps.length).map((g,j)=>{
  if(!g.length)return reps[j];
  const cost=c=>g.reduce((s,p)=>s+distance(p,c),0);
  // Giữ medoid hiện tại khi tie để không dao động giữa các nghiệm cùng cost.
  let best=g.find(p=>p.id===reps[j].id)||g[0], bestCost=cost(best);
  for(const candidate of g){const value=cost(candidate);if(value<bestCost-1e-9){best=candidate;bestCost=value;}}
  return {...best};
});
export const checkKMedoidsConvergence=(before,after)=>after.every((r,i)=>r.id===before[i].id);
export const kmedoids={initialize:initializeMedoids,assign:assignToMedoids,update:updateMedoids,converged:checkKMedoidsConvergence,squared:false};
