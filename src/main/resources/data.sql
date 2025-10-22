-- Usuario Administrador (password: admin123)
INSERT IGNORE INTO usuario (id, rut, nombre, apellidos, email, direccion, region, comuna, rol, password, activo, fecha_creacion) VALUES
(1, '11111111-1', 'Admin', 'Sistema', 'tejedoraypunto@gmail.com', '', 'Metropolitana', 'Santiago', 'ADMIN', 'admin123', true, NOW()),
(2, '22222222-2', 'Cliente', 'Sistema', 'cliente@gmail.com', '', 'Metropolitana', 'Santiago', 'CLIENTE', 'cliente123', true, NOW());

-- Categorías
INSERT IGNORE INTO categoria (id, nombre) VALUES 
(1, 'Chaleco Invierno'),
(2, 'Chaleco Verano'),
(3, 'Bikini'),
(4, 'Gorro Invierno'),
(5, 'Gorro Verano');

-- Productos
-- Categoría: Chaleco Invierno
INSERT IGNORE INTO producto (id, nombre, descripcion, precio, stock, imagen, categoria_id, activo, fecha_creacion) VALUES
(1, 'Chaleco Bosque', 'Inspirado en texturas naturales y tonos tierra', 55000, 1, 'img/winter/chaleco1.jpeg', 1, true, NOW()),
(2, 'Chaleco Cobre', 'Diseño clásico con detalles artesanales', 58000, 2, 'img/winter/chaleco2.jpeg', 1, true, NOW()),
(3, 'Chaleco Niebla', 'Tejido grueso, ideal para días fríos', 60000, 2, 'img/winter/chaleco4.jpeg', 1, true, NOW()),
-- Categoría: Chaleco Verano
(4, 'Chaleco Brisa', 'Tejido ligero perfecto para las tardes de verano', 45000, 2, 'img/winter/chaleco3.jpeg', 2, true, NOW()),
(5, 'Chaleco Marino', 'Diseño fresco con punto calado', 42000, 3, 'img/winter/chaleco5.jpeg', 2, true, NOW()),
(6, 'Chaleco Sunset', 'Tejido en algodón con detalles románticos', 48000, 1, 'img/winter/chaleco6.jpeg', 2, true, NOW()),
-- Categoría: Bikini
(7, 'Bikini Océano', 'Tejido en algodón con detalles de conchas', 32000, 2, 'img/summer/summer3.jpeg', 3, true, NOW()),
(8, 'Bikini Coral', 'Diseño bohemio con punto calado', 35000, 3, 'img/summer/summer4.jpeg', 3, true, NOW()),
(9, 'Bikini Sirena', 'Tejido delicado con detalles brillantes', 38000, 2, 'img/summer/summer5.jpeg', 3, true, NOW()),
-- Categoría: Gorro Invierno
(10, 'Gorro Montaña', 'Tejido grueso con diseño trenzado', 22000, 3, 'img/winter/gorro1.jpeg', 4, true, NOW()),
(11, 'Gorro Nieve', 'Diseño acogedor con pompón', 25000, 4, 'img/winter/gorro2.jpeg', 4, true, NOW()),
(12, 'Gorro Bosque', 'Tejido en punto musgo con doblez', 20000, 5, 'img/winter/gorro3.jpeg', 4, true, NOW()),
-- Categoría: Gorro Verano
(13, 'Gorro Playa', 'Diseño fresco y elegante para el sol', 18000, 4, 'img/summer/gorro_v1.jpeg', 5, true, NOW()),
(14, 'Gorro Sol', 'Tejido calado para días soleados', 15000, 5, 'img/summer/gorro_v2.jpeg', 5, true, NOW()),
(15, 'Gorro Brisa', 'Ligero y transpirable con ala ancha', 20000, 3, 'img/summer/gorro_v3.jpeg', 5, true, NOW());