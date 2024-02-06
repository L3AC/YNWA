DROP DATABASE dbYNWA;
CREATE DATABASE dbYNWA;
use dbYNWA;

/*PRC = TABLAS DINAMICAS */
/*CTG = CATALOGOS */
/*SEC = TABLAS DE SEGURIDAD*/

CREATE TABLE sec_opciones(
id_opc int,
descripcion varchar(255),
PRIMARY KEY (id_opc)
);
CREATE TABLE sec_roles(
id_rol int,
descripcion varchar(255),
estado varchar(1),
PRIMARY KEY (id_rol)
);
CREATE TABLE sec_opc_rol(
id_opc_rol int,
id_opc int,
id_rol int,
PRIMARY KEY (id_opc_rol),
FOREIGN KEY(id_opc) REFERENCES sec_opciones(id_opc)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(id_rol) REFERENCES sec_roles(id_rol)
ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE sec_usuarios(
id_usuario INT,
id_rol int,
usuario varchar(30) UNIQUE,
dui varchar(10)UNIQUE,
clave varchar(30),
nombres varchar(255),
apellidos varchar(255),
email varchar(100),
pin varchar(6),
estado varchar(1),
PRIMARY KEY (id_usuario),
FOREIGN KEY(id_rol) REFERENCES sec_roles(id_rol)
ON DELETE CASCADE ON UPDATE CASCADE
);

create table prc_clientes(
id_cliente INT,
usuario varchar(30) UNIQUE,
clave varchar(30),
nombres varchar(255),
apellidos varchar(255),
email varchar(100),
pin varchar(6),
estado varchar(1),
PRIMARY KEY(id_cliente)
);

create table ctg_marcas(
id_marca int,
descripcion varchar(255),
estado varchar(1),
PRIMARY KEY (id_marca)
);

CREATE TABLE prc_modelos(
id_modelo int,
id_marca int,
descripcion varchar(255),
foto LONGTEXT,
estado varchar(1),
PRIMARY KEY(id_modelo),
FOREIGN KEY(id_marca) REFERENCES ctg_marcas(id_marca)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ctg_tiponoticias(
    id_tiponoticia INT,
    descripcion varchar(255),
    PRIMARY KEY (id_tiponoticia)
);
CREATE TABLE prc_noticias (
    id_noticia INT,
    id_tiponoticia int,
    titulo VARCHAR(255),
    foto LONGTEXT,
    contenido TEXT,
    estado varchar(1),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_noticia),
    FOREIGN KEY (id_tiponoticia) REFERENCES ctg_tiponoticias(id_tiponoticia)
);
create table ctg_tallas(
id_talla int,
descripcion varchar(255),
estado varchar(1),
PRIMARY KEY (id_talla)
);
create table prc_pedidos(
id_pedido int,
id_cliente int,
forma_pago varchar(30),
fecha datetime,
estado varchar(2),
PRIMARY KEY (id_pedido),
FOREIGN KEY(id_cliente) REFERENCES prc_clientes(id_cliente)
ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE prc_modelo_tallas(
id_modelotalla int,
id_talla int,
id_modelo int,
stock int,
precio float,
primary key (id_modelotalla),
FOREIGN KEY(id_modelo) REFERENCES prc_modelos(id_modelo)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(id_talla) REFERENCES ctg_tallas(id_talla)
ON DELETE CASCADE ON UPDATE CASCADE
);

create table prc_detalle_pedidos(
id_detalle int,
id_pedido int,
id_modelotalla int,
cantidad int,
PRIMARY KEY (id_detalle),
FOREIGN KEY(id_pedido) REFERENCES prc_pedidos(id_pedido)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(id_modelotalla) REFERENCES prc_modelo_tallas(id_modelotalla)
ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE prc_comentarios (
    id_comentario INT,
    id_detalle INT ,
    comentario TEXT,
    puntuacion INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_comentario),
    FOREIGN KEY (id_detalle) REFERENCES prc_detalle_pedidos(id_detalle)
);



