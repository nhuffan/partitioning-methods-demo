import {customers,features} from './data.js?v=20261012-pam';
import {pointsFrom} from './utils.js?v=20261012-pam';
import {createState,nextStep,run} from './engine.js?v=20261012-pam';
import {scatter,elbow,representativeMoved} from './charts.js?v=20261012-pam';
import {compare} from './compare.js?v=20261012-pam';
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
 $('labTitle').textContent=`${means?'K-Means':'PAM (K-Medoids)'} · Step-by-step`;
 $('iterationLabel').textContent=means?'Iteration':'Accepted swaps';
 $('status').textContent=s.status;$('iteration').textContent=s.iteration;
 $('objectiveLabel').textContent=means?'SSE':'E (Total Distance)';$('objective').textContent=fmt(s.objective);
 $('representative').textContent=means?'Centroid':'Medoid';
 const explanations=means?{
  original:'Dữ liệu gốc chưa được phân cụm, chưa có centroid và chưa được gán vào bất kỳ cụm nào.',
  initialize:`Thuật toán chọn ra ${appState.k} centroid ban đầu. Mỗi centroid là 1 cụm, nó được khởi tạo bằng phương pháp Farthest-First, tức là lần lượt ưu tiên chọn những điểm nằm xa các centroid đã chọn trước đó.`,
  assignment:`Tính khoảng cách từ mỗi khách hàng đến ${appState.k} centroid, sau đó gán khách hàng vào cụm có centroid gần nhất.`,
  update:'Thuật toán tính lại vị trí của từng centroid bằng cách lấy trung bình tọa độ các khách hàng trong cụm.',
  converged:'Quá trình này lặp đi lặp lại cho đến khi các centroid không còn thay đổi, tức là thuật toán đã hội tụ.'
 }:{
  original:'Dữ liệu chưa có cluster label. Nhấn Next Step để Initialize.',
  initialize:'Khác với centroid, medoid luôn là một điểm dữ liệu thực tế, tức là một khách hàng trong bộ dữ liệu.',
  assignment:'Mỗi khách hàng được gán vào medoid gần nhất theo khoảng cách Euclidean.',
  'swap-evaluation':'PAM sẽ thử thay từng medoid bằng một điểm dữ liệu khác và tính lại tổng khoảng cách từ các khách hàng đến medoid gần nhất. Mục tiêu là tìm cách làm cho tổng khoảng cách này nhỏ nhất. Nếu Delta E âm, nghĩa là tổng khoảng cách sau khi hoán đổi đã giảm.',
  'best-swap':'Sau khi thử các phép hoán đổi, thuật toán sẽ chọn phép đổi giúp tổng khoảng cách từ các khách hàng đến medoid gần nhất giảm nhiều nhất. Nếu có phép đổi giúp giảm tổng khoảng cách, PAM sẽ thực hiện phép đổi đó và tiếp tục kiểm tra các khả năng hoán đổi khác. Quá trình này lặp lại cho đến khi không còn phép hoán đổi nào giúp giảm tổng khoảng cách nữa. Khi đó, thuật toán hội tụ và dừng lại.',
  converged:`PAM đã thực hiện ${s.iteration} lần hoán đổi medoid thành công qua ${s.evaluationRounds??0} lượt đánh giá và cuối cùng hội tụ. Lúc này, tổng khoảng cách từ ${customers.length} khách hàng đến các medoid gần nhất là ${s.objective===null?'—':s.objective.toLocaleString('vi-VN',{minimumFractionDigits:2,maximumFractionDigits:2})}. Đây cũng chính là giá trị mà PAM cố gắng giảm trong suốt quá trình phân cụm.`
 };
 $('explanation').textContent=explanations[s.phase];
 $('movementHint').hidden=!(means?s.phase==='update':s.phase==='best-swap')||!s.reps.some((r,i)=>representativeMoved(r,s.previous[i]));
 $('movementHint').textContent=means?'Mũi tên nét đứt cho thấy centroid di chuyển ở bước Update. ':'Mũi tên nét đứt cho thấy medoid cũ → medoid mới ở bước Best Swap. ';
 const phases=means?['original','initialize','assignment','update','converged']:['original','initialize','assignment','swap-evaluation','best-swap','converged'];
 $('phases').innerHTML=phases.map(p=>`<span class="${s.phase===p?'current':''}">${p.replaceAll('-',' ').replace(/\b\w/g,c=>c.toUpperCase())}</span>`).join('');
 $('pamDetails').hidden=means;
 if(!means){
  const e=s.evaluation,best=e?.best;
  $('pamDetails').innerHTML=`<div class="metric"><span>Evaluation rounds / Pairs tested</span><b>${s.evaluationRounds??0} / ${s.evaluatedSwaps??0}</b></div>`;
  if(e){
   $('pamDetails').innerHTML+=`<p>${e.count} cặp trong vòng này · ΔE = E_mới − E_cũ</p>`;
   if(best)$('pamDetails').innerHTML+=`<div class="note">${s.phase==='swap-evaluation'?'Đề xuất':s.stable?'Không nhận':'Đã nhận'}: ID ${best.outgoing.id} → ID ${best.incoming.id}<br>E: ${fmt(best.before)} → ${fmt(best.after)}<br><b>ΔE = ${best.delta.toFixed(6)}</b></div><details><summary>5 cặp có ΔE nhỏ nhất</summary><table><thead><tr><th>Ra → vào</th><th>ΔE</th></tr></thead><tbody>${e.swaps.slice(0,5).map(v=>`<tr><td>${v.outgoing.id} → ${v.incoming.id}</td><td>${v.delta.toFixed(6)}</td></tr>`).join('')}</tbody></table></details>`;
   else $('pamDetails').innerHTML+='<p>Không có non-medoid để hoán đổi.</p>';
  }
 }

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
  $(metric).innerHTML=`<div class="metric"><span>${name==='kmeans'?'Iterations':'Accepted swaps'} / Status</span><b>${s.iteration} / ${s.status}</b></div><div class="metric"><span>${name==='kmeans'?'SSE':'E (Total Distance from Customers to Their Nearest Medoid)'}</span><b>${fmt(s.objective)}</b></div>`+(name==='kmedoids'?`<div class="metric"><span>Evaluation rounds / Pairs tested</span><b>${s.evaluationRounds} / ${s.evaluatedSwaps}</b></div><div class="metric"><span>Final best ΔE (not accepted)</span><b>${s.swap?s.swap.delta.toFixed(6):'—'}</b></div>`:'');
 }
 $('experimentNote').textContent=out?'Experiment: thêm 3 synthetic outliers (×) vào bản sao dataset; cả hai phương pháp chạy lại cùng input, K và initialization rule. Outliers có thể thay đổi cả initialization lẫn kết quả. Quan sát tác động, không mặc định K-Medoids luôn bất biến.':'Baseline: 200 customers gốc, cùng feature pair, K và Euclidean distance. Bật Inject 3 Outliers để chạy lại; tắt để quay về baseline.';
}
function refreshFeatures(){
 scatter($('exploreChart'),points(),chartOptions());resetLab();renderComparison();
 $('elbowChart').classList.add('empty');$('elbowChart').textContent='Chọn Calculate Elbow để tính SSE cho feature pair hiện tại.';$('elbowValues').replaceChildren();
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
$('auto').addEventListener('click',()=>{if(appState.timer){pause();return;}step();if(['Converged','Limit reached'].includes(appState.lab.status))return;appState.timer=setInterval(step,800);$('auto').textContent='Pause';});
// Auto Run gọi đúng cùng step(), không chạy một phiên bản thuật toán khác.
for(const b of document.querySelectorAll('.tab'))b.addEventListener('click',()=>{pause();appState.activeTab=b.dataset.tab;$('kControl').hidden=!['lab','compare'].includes(appState.activeTab);for(const page of document.querySelectorAll('.page'))page.hidden=page.id!==appState.activeTab;for(const tab of document.querySelectorAll('.tab')){const active=tab===b;tab.classList.toggle('active',active);if(active)tab.setAttribute('aria-current','page');else tab.removeAttribute('aria-current');}});
$('calculate').addEventListener('click',()=>{
 const values=Array.from({length:8},(_,i)=>run(points(),i+1,'kmeans').objective);
 $('elbowChart').classList.remove('empty');elbow($('elbowChart'),values);
 $('elbowValues').innerHTML='<table><thead><tr><th>K</th><th>SSE</th></tr></thead><tbody>'+values.map((v,i)=>`<tr><td>${i+1}</td><td>${fmt(v)}</td></tr>`).join('')+'</tbody></table>';
});
$('outliers').addEventListener('change',renderComparison);
$('sampleRows').innerHTML=customers.slice(0,5).map(r=>`<tr><td>${r.id}</td><td>${r.gender}</td><td>${r.age}</td><td>${r.income}</td><td>${r.spending}</td></tr>`).join('');
refreshFeatures();
