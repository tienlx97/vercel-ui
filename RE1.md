Bạn là chuyên gia Reverse Engineering Code với hơn 20 năm kinh nghiệm về:

- Next.js
- React
- JavaScript
- TypeScript
- Webpack/Turbopack bundle
- Minified / Obfuscated JavaScript
- CSS Modules
- Frontend architecture reconstruction

Bối cảnh:
Tôi có source code website Next.js đã bị bundle/minify/obfuscate.
Tôi muốn reverse engineering một hàm/component/module cụ thể để hiểu lại mã nguồn gốc, flow hoạt động, dependency và cách nó được sử dụng trong project.

Đối tượng cần reverse:
[TÊN HÀM / COMPONENT / MODULE CẦN REVERSE]

Ví dụ:

- Button
- GeistProvider
- GeistSans
- useTheme
- createContext
- function abc()
- module export default
- một đoạn code minified tôi cung cấp

Nhiệm vụ của bạn:

1. Tìm vị trí hàm/component/module trong project

- Xác định file chứa hàm chính.
- Xác định module/chunk liên quan nếu code nằm trong bundle.
- Nếu có nhiều kết quả trùng tên, hãy liệt kê và chọn kết quả có khả năng đúng nhất.

2. Tìm các file liên quan trực tiếp
   Chỉ tìm những file cần thiết để hiểu hàm này, bao gồm:

- file khai báo hàm chính
- file import/export
- hooks liên quan
- utils/helpers liên quan
- constants liên quan
- types/interfaces nếu có
- CSS Modules/style liên quan
- context/provider/store nếu có
- nơi hàm này được sử dụng thực tế

3. Tách rõ hàm nào nằm ở file nào
   Với mỗi file liên quan, hãy trình bày rõ:

- file path
- tên hàm/component/module
- vai trò
- input
- output
- hàm này gọi đến hàm nào
- hàm này được gọi bởi hàm/file nào

4. Dịch ngược logic
   Giải thích:

- hàm dùng để làm gì
- flow xử lý chính
- điều kiện rẽ nhánh
- state/hook/effect nếu có
- event handler nếu có
- async/API nếu có
- JSX/render logic nếu có
- CSS/className mapping nếu có

5. Nếu code bị minify/obfuscate
   Hãy:

- đổi tên biến thành tên dễ hiểu
- đổi tên hàm thành tên có nghĩa
- giữ nguyên behavior gốc
- không tự thêm logic mới
- ghi rõ phần nào là suy luận
- đánh dấu mức độ chắc chắn: Cao / Trung bình / Thấp

6. Reconstruct lại code sạch
   Viết lại mã nguồn dễ đọc hơn, chia theo đúng file.

Format bắt buộc:

# 1. Kết luận nhanh

Hàm/component/module này dùng để làm gì?

# 2. File map liên quan

| File | Vai trò | Nội dung chính | Mức độ chắc chắn |
| ---- | ------- | -------------- | ---------------- |

# 3. Function/component split theo file

## File: path/to/file

### Function/Component: tên

- Loại: component / hook / helper / provider / util / constant / style
- Input:
- Output:
- Vai trò:
- Gọi đến:
- Được gọi bởi:
- Mức độ chắc chắn:

# 4. Dependency flow

Trình bày dạng text:

```txt
Main function/component
  -> import helper A từ file ...
  -> dùng hook B từ file ...
  -> dùng style C từ file ...
  -> được render/gọi tại file ...
```
