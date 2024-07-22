DROP DATABASE IF EXISTS db_ynwa;
CREATE DATABASE db_ynwa;
USE db_ynwa;


/*SELECT id_cliente,usuario_cliente,clave_cliente,nombre_cliente,CONCAT(nombre_cliente," ",apellido_cliente) as nombre,
                apellido_cliente,email_cliente,estado_cliente,direccion_cliente,lat,lon
                from prc_clientes
                WHERE id_cliente = 1

SELECT m.id_modelo, m.descripcion_modelo, SUM(d.cantidad_detalle_pedido) AS total_cantidad_comprada
FROM prc_pedidos p
JOIN prc_detalle_pedidos d USING(id_pedido)
JOIN prc_modelo_tallas mt USING(id_modelo_talla)
JOIN prc_modelos m USING(id_modelo)
WHERE p.estado_pedido = 'Finalizado'
GROUP BY m.id_modelo, m.descripcion_modelo
ORDER BY total_cantidad_comprada DESC LIMIT 10;

SELECT m.id_modelo, m.descripcion_modelo, ROUND(SUM(d.cantidad_detalle_pedido) * 100.0 / total_comprados.total_cantidad, 1) AS porcentaje_comprado
FROM prc_pedidos p
JOIN prc_detalle_pedidos d USING(id_pedido)
JOIN prc_modelo_tallas mt USING(id_modelo_talla)
JOIN prc_modelos m USING(id_modelo)
JOIN (SELECT SUM(d.cantidad_detalle_pedido) AS total_cantidad FROM prc_pedidos p JOIN prc_detalle_pedidos d USING(id_pedido)
WHERE p.estado_pedido = 'Finalizado') AS total_comprados
WHERE p.estado_pedido = 'Finalizado'
GROUP BY m.id_modelo, m.descripcion_modelo, total_comprados.total_cantidad
ORDER BY porcentaje_comprado DESC LIMIT 10;


update prc_pedidos set fecha_pedido='2024-03-10'  where id_pedido=1;
update prc_pedidos set fecha_pedido='2024-04-10'  where id_pedido=2;
update prc_pedidos set fecha_pedido='2024-05-10'  where id_pedido=3;
update prc_pedidos set fecha_pedido='2024-06-10'  where id_pedido=4;
update prc_pedidos set fecha_pedido='2024-07-10'  where id_pedido=5;
*/




CREATE TABLE sec_roles(
id_rol INT UNSIGNED AUTO_INCREMENT,
descripcion_opc VARCHAR(40) NOT NULL,
estado_opc BOOLEAN NOT NULL,
marcas_opc BOOLEAN NOT NULL,
modelos_opc BOOLEAN NOT NULL,
tallas_opc BOOLEAN NOT NULL,
pedidos_opc BOOLEAN NOT NULL,
tipo_noticias_opc BOOLEAN NOT NULL,
noticias_opc BOOLEAN NOT NULL,
comentarios_opc BOOLEAN NOT NULL,
clientes_opc BOOLEAN NOT NULL,
usuarios_opc BOOLEAN NOT NULL,
roles_opc BOOLEAN NOT NULL,
PRIMARY KEY(id_rol)
);

CREATE TABLE sec_usuarios(
id_usuario INT UNSIGNED auto_increment,
id_rol INT UNSIGNED NOT NULL,
usuario_usuario VARCHAR(30) UNIQUE NOT NULL,
clave_usuario VARCHAR(255) NOT NULL,
nombre_usuario VARCHAR(255) NOT NULL,
apellido_usuario VARCHAR(255) NOT NULL,
email_usuario VARCHAR(100) NOT NULL UNIQUE,
pin_usuario VARCHAR(6) NOT NULL,
estado_usuario BOOLEAN DEFAULT TRUE,
PRIMARY KEY (id_usuario),
CONSTRAINT fk_usuario_rol
FOREIGN KEY(id_rol) REFERENCES sec_roles(id_rol)
ON DELETE CASCADE ON UPDATE CASCADE
);
       
CREATE TABLE prc_clientes(
id_cliente INT UNSIGNED AUTO_INCREMENT,
usuario_cliente VARCHAR(30) UNIQUE NOT NULL,
clave_cliente VARCHAR(100) NOT NULL,
direccion_cliente VARCHAR(255) NOT NULL,
nombre_cliente VARCHAR(255),
apellido_cliente VARCHAR(255),
email_cliente VARCHAR(100) NOT NULL UNIQUE,
pin_cliente VARCHAR(6) NOT NULL,
lat varchar(255) DEFAULT '13.68935',
lon varchar(255) DEFAULT '-89.18718',
estado_cliente BOOLEAN DEFAULT TRUE NOT NULL,
PRIMARY KEY(id_cliente)
);

