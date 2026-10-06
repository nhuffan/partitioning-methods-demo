import {run} from './engine.js';
// Bước 7: tạo bản sao; không sửa 200 customers gốc. Giá trị cố ý ngoài miền gốc.
export function injectOutliers(points){
 const xs=points.map(p=>p.x),ys=points.map(p=>p.y),maxX=Math.max(...xs),maxY=Math.max(...ys),dx=maxX-Math.min(...xs)||1,dy=maxY-Math.min(...ys)||1;
 return [...points,...[[maxX+dx*.5,maxY+dy*.4],[maxX+dx*.65,maxY+dy*.55],[maxX+dx*.8,maxY+dy*.7]].map(([x,y],i)=>({id:`S${i+1}`,x,y,synthetic:true}))];
}
export function compare(points,k,outliers=false){const data=outliers?injectOutliers(points):[...points];return{data,kmeans:run(data,k,'kmeans'),kmedoids:run(data,k,'kmedoids')};}
