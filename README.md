# 🛒 Ứng Dụng Quản Lý Cửa Hàng Tạp Hóa

Ứng dụng quản lý cửa hàng tạp hóa dựa trên web được xây dựng bằng Python và MySQL.

## 📋 Yêu Cầu Hệ Thống

Trước khi chạy ứng dụng, hãy đảm bảo bạn có:

- Python đã được cài đặt trên máy
- MySQL Server đã được cài đặt và đang chạy
- Các gói Python cần thiết (cài đặt bằng lệnh `pip install -r requirements.txt`)

## 🚀 Hướng Dẫn Cài Đặt

### 1. Thiết Lập Cơ Sở Dữ Liệu
1. Đảm bảo MySQL Server đang chạy trên máy của bạn
2. Mở file `sql_connection.py`
3. Cập nhật thông tin đăng nhập MySQL:
   ```python
   host = "localhost"
   user = "tên_người_dùng_của_bạn"
   password = "mật_khẩu_của_bạn"
   ```

### 2. Chạy Ứng Dụng
1. Khởi động server:
   ```bash
   python server.py
   ```
2. Mở file `index.html` trong trình duyệt web
3. Ứng dụng sẽ bắt đầu chạy!

## 🌟 Tính Năng
- Quản lý sản phẩm tạp hóa
- Theo dõi hàng tồn kho
- Giao diện thân thiện với người dùng
- Cập nhật thời gian thực

## 🔧 Công Nghệ Sử Dụng
- Backend: Python
- Cơ sở dữ liệu: MySQL
- Frontend: HTML, CSS, JavaScript