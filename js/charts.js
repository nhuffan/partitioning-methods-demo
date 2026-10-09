export const colors=['#5145cd','#dc4266','#00866b','#bd710a','#8c49bd','#087f9b','#657b16','#a53555'];
const text=(x,y,value,extra='')=>`<text x="${x}" y="${y}" ${extra}>${value}</text>`;
// Shared threshold keeps movement arrows and their explanation consistent.
export const representativeMoved=(point,previous)=>Boolean(previous)&&Math.hypot(point.x-previous.x,point.y-previous.y)>1e-8;
// Start at zero; preserve the score scale and expand for all rendered observations.
export function scatterDomain(values,feature){
 const maximum=Math.max(0,...values);
 if(feature==='spending'&&maximum<=100)return [0,100];
 const padded=Math.max(1,maximum*1.12);
 const magnitude=10**Math.floor(Math.log10(padded));
 const step=magnitude/5;
 return [0,Math.ceil(padded/step)*step];
}
export function scatter(el,points,{labels=[],reps=[],previous=[],algorithm='kmeans',xLabel,yLabel,xFeature,yFeature}={}){
 const W=720,H=440,L=66,R=24,T=28,B=65,all=[...points,...reps,...previous];
 const [xmin,xmax]=scatterDomain(all.map(p=>p.x),xFeature),[ymin,ymax]=scatterDomain(all.map(p=>p.y),yFeature);
 const sx=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),sy=y=>H-B-(y-ymin)/(ymax-ymin)*(H-T-B);
 let z=`<svg role="img" aria-label="Scatter plot ${xLabel} và ${yLabel}" viewBox="0 0 ${W} ${H}"><defs><marker id="arrow-${el.id}" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#18243d"/></marker></defs>`;
 for(let i=0;i<=5;i++){const x=xmin+(xmax-xmin)*i/5,y=ymin+(ymax-ymin)*i/5;z+=`<path d="M${sx(x)},${T} V${H-B} M${L},${sy(y)} H${W-R}" stroke="#e8ebf2" fill="none"/>`+text(sx(x),H-B+22,x.toFixed(0),'text-anchor="middle"')+text(L-10,sy(y)+4,y.toFixed(0),'text-anchor="end"');}
 z+=text((W+L-R)/2,H-12,xLabel,'text-anchor="middle"')+`<text transform="translate(16 ${(H+T-B)/2}) rotate(-90)" text-anchor="middle">${yLabel}</text>`;
 points.forEach((p,i)=>{const c=labels.length?colors[labels[i]]:'#8390a6';const title=`${p.synthetic?'Synthetic outlier':'Customer'} ${p.id} | ${xLabel}: ${p.x} | ${yLabel}: ${p.y}${labels.length?' | Cluster '+(labels[i]+1):''}`;z+=p.synthetic?`<g class="outlier" stroke="${c}" stroke-width="3"><title>${title}</title><path d="M${sx(p.x)-6},${sy(p.y)-6} l12,12 m0,-12 l-12,12"/></g>`:`<circle class="customer" cx="${sx(p.x)}" cy="${sy(p.y)}" r="4.5" fill="${c}" opacity=".85"><title>${title}</title></circle>`;});
 reps.forEach((p,i)=>{const old=previous[i];if(representativeMoved(p,old))z+=`<line x1="${sx(old.x)}" y1="${sy(old.y)}" x2="${sx(p.x)}" y2="${sy(p.y)}" stroke="#18243d" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow-${el.id})"/>`;
 z+=`<g class="representative"><title>${algorithm==='kmeans'?'Centroid':'Medoid customer '+p.id} · Cluster ${i+1} · (${p.x.toFixed(2)}, ${p.y.toFixed(2)})</title>`+text(sx(p.x),sy(p.y)+8,algorithm==='kmeans'?'★':'◆',`text-anchor="middle" style="font-size:27px;fill:${colors[i]};stroke:white;stroke-width:2.5;paint-order:stroke"`)+text(sx(p.x)+12,sy(p.y)-10,i+1,'style="font-weight:700;fill:#172033"')+'</g>';});
 el.innerHTML=z+'</svg><div class="legend">● Customer &nbsp; ★ Centroid &nbsp; ◆ Medoid &nbsp; × Synthetic outlier'+(labels.length?'<br>'+reps.map((_,i)=>`<span style="color:${colors[i]}">● Cluster ${i+1}</span>`).join(' &nbsp; '):'')+'</div>';
}
export function elbow(el,values){
 const W=720,H=420,L=82,T=25,B=55,R=24,max=Math.max(...values)*1.05,sx=i=>L+i/7*(W-L-R),sy=v=>H-B-v/max*(H-T-B);
 let z=`<svg role="img" aria-label="Elbow chart K từ 1 đến 8" viewBox="0 0 ${W} ${H}">`;
 for(let j=0;j<=5;j++){const v=max*j/5;z+=`<line x1="${L}" x2="${W-R}" y1="${sy(v)}" y2="${sy(v)}" stroke="#e8ebf2"/>`+text(L-10,sy(v)+4,Math.round(v).toLocaleString('en-US'),'text-anchor="end"');}
 z+=`<polyline points="${values.map((v,i)=>`${sx(i)},${sy(v)}`).join(' ')}" fill="none" stroke="#5145cd" stroke-width="3"/>`;
 values.forEach((v,i)=>{z+=`<circle cx="${sx(i)}" cy="${sy(v)}" r="6" fill="#5145cd"><title>K=${i+1}; WCSS=${v.toFixed(2)}</title></circle>`+text(sx(i),H-B+24,i+1,'text-anchor="middle"');});
 el.innerHTML=z+text(W/2,H-9,'K','text-anchor="middle"')+text(L,16,'WCSS')+'</svg>';
}
