INSERT INTO sec_roles (descripcion_opc, estado_opc,marcas_opc,modelos_opc,tallas_opc,
pedidos_opc,tipo_noticias_opc,noticias_opc,comentarios_opc,clientes_opc,usuarios_opc,roles_opc) 
VALUES('Admin',true,true,true,true,true,true,true,true,true,true,true),
('Empleado',true,false,true,false,true,false,true,true,false,false,false),
('Vendedor',true,false,true,false,true,false,false,true,false,false,false),
('Asistente',true,true,true,true,false,false,false,true,true,false,false);


INSERT INTO ctg_marcas(descripcion_marca,estado_marca) 
VALUES('NIKE',true),('NEW BALANCE',true),('ADIDAS',true),('NAUTICA',true);
SELECT * FROM ctg_marcas;

INSERT INTO prc_modelos(id_marca,descripcion_modelo,foto_modelo,estado_modelo) 
VALUES(1,'JORDAN','3728asb23423.png',true),
(2,'Unisex','43jnd344ksnw.jpg',true),
(3,'Samba Predator','23dfb234nsd.jpg',true),
(4,'Blue Black','738sd23nkssd2.jpg',true);
SELECT * FROM prc_modelos;

INSERT INTO ctg_tallas(descripcion_talla,estado_talla) 
VALUES('5',true),('6',true),('7',true),('8',true),('9',true),('10',true);
SELECT * FROM ctg_tallas;

INSERT INTO prc_modelo_tallas(id_talla,id_modelo,stock_modelo_talla,precio_modelo_talla) VALUES
/*NIKE JORDAN*/(1,1,3,75),(2,1,3,80),(3,1,3,85),
/*NEWBALANCE*/(1,2,30,85),(2,2,30,90),(3,2,30,95),
/*ADIDAS PREDATOR*/(1,3,30,65),(2,3,30,70),(3,3,30,75),
/*NAUTICA BLUE*/(1,4,30,55),(2,4,30,60),(3,4,30,65);
SELECT * FROM prc_modelo_tallas;

INSERT INTO ctg_tipo_noticias(descripcion_tipo_noticia,estado_tipo_noticia) 
VALUES('Oferta',true),('Nuevos productos',true),('Temporada',true);
SELECT * FROM ctg_tipo_noticias

INSERT INTO prc_noticias(id_tipo_noticia,titulo_noticia,foto_noticia,contenido_noticia,estado_noticia,fecha_noticia )
VALUES(1,'Nuevas ofertas por el dia de san valentin','234342asd12.jpg','Este 14 de febrero, 
tendremos en oferta todos los productos mayores a 200$', true,now()),
(2,'Nuevas productos','pr3241jsksd.jpg','Este 8 de marzo vendran nuevos productos de la marca Nike edición 2024',
 true,now());
 SELECT * FROM prc_noticias

INSERT INTO prc_pedidos(id_cliente,forma_pago_pedido,fecha_pedido,estado_pedido) 
VALUES(1,'Efectivo',now(),true);
SELECT * FROM prc_pedidos


INSERT INTO prc_detalle_pedidos(id_pedido,id_modelo_talla,cantidad_detalle_pedido) VALUES(3,1,1);
INSERT INTO prc_comentarios(id_detalle,contenido_comentario,puntuacion_comentario,fecha_comentario,estado_comentario) 
VALUES(2,'Me llego en buenas condiciones y los colores son muy bonitos',5,now(),true);
SELECT * FROM prc_detalle_pedidos