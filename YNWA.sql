/*DROP DATABASE dbYNWA;*/
CREATE DATABASE dbYNWA;
use dbYNWA;
/*PRC = TABLAS DINAMICAS *//*CTG = CATALOGOS *//*SEC = TABLAS DE SEGURIDAD*/

CREATE TABLE sec_roles(
id_rol int AUTO_INCREMENT,
descripcion varchar(40),
estado boolean,
marcas boolean,
modelos boolean,
tallas boolean,
pedidos boolean,
tipo_noticias boolean,
noticias boolean,
comentarios boolean,
clientes boolean,
usuarios boolean,
PRIMARY KEY(id_rol)
);
insert into sec_roles (id_rol, descripcion, estado,marcas,modelos,tallas,pedidos,tipo_noticias,noticias,comentarios,clientes,usuarios) 
values(1,'Admin',true,true,true,true,true,true,true,true,true,true);
/*
select * from sec_usuarios;

SELECT id_usuario , usuario, clave
                FROM sec_usuarios
                WHERE  usuario ='juancho';*/

CREATE TABLE sec_usuarios(
id_usuario INT auto_increment,
id_rol int,
usuario varchar(30) UNIQUE,
clave varchar(255),
nombres varchar(255),
apellidos varchar(255),
email varchar(100),
pin varchar(6),
estado boolean,
PRIMARY KEY (id_usuario),
FOREIGN KEY(id_rol) REFERENCES sec_roles(id_rol)
ON DELETE CASCADE ON UPDATE CASCADE
);

/*
insert into sec_usuarios(id_rol,usuario,clave,nombres,apellidos,email,pin,estado) 
values(1,'juancho','juancho','juan','pedri','juancho@gmail.com','904393',true);

SELECT id_usuario, nombres, apellidos, email, usuario
                FROM sec_usuarios
                ORDER BY apellidos

select u.id_usuario,u.usuario,marcas,modelos,tallas,pedidos,tipo_noticias,noticias,comentarios,clientes,usuarios FROM sec_usuarios u
        INNER JOIN sec_roles r ON u.id_rol = r.id_rol
        WHERE  u.usuario like  '%%';*/
#select * from sec_usuarios
create table prc_clientes(
id_cliente INT AUTO_INCREMENT,
usuario varchar(30) UNIQUE,
clave varchar(30),
nombres varchar(255),
apellidos varchar(255),
email varchar(100),
pin varchar(6),
estado boolean,
PRIMARY KEY(id_cliente)
);

create table ctg_marcas(
id_marca int AUTO_INCREMENT,
descripcion varchar(255),
estado boolean,
PRIMARY KEY (id_marca)
);
insert into ctg_marcas(descripcion,estado) values('NIKE',true),('NEW BALANCE',true),('ADIDAS',true),('NAUTICA',true);

CREATE TABLE prc_modelos(
id_modelo int AUTO_INCREMENT,
id_marca int,
descripcion varchar(255),
foto LONGTEXT,
estado boolean,
PRIMARY KEY(id_modelo),
FOREIGN KEY(id_marca) REFERENCES ctg_marcas(id_marca)
ON DELETE CASCADE ON UPDATE CASCADE
);
select * from prc_modelos;
insert into prc_modelos(id_marca,descripcion,foto,estado) values(1,'JORDAN','3728asb23423.png',true);

create table ctg_tallas(
id_talla int AUTO_INCREMENT,
descripcion varchar(255),
estado boolean,
PRIMARY KEY (id_talla)
);
insert into ctg_tallas(descripcion,estado) values('5',true),('6',true),('7',true),('8',true),('9',true),('10',true);

CREATE TABLE prc_modelo_tallas(
id_modelotalla int AUTO_INCREMENT,
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
insert into prc_modelo_tallas(id_talla,id_modelo,stock,precio) values(1,1,3,75),(2,1,3,80),(3,1,3,85);



CREATE TABLE ctg_tiponoticias(
    id_tiponoticia INT AUTO_INCREMENT,
    descripcion varchar(255),
    estado boolean,
    PRIMARY KEY (id_tiponoticia)
);
CREATE TABLE prc_noticias (
    id_noticia INT AUTO_INCREMENT,
    id_tiponoticia int,
    titulo VARCHAR(255),
    foto LONGTEXT,
    contenido TEXT,
    estado boolean,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_noticia),
    FOREIGN KEY (id_tiponoticia) REFERENCES ctg_tiponoticias(id_tiponoticia)
);

create table prc_pedidos(
id_pedido int AUTO_INCREMENT,
id_cliente int,
forma_pago enum('Efectivo','Transferencia'),
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
estado boolean,
PRIMARY KEY (id_pedido),
FOREIGN KEY(id_cliente) REFERENCES prc_clientes(id_cliente)
ON DELETE CASCADE ON UPDATE CASCADE
);


create table prc_detalle_pedidos(
id_detalle int AUTO_INCREMENT,
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
    id_comentario INT AUTO_INCREMENT,
    id_detalle INT ,
    comentario TEXT,
    puntuacion INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado boolean,
    PRIMARY KEY (id_comentario),
    FOREIGN KEY (id_detalle) REFERENCES prc_detalle_pedidos(id_detalle)
);
