import {customers,features} from './data.js';
import {pointsFrom} from './utils.js';
import {createState,nextStep,run} from './engine.js';
import {scatter,elbow,representativeMoved} from './charts.js';
import {compare} from './compare.js';
const $=id=>document.getElementById(id);
// Bước 8: một global state giữ lựa chọn; engine giữ riêng trạng thái thuật toán.
const appState={activeTab:'explore',featureX:'income',featureY:'spending',k:5,algorithm:'kmeans',lab:createState(),timer:null};
const points=()=>pointsFrom(customers,appState.featureX,appState.featureY);
const chartOptions=()=>({xLabel:features[appState.featureX],yLabel:features[appState.featureY],xFeature:appState.featureX,yFeature:appState.featureY});
const fmt=n=>n===null?'—':n.toLocaleString('en-US',{maximumFractionDigits:2});
function pause(){clearInterval(appState.timer);appState.timer=null;$('auto').textContent='Auto Run';}
function renderLab(){
 const s=appState.lab,means=appState.algorithm==='kmeans';
 scatter($('labChart'),points(),{...chartOptions(),...s,algorithm:appState.algorithm});
 $('labTitle').textContent=`${means?'K-Means':'K-Medoids'} · Step-by-step`;
 $('status').textContent=s.status;$('iteration').textContent=s.iteration;
 $('objectiveLabel').textContent=means?'WCSS':'Total Dissimilarity';$('objective').textContent=fmt(s.objective);
 $('representative').textContent=means?'Centroid':'Medoid';
 const explanations={original:'Dữ liệu chưa có cluster label. Nhấn Next Step để Initialize.',initialize:`Đã chọn ${appState.k} representatives bằng deterministic farthest-first. Chưa Assignment nên các customer vẫn cùng màu.`,assignment:'Assignment: gán mỗi observation vào representative gần nhất theo Euclidean distance. Representative giữ nguyên ở bước này.',update:means?'Update: tính mean của các observations trong từng cluster để di chuyển centroid. Giữ nguyên labels; lần Next Step tiếp theo mới Assignment lại.':'Update: chọn observation có tổng distance nhỏ nhất trong từng cluster làm medoid. Giữ nguyên labels ở phase này.',converged:'Converged: representatives đã ổn định sau Update. Dừng thuật toán; đây là nghiệm local, không bảo đảm global optimum.'};
 $('explanation').textContent=explanations[s.phase]+(s.phase==='update'&&s.stable?' Representatives đã ổn định; Next Step sẽ xác nhận Converged.':'');
 $('movementHint').hidden=s.phase!=='update'||!s.reps.some((r,i)=>representativeMoved(r,s.previous[i]));
 $('phases').innerHTML=['original','initialize','assignment','update','converged'].map(p=>`<span class="${s.phase===p?'current':''}">${p}</span>`).join('');
 const done=['Converged','Limit reached'].includes(s.status);$('next').disabled=done;$('auto').disabled=done;
 $('representativeList').innerHTML=s.reps.map((r,i)=>`<div class="metric"><span>Cluster ${i+1}${means?'':` · ID ${r.id}`}</span><b>(${fmt(r.x)}, ${fmt(r.y)})</b></div>`).join('');
}
function resetLab(){pause();appState.lab=createState();renderLab();}
function step(){appState.lab=nextStep(appState.lab,points(),appState.k,appState.algorithm);renderLab();if(['Converged','Limit reached'].includes(appState.lab.status))pause();}
function renderComparison(){
 const out=$('outliers').checked,result=compare(points(),appState.k,out);
 $('compareContext').textContent=`Cùng ${result.data.length} observations · K = ${appState.k}`;
 for(const [name,chart,metric] of [['kmeans','kmChart','kmMetrics'],['kmedoids','medChart','medMetrics']]){
  const s=result[name];scatter($(chart),result.data,{...chartOptions(),...s,algorithm:name});
  $(metric).innerHTML=`<div class="metric"><span>Iterations / Status</span><b>${s.iteration} / ${s.status}</b></div><div class="metric"><span>${name==='kmeans'?'WCSS':'Total Dissimilarity'}</span><b>${fmt(s.objective)}</b></div>`;
 }
 $('experimentNote').textContent=out?'Experiment: thêm 3 synthetic outliers (×) vào bản sao dataset; cả hai phương pháp chạy lại cùng input, K và initialization rule. Outliers có thể thay đổi cả initialization lẫn kết quả. Quan sát tác động, không mặc định K-Medoids luôn bất biến.':'Baseline: 200 customers gốc, cùng feature pair, K và Euclidean distance. Bật Inject 3 Outliers để chạy lại; tắt để quay về baseline.';
}
function refreshFeatures(){
 scatter($('exploreChart'),points(),chartOptions());resetLab();renderComparison();
 $('elbowChart').classList.add('empty');$('elbowChart').textContent='Chọn Calculate Elbow để tính WCSS cho feature pair hiện tại.';$('elbowValues').replaceChildren();
}
for(const axis of ['X','Y'])$('feature'+axis).addEventListener('change',()=>{
 const other=axis==='X'?'Y':'X';
 // Nếu hai feature trùng nhau, swap feature còn lại để luôn có hai trục khác nhau.
 if($('feature'+axis).value===$('feature'+other).value)$('feature'+other).value=appState['feature'+axis];
 appState.featureX=$('featureX').value;appState.featureY=$('featureY').value;refreshFeatures();
});
$('k').addEventListener('change',()=>{appState.k=Number($('k').value);resetLab();renderComparison();});
$('algorithm').addEventListener('change',()=>{appState.algorithm=$('algorithm').value;resetLab();});
$('reset').addEventListener('click',resetLab);
$('next').addEventListener('click',()=>{pause();step();});
$('auto').addEventListener('click',()=>{if(appState.timer){pause();return;}step();if(appState.lab.status==='Converged')return;appState.timer=setInterval(step,800);$('auto').textContent='Pause';});
// Auto Run gọi đúng cùng step(), không chạy một phiên bản thuật toán khác.
for(const b of document.querySelectorAll('.tab'))b.addEventListener('click',()=>{pause();appState.activeTab=b.dataset.tab;$('kControl').hidden=!['lab','compare'].includes(appState.activeTab);for(const page of document.querySelectorAll('.page'))page.hidden=page.id!==appState.activeTab;for(const tab of document.querySelectorAll('.tab')){const active=tab===b;tab.classList.toggle('active',active);if(active)tab.setAttribute('aria-current','page');else tab.removeAttribute('aria-current');}});
$('calculate').addEventListener('click',()=>{
 const values=Array.from({length:8},(_,i)=>run(points(),i+1,'kmeans').objective);
 $('elbowChart').classList.remove('empty');elbow($('elbowChart'),values);
 $('elbowValues').innerHTML='<table><thead><tr><th>K</th><th>WCSS</th></tr></thead><tbody>'+values.map((v,i)=>`<tr><td>${i+1}</td><td>${fmt(v)}</td></tr>`).join('')+'</tbody></table>';
});
$('outliers').addEventListener('change',renderComparison);
$('sampleRows').innerHTML=customers.slice(0,5).map(r=>`<tr><td>${r.id}</td><td>${r.gender}</td><td>${r.age}</td><td>${r.income}</td><td>${r.spending}</td></tr>`).join('');
refreshFeatures();
