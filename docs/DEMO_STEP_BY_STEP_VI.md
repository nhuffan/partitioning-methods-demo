## Lộ trình

| Bước | Màn hình | Nội dung | Thời gian |
|---|---|---|---|
| 1 | Explore Data | Bài toán phân cụm | 1 phút |
| 2 | Explore Data | Dataset, features, khoảng cách | 2 phút |
| 3 | Find K | Elbow và lựa chọn K | 1–2 phút |
| 4 | Clustering Lab | Original → Initialize | 1 phút |
| 5 | Clustering Lab | Assignment | 1 phút |
| 6 | Clustering Lab | Update → lặp → hội tụ K-Means | 2 phút |
| 7 | Clustering Lab | Chạy K-Medoids | 2 phút |
| 8 | Compare Methods | So sánh baseline | 1 phút |
| 9 | Compare Methods | Thêm ba outliers | 1 phút |
| 10 | Explore Data / Find K | Đổi features và kết luận | 1 phút |

## Bước 1 — Giới thiệu bài toán

**Thao tác:** Mở tab **01 Explore Data**, trỏ vào scatter plot và các ô thống kê.

**Nói:** “Nhóm em demo hai phương pháp phân cụm phân hoạch: K-Means và K-Medoids. Mục tiêu là nhóm các khách hàng gần nhau theo các đặc trưng đã chọn. Ban đầu mỗi điểm là một khách hàng, chưa có nhãn cụm. Thuật toán tự tạo nhóm từ khoảng cách giữa các điểm, nên đây là unsupervised learning.”

**Chỉ trên màn hình:** 200 Customers, 5 Original attributes, 2 Clustering features, 0 Predefined cluster labels. Màu chưa biểu diễn các nhóm có sẵn. K là số cụm mình yêu cầu thuật toán tìm.

## Bước 2 — Dataset có gì, đưa gì vào thuật toán?

**Thao tác:** Chỉ bảng **5 observations đầu tiên**, link **CSV gốc**, hai dropdown X/Y và nhãn **Euclidean distance · raw features**.

**Nói:** “Demo sử dụng Mall Customer Dataset, 200 dòng, mỗi dòng là một khách hàng. Dataset có 5 cột, nhưng mỗi lần chạy web chỉ dùng hai thuộc tính số đang chọn để tính khoảng cách.”

| Cột CSV | Ý nghĩa khi giới thiệu | Tham gia clustering? |
|---|---|---|
| CustomerID | Mã định danh khách hàng | Không |
| Gender | Thuộc tính giới tính trong dataset | Không |
| Age | Tuổi; dữ liệu hiện có từ 18 đến 70 | Có thể chọn |
| Annual Income (k$) | Thu nhập hằng năm, đơn vị nghìn đô; từ 15 đến 137 | X mặc định |
| Spending Score (1-100) | Điểm chi tiêu trên thang 1–100; giá trị thực tế từ 1 đến 99 | Y mặc định |

**Nói tiếp:** “Ví dụ customer 1 có Income = 15 và Spending Score = 39, nên nằm tại tọa độ (15, 39). Customer 2 nằm tại (15, 81). Khoảng cách Euclidean của hai điểm là √((15−15)² + (39−81)²) = 42. Điểm càng gần representative thì càng có khả năng được gán vào cùng cụm.”

“Web dùng giá trị gốc, chưa chuẩn hóa. Vì vậy đơn vị và độ lớn của features ảnh hưởng đến khoảng cách. Customer ID chỉ để nhận biết điểm; Gender không tham gia tính toán. Dataset không có nhãn cụm chuẩn để tính accuracy.”