CREATE TABLE ctg_marcas(
id_marca INT UNSIGNED AUTO_INCREMENT,
descripcion_marca VARCHAR(255) NOT NULL UNIQUE,
estado_marca BOOLEAN DEFAULT TRUE NOT NULL,
PRIMARY KEY (id_marca)
);
                
CREATE TABLE prc_modelos(
id_modelo INT UNSIGNED AUTO_INCREMENT,
id_marca INT UNSIGNED NOT NULL,
descripcion_modelo VARCHAR(255) NOT NULL,
foto_modelo LONGTEXT NOT NULL,
estado_modelo BOOLEAN DEFAULT TRUE NOT NULL,
PRIMARY KEY(id_modelo),
CONSTRAINT fk_modelo_marca
FOREIGN KEY(id_marca) REFERENCES ctg_marcas(id_marca)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ctg_tallas(
id_talla INT UNSIGNED AUTO_INCREMENT,
descripcion_talla VARCHAR(255) NOT NULL UNIQUE,
estado_talla BOOLEAN  DEFAULT TRUE NOT NULL,
PRIMARY KEY (id_talla)
);


CREATE TABLE prc_modelo_tallas(
id_modelo_talla INT UNSIGNED AUTO_INCREMENT,
id_talla INT UNSIGNED NOT NULL,
id_modelo INT UNSIGNED NOT NULL,
stock_modelo_talla INT UNSIGNED NOT NULL,
precio_modelo_talla FLOAT UNSIGNED NOT NULL,
PRIMARY KEY (id_modelo_talla),
CONSTRAINT fk_mt_modelo
FOREIGN KEY(id_modelo) REFERENCES prc_modelos(id_modelo)
ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_mt_talla
FOREIGN KEY(id_talla) REFERENCES ctg_tallas(id_talla)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ctg_tipo_noticias(
    id_tipo_noticia INT UNSIGNED AUTO_INCREMENT,
    descripcion_tipo_noticia VARCHAR(255) NOT NULL,
    estado_tipo_noticia BOOLEAN DEFAULT TRUE NOT NULL,
    PRIMARY KEY (id_tipo_noticia)
);

CREATE TABLE prc_noticias (
    id_noticia INT UNSIGNED AUTO_INCREMENT,
    id_tipo_noticia INT UNSIGNED NOT NULL,
    titulo_noticia VARCHAR(255) NOT NULL,
    foto_noticia LONGTEXT NOT NULL,
    contenido_noticia TEXT NOT NULL,
    estado_noticia BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_noticia TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id_noticia),
    CONSTRAINT fk_noticia_tipo_noticia
    FOREIGN KEY (id_tipo_noticia) REFERENCES ctg_tipo_noticias(id_tipo_noticia)
);

CREATE TABLE prc_pedidos(
id_pedido INT UNSIGNED AUTO_INCREMENT,
id_cliente INT UNSIGNED NOT NULL,
forma_pago_pedido enum('Efectivo','Transferencia') DEFAULT 'Efectivo' NOT NULL,
fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
estado_pedido ENUM('Pendiente','Finalizado','Anulado') NOT NULL,
PRIMARY KEY (id_pedido),
CONSTRAINT fk_pedido_cliente
FOREIGN KEY(id_cliente) REFERENCES prc_clientes(id_cliente)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE prc_detalle_pedidos(
id_detalle INT UNSIGNED AUTO_INCREMENT,
id_pedido INT UNSIGNED NOT NULL,
id_modelo_talla INT UNSIGNED NOT NULL,
cantidad_detalle_pedido INT UNSIGNED NOT NULL,
PRIMARY KEY (id_detalle),
CONSTRAINT fk_detalle_pedido
FOREIGN KEY(id_pedido) REFERENCES prc_pedidos(id_pedido)
ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_detalle_modelo
FOREIGN KEY(id_modelo_talla) REFERENCES prc_modelo_tallas(id_modelo_talla)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE prc_comentarios (
    id_comentario INT UNSIGNED AUTO_INCREMENT,
    id_detalle INT UNSIGNED  NOT NULL,
    contenido_comentario TEXT NOT NULL,
    puntuacion_comentario INT UNSIGNED NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado_comentario BOOLEAN DEFAULT TRUE NOT NULL,
    PRIMARY KEY (id_comentario),
    CONSTRAINT fk_comentario_detalle
    FOREIGN KEY (id_detalle) REFERENCES prc_detalle_pedidos(id_detalle)
    ON DELETE CASCADE ON UPDATE CASCADE
);





