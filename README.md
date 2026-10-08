# Partitioning Methods Lab

Web demo: khám phá 200 khách hàng, khảo sát K, chạy từng phase của K-Means và alternating K-Medoids, so sánh khi có outliers.

**Tài liệu để thuyết trình:** [Kịch bản demo từng bước](docs/DEMO_STEP_BY_STEP_VI.md) — 4 màn hình, 10 bước trình bày, thao tác cụ thể, lời nói gợi ý và số liệu đối chiếu.

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

Đây là alternating K-Medoids, không phải PAM. Elbow dùng K-Means với deterministic initialization và có thể cho local optimum. WCSS và Total Dissimilarity khác đơn vị, không dùng độ lớn của chúng để xếp hạng hai thuật toán.
