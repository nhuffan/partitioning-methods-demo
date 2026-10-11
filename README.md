# Partitioning Methods Lab

Web demo: khám phá 200 khách hàng, khảo sát K, chạy từng phase của K-Means và PAM (K-Medoids), so sánh khi có outliers.

## Chạy demo

Cần Python 3; mở terminal tại thư mục repo:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Mở http://127.0.0.1:5500. Dừng bằng Ctrl+C. Nếu có Node.js/npm, có thể dùng `npm run dev` với cùng tác dụng. Không cần cài package hay backend; web chạy offline. Không mở trực tiếp `index.html` vì sử dụng JavaScript ES modules.

## Kiểm tra thuật toán

Cần Node.js:

```bash
npm test
```

## Dataset

[CSV gốc](assets/Mall_Customers.csv) gồm 200 records và 5 thuộc tính. [Nguồn và checksum](assets/SOURCE.md). Chỉ hai numerical features được chọn trên giao diện tham gia clustering; dữ liệu dùng raw scale.

PAM đánh giá mọi cặp medoid–non-medoid, nhận best swap nếu ΔE < −1e−9 và dừng khi không còn swap cải thiện. Theo cấu hình demo, Farthest-First được giữ nguyên thay cho BUILD cổ điển. Elbow dùng K-Means với deterministic initialization và có thể cho local optimum. WCSS và Total Dissimilarity khác đơn vị, không dùng độ lớn của chúng để xếp hạng hai thuật toán.


## Kịch bản demo

[Hướng dẫn demo từng bước](docs/DEMO_STEP_BY_STEP_VI.md) có lời trình bày, các phase PAM và số liệu đã kiểm tra.

PAM: Initialize → Assignment → Swap Evaluation → Best Swap → Assignment… → Converged. Best Swap cập nhật labels ngay để E hiển thị đúng với bộ medoids mới. Accepted swaps đếm số hoán đổi đã nhận; Evaluation rounds đếm cả vòng cuối không cải thiện. Next Step và Auto Run dùng cùng engine; Compare và Outliers cũng chạy engine này.

Tham khảo định nghĩa SWAP và điều kiện hội tụ: [R cluster::pam](https://search.r-project.org/CRAN/refmans/cluster/html/pam.html).
