CREATE DATABASE IF NOT EXISTS gundam_store CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE gundam_store;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL DEFAULT 0,
  category VARCHAR(100) DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, category, image) VALUES
('RG Hi-Nu GUNDAM', 'Real Grade Hi-Nu', 999000, 'Real Grade', 'hinu.jpg'),
('HG Barbatos Lupus Rex', 'High Grade Barbatos', 398000, 'High Grade', 'barbatos.jpg'),
('HG Aerial Full Mechanic', 'Full Mechanic Aerial', 975000, 'High Grade', 'aerial.jpg');