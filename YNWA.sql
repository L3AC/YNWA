/*DROP DATABASE dbYNWA;*/
DROP DATABASE IF EXISTS db_ynwa;
CREATE DATABASE db_YNWA;
use db_YNWA;
/*PRC = TABLAS DINAMICAS *//*CTG = CATALOGOS *//*SEC = TABLAS DE SEGURIDAD*/

CREATE TABLE sec_roles(
id_rol int AUTO_INCREMENT,
descripcion_opc varchar(40),
estado_opc boolean,
marcas_opc boolean,
modelos_opc boolean,
tallas_opc boolean,
pedidos_opc boolean,
tipo_noticias_opc boolean,
noticias_opc boolean,
comentarios_opc boolean,
clientes_opc boolean,
usuarios_opc boolean,
PRIMARY KEY(id_rol)
);
insert into sec_roles (id_rol, descripcion_opc, estado_opc,marcas_opc,modelos_opc,tallas_opc,
pedidos_opc,tipo_noticias_opc,noticias_opc,comentarios_opc,clientes_opc,usuarios_opc) 
values(1,'Admin',true,true,true,true,true,true,true,true,true,true);
/*
select * from sec_usuarios;

SELECT id_usuario , usuario, clave
                FROM sec_usuarios
                WHERE  usuario ='juancho';*/

CREATE TABLE sec_usuarios(
id_usuario INT auto_increment,
id_rol int,
usuario_usuario varchar(30) UNIQUE,
clave_usuario varchar(255),
nombre_usuario varchar(255),
apellido_usuario varchar(255),
email_usuario varchar(100),
pin_usuario varchar(6),
estado_usuario boolean,
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
#select * from prc_clientes where estado=1
create table prc_clientes(
id_cliente INT AUTO_INCREMENT,
usuario_cliente varchar(30) UNIQUE,
clave_cliente varchar(30),
nombre_cliente varchar(255),
apellido_cliente varchar(255),
email_cliente varchar(100),
pin_cliente varchar(6),
estado_cliente boolean,
PRIMARY KEY(id_cliente)
);

create table ctg_marcas(
id_marca int AUTO_INCREMENT,
descripcion_marca varchar(255),
estado_marca boolean,
PRIMARY KEY (id_marca)
);
insert into ctg_marcas(descripcion_marca,estado_marca) values('NIKE',true),('NEW BALANCE',true),('ADIDAS',true),('NAUTICA',true);

CREATE TABLE prc_modelos(
id_modelo int AUTO_INCREMENT,
id_marca int,
descripcion_modelo varchar(255),
foto_modelo LONGTEXT,
estado_modelo boolean,
PRIMARY KEY(id_modelo),
FOREIGN KEY(id_marca) REFERENCES ctg_marcas(id_marca)
ON DELETE CASCADE ON UPDATE CASCADE
);

insert into prc_modelos(id_marca,descripcion_modelo,foto_modelo,estado_modelo) values(1,'JORDAN','3728asb23423.png',true);

create table ctg_tallas(
id_talla int AUTO_INCREMENT,
descripcion_talla varchar(255),
estado_talla boolean,
PRIMARY KEY (id_talla)
);
insert into ctg_tallas(descripcion_talla,estado_talla) values('5',true),('6',true),('7',true),('8',true),('9',true),('10',true);

CREATE TABLE prc_modelo_tallas(
id_modelo_talla int AUTO_INCREMENT,
id_talla int,
id_modelo int,
stock_modelo_talla int,
precio_modelo_talla float,
primary key (id_modelo_talla),
FOREIGN KEY(id_modelo) REFERENCES prc_modelos(id_modelo)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(id_talla) REFERENCES ctg_tallas(id_talla)
ON DELETE CASCADE ON UPDATE CASCADE
);

insert into prc_modelo_tallas(id_talla,id_modelo,stock_modelo_talla,precio_modelo_talla) values(1,1,3,75),(2,1,3,80),(3,1,3,85);

CREATE TABLE ctg_tipo_noticias(
    id_tipo_noticia INT AUTO_INCREMENT,
    descripcion_tipo_noticia varchar(255),
    estado_tipo_noticia boolean,
    PRIMARY KEY (id_tipo_noticia)
);
insert into ctg_tipo_noticias(descripcion_tipo_noticia,estado_tipo_noticia) 
values('Oferta',true),('Nuevos productos',true),('Temporada',true);
CREATE TABLE prc_noticias (
    id_noticia INT AUTO_INCREMENT,
    id_tipo_noticia int,
    titulo_noticia VARCHAR(255),
    foto_noticia LONGTEXT,
    contenido_noticia TEXT,
    estado_noticia boolean,
    fecha_noticia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_noticia),
    FOREIGN KEY (id_tipo_noticia) REFERENCES ctg_tipo_noticias(id_tipo_noticia)
);

create table prc_pedidos(
id_pedido int AUTO_INCREMENT,
id_cliente int,
forma_pago_pedido enum('Efectivo','Transferencia'),
fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
estado_pedido boolean,
PRIMARY KEY (id_pedido),
FOREIGN KEY(id_cliente) REFERENCES prc_clientes(id_cliente)
ON DELETE CASCADE ON UPDATE CASCADE
);


create table prc_detalle_pedidos(
id_detalle int AUTO_INCREMENT,
id_pedido int,
id_modelo_talla int,
cantidad_detalle_pedido int,
PRIMARY KEY (id_detalle),
FOREIGN KEY(id_pedido) REFERENCES prc_pedidos(id_pedido)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(id_modelo_talla) REFERENCES prc_modelo_tallas(id_modelo_talla)
ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE prc_comentarios (
    id_comentario INT AUTO_INCREMENT,
    id_detalle INT ,
    contenido_comentario TEXT,
    puntuacion_comentario INT,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_comentario boolean,
    PRIMARY KEY (id_comentario),
    FOREIGN KEY (id_detalle) REFERENCES prc_detalle_pedidos(id_detalle)
);
