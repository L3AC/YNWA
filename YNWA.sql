/*DROP DATABASE dbYNWA;*/
DROP DATABASE IF EXISTS db_ynwa;
CREATE DATABASE db_YNWA;
use db_YNWA;
/*PRC = TABLAS DINAMICAS *//*CTG = CATALOGOS *//*SEC = TABLAS DE SEGURIDAD*/

#select * from sec_usuarios
#select * from prc_clientes
#delete from sec_usuarios where id_usuario=3

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
roles_opc boolean,
PRIMARY KEY(id_rol)
);

insert into sec_roles (descripcion_opc, estado_opc,marcas_opc,modelos_opc,tallas_opc,
pedidos_opc,tipo_noticias_opc,noticias_opc,comentarios_opc,clientes_opc,usuarios_opc,roles_opc) 
values('Admin',true,true,true,true,true,true,true,true,true,true,true),
('Empleado',true,false,true,false,true,false,true,true,false,false,false),
('Vendedor',true,false,true,false,true,false,false,true,false,false,false),
('Asistente',true,true,true,true,false,false,false,true,true,false,false);

/*SELECCIONAR EL PRIMER REGISTRO*/
DELIMITER //
CREATE FUNCTION idmin(tabla VARCHAR(255))
RETURNS INT
BEGIN
    DECLARE min_id INT;

    CASE tabla
        WHEN 'sec_usuarios' THEN
            SELECT MIN(id_usuario) INTO min_id FROM sec_usuarios;
        WHEN 'sec_roles' THEN
            SELECT MIN(id_rol) INTO min_id FROM sec_roles;
        -- Agrega más casos según sea necesario para cada tabla
        ELSE
            SET min_id = NULL;
    END CASE;

    RETURN min_id;
END//
DELIMITER ;

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
CONSTRAINT fk_usuario_rol
FOREIGN KEY(id_rol) REFERENCES sec_roles(id_rol)
ON DELETE CASCADE ON UPDATE CASCADE
);
        
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
CONSTRAINT fk_modelo_marca
FOREIGN KEY(id_marca) REFERENCES ctg_marcas(id_marca)
ON DELETE CASCADE ON UPDATE CASCADE
);
select * from ctg_marcas;
insert into prc_modelos(id_marca,descripcion_modelo,foto_modelo,estado_modelo) 
values(1,'JORDAN','3728asb23423.png',true),
(2,'Unisex','43jnd344ksnw.jpg',true),
(3,'Samba Predator','23dfb234nsd.jpg',true),
(4,'Blue Black','738sd23nkssd2.jpg',true);


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
CONSTRAINT fk_mt_modelo
FOREIGN KEY(id_modelo) REFERENCES prc_modelos(id_modelo)
ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_mt_talla
FOREIGN KEY(id_talla) REFERENCES ctg_tallas(id_talla)
ON DELETE CASCADE ON UPDATE CASCADE
);
select * from prc_modelos;
insert into prc_modelo_tallas(id_talla,id_modelo,stock_modelo_talla,precio_modelo_talla) values
/*NIKE JORDAN*/(1,1,3,75),(2,1,3,80),(3,1,3,85),
/*NEWBALANCE*/(1,2,30,85),(2,2,30,90),(3,2,30,95),
/*ADIDAS PREDATOR*/(1,3,30,65),(2,3,30,70),(3,3,30,75),
/*NAUTICA BLUE*/(1,4,30,55),(2,4,30,60),(3,4,30,65);

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
    CONSTRAINT fk_noticia_tipo_noticia
    FOREIGN KEY (id_tipo_noticia) REFERENCES ctg_tipo_noticias(id_tipo_noticia)
);
insert into prc_noticias(id_tipo_noticia,titulo_noticia,foto_noticia,contenido_noticia,estado_noticia,fecha_noticia )
values(1,'Nuevas ofertas por el dia de san valentin','234342asd12.jpg','Este 14 de febrero, 
tendremos en oferta todos los productos mayores a 200$', true,now());

insert into prc_noticias(id_tipo_noticia,titulo_noticia,foto_noticia,contenido_noticia,estado_noticia,fecha_noticia )
values(2,'Nuevas productos','pr3241jsksd.jpg','Este 8 de marzo vendran nuevos productos de la marca Nike edición 2024', true,now());



create table prc_pedidos(
id_pedido int AUTO_INCREMENT,
id_cliente int,
forma_pago_pedido enum('Efectivo','Transferencia'),
fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
estado_pedido boolean,
PRIMARY KEY (id_pedido),
CONSTRAINT fk_pedido_cliente
FOREIGN KEY(id_cliente) REFERENCES prc_clientes(id_cliente)
ON DELETE CASCADE ON UPDATE CASCADE
);

create table prc_detalle_pedidos(
id_detalle int AUTO_INCREMENT,
id_pedido int,
id_modelo_talla int,
cantidad_detalle_pedido int,
PRIMARY KEY (id_detalle),
CONSTRAINT fk_detalle_pedido
FOREIGN KEY(id_pedido) REFERENCES prc_pedidos(id_pedido)
ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_detalle_modelo
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
    CONSTRAINT fk_comentario_detalle
    FOREIGN KEY (id_detalle) REFERENCES prc_detalle_pedidos(id_detalle)
    ON DELETE CASCADE ON UPDATE CASCADE
);
SELECT id_modelo, descripcion_modelo,foto_modelo, estado_modelo,descripcion_marca as marca
        FROM prc_modelos 
        INNER JOIN ctg_marcas USING(id_marca)
        WHERE estado_modelo=true 
        ORDER BY descripcion_modelo

/*
insert into prc_pedidos(id_cliente,forma_pago_pedido,fecha_pedido,estado_pedido) 
values(1,'Efectivo',now(),true);
select * from prc_detalle_pedidos
insert into prc_detalle_pedidos(id_pedido,id_modelo_talla,cantidad_detalle_pedido) values(3,1,1);
insert into prc_comentarios(id_detalle,contenido_comentario,puntuacion_comentario,fecha_comentario,estado_comentario) 
values(2,'Me llego en buenas condiciones y los colores son muy bonitos',5,now(),true);
*/
/*TRIGGER*/
DELIMITER //
CREATE TRIGGER actualizar_stock AFTER INSERT ON prc_detalle_pedidos
FOR EACH ROW
BEGIN
    DECLARE stock_actual INT;
    DECLARE cantidad_pedido INT;

    SELECT stock_modelo_talla INTO stock_actual FROM prc_modelo_tallas WHERE id_modelo_talla = NEW.id_modelo_talla;
    SELECT cantidad_detalle_pedido INTO cantidad_pedido FROM prc_detalle_pedidos WHERE id_detalle = NEW.id_detalle;

    UPDATE prc_modelo_tallas SET stock_modelo_talla = stock_actual - cantidad_pedido WHERE id_modelo_talla = NEW.id_modelo_talla;
END;
//DELIMITER ;