**Nguồn:** [Kaggle — Customer Segmentation Tutorial in Python](https://www.kaggle.com/datasets/vjchoudhary7/customer-segmentation-tutorial-in-python). CSV đi kèm repo; provenance và SHA-256 ở [SOURCE.md](../assets/SOURCE.md). JavaScript chứa bản dữ liệu số tương ứng CSV; web không tải Kaggle mỗi lần chạy. Outliers ở bước 9 là dữ liệu giả lập riêng.

## Bước 3 — Khảo sát số cụm bằng Elbow

**Thao tác:** Chuyển **02 Find K** → bấm **Calculate Elbow**. Giữ nguyên hai features mặc định.

**Nói:** “Elbow chạy K-Means cho K từ 1 đến 8. Trục ngang là K, trục dọc là WCSS: tổng bình phương khoảng cách từ từng điểm đến centroid của cụm. Ta tìm vùng đường cong giảm chậm lại để cân nhắc giữa độ gọn của cụm và số cụm.”

| K | WCSS trên phiên bản này |
|---|---:|
| 1 | 269,981.28 |
| 2 | 183,653.33 |
| 3 | 106,348.37 |
| 4 | 73,880.64 |
| 5 | 66,674.36 |
| 6 | 37,558.92 |
| 7 | 35,483.02 |
| 8 | 28,490.55 |

**Nói rõ:** “Đường cong này chưa cho một elbow duy nhất rõ ràng; từ K=5 sang K=6 vẫn giảm mạnh. Em giữ K=5 để minh họa các phase, không khẳng định K=5 là tối ưu. Khởi tạo cố định giúp lặp lại kết quả, nhưng có thể dẫn đến nghiệm local. Nếu cần chọn K cho ứng dụng thực, cần khảo sát thêm khởi tạo, chuẩn hóa và tiêu chí đánh giá.”

**Lưu ý thao tác:** Calculate Elbow không tự đổi dropdown K. Dropdown K chỉ hiển thị ở Lab/Compare, mặc định 5 và dùng chung giá trị giữa hai tab; có K=2…6; đường Elbow khảo sát K=1…8.

## Bước 4 — K-Means: dữ liệu gốc và khởi tạo

**Thao tác:** Chuyển **03 Clustering Lab** → Algorithm = **K-Means**, K=5 → **Reset**.

**Trước khi bấm:** Phase Original, Iteration = 0, WCSS = “—”.

**Nói:** “Ban đầu chưa có representative và chưa gán cụm. Em bấm Next Step để khởi tạo năm centroid.”

**Bấm Next Step lần 1:** Phase Initialize, xuất hiện năm marker **★**. Các điểm chưa được tô màu theo cụm; Iteration vẫn là 0; objective vẫn “—”.

**Nói:** “Khởi tạo dùng deterministic farthest-first. Với 200 dòng này, điểm đầu là customer 21; các điểm tiếp theo được chọn sao cho xa nhất so với representative gần nhất đã có. Cùng dữ liệu, thứ tự, features và K sẽ ra cùng khởi tạo. Đây không phải chọn ngẫu nhiên hay K-Means++.”

**Đối chiếu:** ID 21 (24, 35), ID 200 (137, 83), ID 193 (113, 8), ID 124 (69, 91), ID 8 (18, 94). Ban đầu centroid lấy tọa độ của observation; sau Update, centroid không bắt buộc là khách hàng thật.

## Bước 5 — K-Means: Assignment

**Thao tác:** Bấm **Next Step lần 2**; hover một điểm để xem tọa độ và cluster.

**Quan sát:** Phase Assignment, các customer đổi màu theo cụm; centroid đứng yên; Iteration = 0, WCSS = **168,525.00**.

**Nói:** “Với mỗi khách hàng, thuật toán tính khoảng cách Euclidean tới cả năm centroid rồi chọn centroid gần nhất. Bước này chỉ thay nhãn cụm, chưa cập nhật tâm. WCSS là tổng bình phương các khoảng cách đó.”

**Ví dụ có thể nói thêm:** “Customer 1 ở (15, 39) cách centroid đầu (24, 35) là √97 ≈ 9.85, gần nhất trong năm centroid khởi tạo nên được gán vào cụm 1.”

## Bước 6 — K-Means: Update, lặp và hội tụ

**Thao tác:** Bấm **Next Step lần 3**.

**Quan sát:** Phase Update; centroid di chuyển theo mũi tên nét đứt; Iteration = **1**; WCSS = **73,121.18**. Labels và màu điểm vẫn giữ từ Assignment vừa rồi.

**Nói:** “Mỗi centroid mới là trung bình tọa độ của tất cả điểm đang thuộc cụm: trung bình Income và trung bình Spending Score. Ví dụ nếu một cụm chỉ có ba điểm (10,20), (20,40), (30,30), centroid là (20,30). Đây là ví dụ tính tay, không phải ba điểm được chọn từ cụm đang hiển thị.”

“Sau Update, một số điểm có thể gần tâm khác hơn nhưng chưa đổi cụm ngay. Lần Next Step tiếp theo mới Assignment lại. Một iteration ở web được đếm khi hoàn tất Update, không phải mỗi lần bấm nút.”

**Tiếp tục:** Bấm Next Step lần 4 để thấy Assignment lần tiếp theo. Sau đó bấm **Auto Run** để chạy tiếp, có thể bấm **Pause** để giải thích. Auto Run đi qua cùng các phase, mỗi khoảng 0.8 giây, không chạy thuật toán khác.

**Kết quả mặc định:** **Converged**, **6 iterations**, WCSS **66,674.36**. Nếu hoàn toàn bấm tay từ Reset thì cần **14 lần Next Step**: Initialize, 6 cặp Assignment/Update, rồi xác nhận Converged.

**Nói:** “Thuật toán dừng khi centroid ổn định sau Update. Ở phase Update cuối, em bấm thêm một lần để xác nhận Converged. Đây là một nghiệm hội tụ với khởi tạo hiện tại, không bảo đảm nghiệm toàn cục.”

Centroid cuối để đối chiếu: (47.96, 43.25), (108.18, 82.73), (87.00, 18.63), (77.72, 81.07), (25.73, 79.36).

## Bước 7 — PAM: đánh giá và nhận best swap

**Chuẩn bị:** X=Annual Income, Y=Spending Score, K=5. Đổi Algorithm sang **PAM (K-Medoids)**; Lab tự reset. Phase Original chưa có nhãn. Mỗi Next Step tiến đúng một phase; Auto Run gọi cùng Next Step mỗi khoảng 0.8 giây, Pause dừng tại phase hiện tại.

**Lần 1 — Initialize:** Năm medoids ◆ có IDs 21, 200, 193, 124, 8, giống khởi tạo K-Means. Nói: “Theo yêu cầu demo, em giữ Farthest-First thay cho bước BUILD cổ điển của PAM. Phần tối ưu phía sau thực hiện PAM SWAP trên toàn bộ dataset.”

**Lần 2 — Assignment:** Gán mỗi điểm cho medoid gần nhất. E = **5,349.30**. Nói: “E là tổng khoảng cách Euclidean, không bình phương. Đây là chi phí của toàn bộ 200 khách hàng.”

**Lần 3 — Swap Evaluation:** Xét **5 × (200−5) = 975 cặp**: mỗi medoid đang chọn với mọi observation chưa là medoid, kể cả khác cụm. Với từng cặp, giả sử thay medoid, gán lại mọi điểm cho medoid gần nhất rồi tính E_mới. **ΔE = E_mới − E_cũ**; số âm là cải thiện. Giao diện giữ nguyên medoids, labels, E hiện tại; vòng OUT/IN đánh dấu cặp đề xuất, bảng mở rộng hiển thị 5 cặp có ΔE nhỏ nhất, không phải chỉ thử 5 cặp.

Nói: “Cặp tốt nhất vòng đầu là ID **200 → 78**, ΔE = **−1,814.556624**, chi phí dự kiến **3,534.74**. Đây mới là đánh giá giả định, chưa áp dụng.”

**Lần 4 — Best Swap:** Nhận đúng một cặp có ΔE nhỏ nhất nếu ΔE < −1e−9. Medoid 200 được thay bằng 78; mũi tên nét đứt thể hiện hoán đổi thực tế. Accepted swaps tăng lên 1, E = **3,534.74**. Labels được gán lại ngay tại phase này để màu và E khớp với medoids mới; không giữ labels cũ như Update của K-Means.

**Lần 5 — Assignment:** Hiển thị lại phép gán gần nhất của cấu hình vừa nhận rồi tiếp tục Swap Evaluation → Best Swap. Khi không có cặp cải thiện, Best Swap ghi **Không nhận**, giữ nguyên medoids/E, không có mũi tên. Next Step sau đó chuyển Converged. Khi không có non-medoid (K=N), không có cặp để xét và thuật toán cũng dừng.

**Nói khi hội tụ:** “PAM dừng vì không còn một hoán đổi medoid–non-medoid nào giảm tổng chi phí trong sai số 1e−9. Đây là tối ưu cục bộ theo một swap, không bảo đảm tối ưu toàn cục.”

**Kết quả mặc định:** **8 accepted swaps**, **9 evaluation rounds**, **8,775 pairs tested**, E = **2,619.35**; medoid IDs **25, 81, 167, 162, 16**. Best ΔE cuối = **+0.222297**, không được nhận. Từ Original cần **29 lần Next Step** để đến Converged; số lần bấm không bằng số swaps.

| Swap đã nhận | ID ra → vào | ΔE | E sau swap |
|---|---|---:|---:|
| 1 | 200 → 78 | −1,814.556624 | 3,534.74 |
| 2 | 193 → 177 | −448.383949 | 3,086.36 |
| 3 | 124 → 162 | −249.320312 | 2,837.04 |
| 4 | 8 → 26 | −129.948145 | 2,707.09 |
| 5 | 21 → 25 | −82.920375 | 2,624.17 |
| 6 | 78 → 81 | −2.193563 | 2,621.97 |
| 7 | 26 → 16 | −2.101275 | 2,619.87 |
| 8 | 177 → 167 | −0.524736 | 2,619.35 |

**Ví dụ tính tay:** Với K=1 và các điểm (0,0), (2,0), (10,0), medoid ban đầu (0,0) có E=12. Đổi sang (2,0) cho E=10, ΔE=−2; đổi sang (10,0) cho E=18, ΔE=+6. PAM nhận (2,0), rồi kiểm tra lại mọi swap trước khi dừng. Đây là ví dụ riêng, không phải dữ liệu trên biểu đồ.

Tham khảo: [R cluster::pam — SWAP và local minimum](https://search.r-project.org/CRAN/refmans/cluster/html/pam.html). Giữ Farthest-First nghĩa là demo không dùng BUILD cổ điển; không gọi việc chọn medoid tốt nhất trong từng cụm là PAM.

## Bước 8 — So sánh hai phương pháp trên dữ liệu gốc

**Thao tác:** Chuyển **04 Compare Methods**, chắc chắn **Inject 3 Outliers** tắt. Kết quả được tính tự động khi đổi K, features hoặc bật/tắt outliers.

**Nói:** “Hai bên cùng 200 khách hàng, cùng hai features, K=5 và Euclidean distance. Bên trái là centroid trung bình; bên phải là medoid lấy từ observation. Em quan sát vị trí representative và cách phân nhóm.”

| Điều quan sát | K-Means | K-Medoids |
|---|---|---|
| Representative | ★ centroid, có thể không trùng điểm thật | ◆ medoid, thuộc input |
| Cập nhật | Trung bình tọa độ | Best swap trên mọi cặp medoid–non-medoid |
| Objective | WCSS, tổng bình phương khoảng cách | Total Dissimilarity, tổng khoảng cách |
| Số bước tối ưu mặc định | 6 iterations | 8 accepted swaps; 9 evaluation rounds |
| Objective mặc định | 66,674.36 | 2,619.35 |

**Nói rõ:** “Không lấy 2,619 nhỏ hơn 66,674 để kết luận K-Medoids tốt hơn vì hai mục tiêu khác nhau. Accepted swaps của PAM và iterations của K-Means không phải cùng đơn vị công việc; không dùng số này để kết luận phương pháp nào nhanh hơn. Màu cụm giữa hai biểu đồ không bảo đảm cùng một nhóm khách hàng.”

Có thể mô tả khu vực thu nhập cao/chi tiêu cao bằng tọa độ, nhưng đó là diễn giải sau phân cụm, không phải nhãn đã được dataset xác nhận.

## Bước 9 — Thử tác động của outliers

**Thao tác:** Bật **Inject 3 Outliers**. Web tự chạy lại so sánh; chỉ vào ba marker **×** và dòng **203 observations**.

**Nói:** “Em thêm ba observation giả lập nằm ngoài miền dữ liệu gốc vào một bản sao. Với hai trục mặc định, tọa độ của chúng là (198,138.2), (216.3,152.9), (234.6,167.6). Đây không phải khách hàng thật và không ghi vào CSV.”

“Cả hai thuật toán chạy lại từ đầu trên cùng input mới. Mean phụ thuộc trực tiếp vào giá trị của các điểm nên có thể bị kéo bởi điểm xa. Medoid phải là observation trong input, nhưng không có nghĩa là miễn nhiễm với outliers; một synthetic observation cũng có thể được chọn làm medoid.”

**Đối chiếu sau khi bật:** K-Means **11 iterations**, WCSS **74,982.60**; PAM **6 accepted swaps**, **7 evaluation rounds**, **6,930 pairs tested** (990 cặp/vòng), Total Dissimilarity **3,079.34**. Medoid IDs: **25, 16, 81, 167, 176**. Best ΔE cuối **+0.222297**, không nhận. Trục tự mở rộng để thấy đầy đủ ba outliers.

**Giải thích thận trọng:** Số điểm và khởi tạo đã thay đổi; không dùng riêng mức tăng objective để đo độ robust. Quan sát này không tách riêng tác động của initialization, assignment và update, cũng không chứng minh một phương pháp luôn tốt hơn.

**Thao tác kết thúc:** Tắt checkbox; xác nhận trở về **200 observations** và số liệu baseline. Explore Data và Clustering Lab luôn dùng 200 khách hàng gốc, checkbox chỉ ảnh hưởng Compare Methods.

## Bước 10 — Đổi features và chốt bài

**Thao tác:** Tắt outliers, đổi **X Feature = Age**, giữ **Y Feature = Spending Score**. Về Explore Data xem phân bố mới; sang Find K bấm **Calculate Elbow** nếu còn thời gian.

**Nói:** “Cùng 200 khách hàng nhưng đổi features sẽ thay đổi hình học của dữ liệu, khoảng cách và kết quả phân cụm. Do đó lựa chọn feature và xử lý scale là một phần quan trọng trước khi chạy thuật toán.”

**Quan sát:** Đổi features reset Lab và xóa Elbow cũ; Compare cập nhật. Nếu chọn hai trục trùng nhau, web tự hoán đổi trục còn lại. Không dùng số liệu mặc định phía trên để đối chiếu sau khi đổi features.

**Lời kết:** “Qua demo, quy trình là hiểu dataset, khảo sát K, khởi tạo representative, gán điểm, cập nhật representative và lặp đến hội tụ. Khác biệt chính là K-Means dùng mean còn K-Medoids dùng observation đại diện. Kết quả phụ thuộc features, scale, K và khởi tạo; hội tụ chưa đồng nghĩa phân cụm tối ưu cho bài toán kinh doanh.”

## Câu hỏi

- **Tại sao K=5?** Là cấu hình minh họa cố định của demo. Elbow hiện tại chưa đủ để khẳng định 5 tối ưu; cần khảo sát thêm.
- **Có chuẩn hóa chưa?** Chưa, web dùng raw features và ghi rõ trên toolbar. Scale khác nhau ảnh hưởng distance.
- **Có accuracy không?** Không có ground-truth cluster labels nên không báo accuracy phân loại.
- **Tại sao Update xong màu chưa đổi?** Điều này áp dụng cho K-Means. PAM Best Swap gán lại labels ngay để phản ánh đúng E mới; Swap Evaluation chỉ là giả định.
- **Centroid có phải khách hàng thật?** Không bắt buộc. Medoid thì phải thuộc input; khi bật outliers, input gồm cả điểm giả lập.
- **Tại sao chạy lại giống nhau?** Initialization deterministic, dữ liệu và thứ tự cố định.
- **Có bảo đảm tối ưu toàn cục?** Không. Đây là kết quả hội tụ với khởi tạo hiện tại.
- **Nếu một cụm rỗng hoặc điểm trùng tọa độ?** K-Means giữ centroid cũ khi cụm rỗng. PAM vẫn đánh giá swap trên toàn input, không cần cập nhật riêng từng cụm. Các medoids được phân biệt bằng ID. PAM có giới hạn 200 accepted swaps; Limit reached không có nghĩa Converged.
