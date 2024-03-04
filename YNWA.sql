/*DROP DATABASE dbYNWA;*/
DROP DATABASE IF EXISTS db_ynwa;
CREATE DATABASE db_ynwa;
USE db_ynwa;

CREATE TABLE sec_roles(
id_rol INT UNSIGNED AUTO_INCREMENT,
descripcion_opc VARCHAR(40),
estado_opc BOOLEAN,
marcas_opc BOOLEAN,
modelos_opc BOOLEAN,
tallas_opc BOOLEAN,
pedidos_opc BOOLEAN,
tipo_noticias_opc BOOLEAN,
noticias_opc BOOLEAN,
comentarios_opc BOOLEAN,
clientes_opc BOOLEAN,
usuarios_opc BOOLEAN,
roles_opc BOOLEAN,
PRIMARY KEY(id_rol)
);

CREATE TABLE sec_usuarios(
id_usuario INT UNSIGNED auto_increment,
id_rol INT UNSIGNED,
usuario_usuario VARCHAR(30) UNIQUE,
clave_usuario VARCHAR(255),
nombre_usuario VARCHAR(255),
apellido_usuario VARCHAR(255),
email_usuario VARCHAR(100),
pin_usuario VARCHAR(6),
estado_usuario BOOLEAN,
PRIMARY KEY (id_usuario),
CONSTRAINT fk_usuario_rol
FOREIGN KEY(id_rol) REFERENCES sec_roles(id_rol)
ON DELETE CASCADE ON UPDATE CASCADE
);
        
CREATE TABLE prc_clientes(
id_cliente INT UNSIGNED AUTO_INCREMENT,
usuario_cliente VARCHAR(30) UNIQUE,
clave_cliente VARCHAR(30),
nombre_cliente VARCHAR(255),
apellido_cliente VARCHAR(255),
email_cliente VARCHAR(100),
pin_cliente VARCHAR(6),
estado_cliente BOOLEAN DEFAULT TRUE,
PRIMARY KEY(id_cliente)
);

CREATE TABLE ctg_marcas(
id_marca INT UNSIGNED AUTO_INCREMENT,
descripcion_marca VARCHAR(255),
estado_marca BOOLEAN DEFAULT TRUE,
PRIMARY KEY (id_marca)
);

CREATE TABLE prc_modelos(
id_modelo INT UNSIGNED AUTO_INCREMENT,
id_marca INT UNSIGNED,
descripcion_modelo VARCHAR(255),
foto_modelo LONGTEXT,
estado_modelo BOOLEAN DEFAULT TRUE,
PRIMARY KEY(id_modelo),
CONSTRAINT fk_modelo_marca
FOREIGN KEY(id_marca) REFERENCES ctg_marcas(id_marca)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ctg_tallas(
id_talla INT UNSIGNED AUTO_INCREMENT,
descripcion_talla VARCHAR(255),
estado_talla BOOLEAN  DEFAULT TRUE,
PRIMARY KEY (id_talla)
);


CREATE TABLE prc_modelo_tallas(
id_modelo_talla INT UNSIGNED AUTO_INCREMENT,
id_talla INT UNSIGNED unsigned,
id_modelo INT UNSIGNED unsigned,
stock_modelo_talla INT UNSIGNED unsigned,
precio_modelo_talla FLOAT UNSIGNED,
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
    descripcion_tipo_noticia VARCHAR(255),
    estado_tipo_noticia BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_tipo_noticia)
);

CREATE TABLE prc_noticias (
    id_noticia INT UNSIGNED AUTO_INCREMENT,
    id_tipo_noticia INT UNSIGNED,
    titulo_noticia VARCHAR(255),
    foto_noticia LONGTEXT,
    contenido_noticia TEXT,
    estado_noticia BOOLEAN DEFAULT TRUE,
    fecha_noticia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_noticia),
    CONSTRAINT fk_noticia_tipo_noticia
    FOREIGN KEY (id_tipo_noticia) REFERENCES ctg_tipo_noticias(id_tipo_noticia),
    CONSTRAINT chk_fecha_noticia CHECK (fecha_noticia >= NOW())
);

CREATE TABLE prc_pedidos(
id_pedido INT UNSIGNED AUTO_INCREMENT,
id_cliente INT UNSIGNED,
forma_pago_pedido enum('Efectivo','Transferencia'),
fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
estado_pedido BOOLEAN DEFAULT TRUE,
PRIMARY KEY (id_pedido),
CONSTRAINT fk_pedido_cliente
FOREIGN KEY(id_cliente) REFERENCES prc_clientes(id_cliente)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE prc_detalle_pedidos(
id_detalle INT UNSIGNED AUTO_INCREMENT,
id_pedido INT UNSIGNED,
id_modelo_talla INT UNSIGNED,
cantidad_detalle_pedido INT UNSIGNED,
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
    id_detalle INT UNSIGNED ,
    contenido_comentario TEXT,
    puntuacion_comentario INT UNSIGNED,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_comentario BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_comentario),
    CONSTRAINT fk_comentario_detalle
    FOREIGN KEY (id_detalle) REFERENCES prc_detalle_pedidos(id_detalle)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_fecha_comentario CHECK (fecha_comentario >= NOW())
);





