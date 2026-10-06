import {initialize,assign,groups,distance} from './utils.js';
export const initializeCentroids = initialize;
export const assignToCentroids = assign;
// Bước 4: lấy mean từng coordinate. Cluster rỗng giữ representative cũ để tránh NaN.
export const updateCentroids = (points,labels,reps) => groups(points,labels,reps.length).map((g,j)=>g.length?{
  x:g.reduce((s,p)=>s+p.x,0)/g.length,
  y:g.reduce((s,p)=>s+p.y,0)/g.length
}:reps[j]);
export const checkKMeansConvergence = (before,after) => after.every((r,i)=>distance(r,before[i])<1e-9);
export const kmeans = {initialize:initializeCentroids,assign:assignToCentroids,update:updateCentroids,converged:checkKMeansConvergence,squared:true};
