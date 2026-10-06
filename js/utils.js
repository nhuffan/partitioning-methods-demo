// Bước 2: chuyển feature đã chọn thành tọa độ; không dùng ID/Gender để clustering.
export const pointsFrom = (rows, x, y) => rows.map(r => ({...r, x:r[x], y:r[y]}));
export const distance = (a,b) => Math.hypot(a.x-b.x,a.y-b.y);
export const nearest = (p,reps) => reps.reduce((best,r,i) => distance(p,r)<distance(p,reps[best]) ? i:best,0);
export const assign = (points,reps) => points.map(p => nearest(p,reps));
// Deterministic farthest-first: cùng dữ liệu/thứ tự/K luôn cho cùng initialization.
export function initialize(points,k) {
  if (!Number.isInteger(k) || k<1 || k>points.length) throw Error('K không hợp lệ');
  const reps=[points[Math.floor(points.length*.1)]];
  while(reps.length<k) {
    const remaining=points.filter(p=>!reps.includes(p));
    reps.push(remaining.reduce((best,p)=>Math.min(...reps.map(r=>distance(p,r)))>Math.min(...reps.map(r=>distance(best,r)))?p:best));
  }
  return reps.map(p=>({...p}));
}
export const objective = (points,labels,reps,squared) => labels.length ? points.reduce((s,p,i)=>s+distance(p,reps[labels[i]])**(squared?2:1),0):null;
export const groups = (points,labels,k) => Array.from({length:k},(_,j)=>points.filter((p,i)=>labels[i]===j));
