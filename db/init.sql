SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- 데이터베이스 생성 및 사용
CREATE DATABASE IF NOT EXISTS logistics;
USE logistics;

-- 📦 창고 테이블
CREATE TABLE IF NOT EXISTS warehouses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 📦 상품 테이블 (SKU, stock, location 포함)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 🔄 재고 테이블 (상품-창고 연동)
CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    quantity INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 🛒 주문 테이블
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 📥 더미 데이터 삽입

-- 상품
INSERT INTO products (name, sku, price, stock, location) VALUES
('노트북', 'SKU-001', 1500000, 50, 'A-01'),
('마우스', 'SKU-002', 25000, 300, 'B-12'),
('키보드', 'SKU-003', 70000, 200, 'C-03');

-- 창고
INSERT INTO warehouses (name, location) VALUES
('서울 물류센터', '서울특별시 송파구'),
('부산 물류센터', '부산광역시 해운대구');

-- 재고
INSERT INTO inventory (product_id, warehouse_id, quantity) VALUES
(1, 1, 100),
(2, 1, 300),
(3, 2, 200);

-- 주문
INSERT INTO orders (product_id, quantity, status) VALUES
(1, 2, 'pending'),
(2, 1, 'shipped');
