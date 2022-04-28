--1 Migracion tabla Usuario 

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200),
    apellido VARCHAR(200),
    password VARCHAR(200),
    email VARCHAR(200),
    tipo_usuario VARCHAR(200) 
);


--2. Migracion tabla productos

CREATE TABLE  IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    foto VARCHAR(200),
    producto VARCHAR(200),
    descripcion VARCHAR(200),
    stock INT,
    valor INT
);

--3. Migracion tabla Compras

CREATE TABLE IF NOT EXISTS compras (
    id SERIAL PRIMARY KEY,
    usuario_id_fk INT ,
    fecha DATE,
    total INT,
    foreign key(usuario_id_fk) references usuarios (id)
);

--3. Migracion tabla detalle compras

CREATE TABLE IF NOT EXISTS detalle_compras (
    id SERIAL PRIMARY KEY,
    compra_id_fk INT ,
    producto_id_fk INT ,
    CANTIDAD INT,
    PRECIO INT,
    FOREIGN KEY(compra_id_fk) references compras(id), 
    FOREIGN KEY(producto_id_fk) references productos (id)
);