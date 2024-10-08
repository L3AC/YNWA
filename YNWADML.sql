INSERT INTO sec_roles (descripcion_opc, estado_opc,marcas_opc,modelos_opc,tallas_opc,
pedidos_opc,tipo_noticias_opc,noticias_opc,comentarios_opc,clientes_opc,usuarios_opc,roles_opc) 
VALUES('Admin',true,true,true,true,true,true,true,true,true,true,true),
('Empleado',true,false,true,false,true,false,true,true,false,false,false),
('Vendedor',true,false,true,false,true,false,false,true,false,false,false),
('Asistente',true,true,true,true,false,false,false,true,true,false,false);


INSERT INTO prc_clientes (direccion_cliente,usuario_cliente, clave_cliente,nombre_cliente, apellido_cliente, email_cliente, pin_cliente, estado_cliente) VALUES
('Avenida calle poniente #4', 'cliente01', 'claveCliente01', 'Ana', 'González', 'ana.gonzalez@example.com', '123456', 1),
('Avenida calle poniente #4', 'cliente02', 'claveCliente02', 'Pedro', 'López', 'pedro.lopez@example.com', '234567', 1),
('Avenida calle poniente #4', 'cliente03', 'claveCliente03', 'María', 'Rodríguez', 'maria.rodriguez@example.com', '345678', 1),
('Avenida calle poniente #4', 'cliente04', 'claveCliente04', 'Carlos', 'Martínez', 'carlos.martinez@example.com', '456789', 1),
('Avenida calle poniente #4', 'cliente05', 'claveCliente05', 'Laura', 'Hernández', 'laura.hernandez@example.com', '567890', 1),
('Avenida calle poniente #4', 'cliente06', 'claveCliente06', 'Juan', 'Gómez', 'juan.gomez@example.com', '678901', 1),
('Avenida calle poniente #4', 'cliente07', 'claveCliente07', 'Sofía', 'Pérez', 'sofia.perez@example.com', '789012', 1),
('Avenida calle poniente #4', 'cliente08', 'claveCliente08', 'Fernando', 'Sánchez', 'fernando.sanchez@example.com', '890123', 1),
('Avenida calle poniente #4', 'cliente09', 'claveCliente09', 'Lucía', 'Flores', 'lucia.flores@example.com', '901234', 1),
('Avenida calle poniente #4', 'cliente10', 'claveCliente10', 'Diego', 'Ramírez', 'diego.ramirez@example.com', '012345', 1),
('Avenida calle poniente #4', 'cliente11', 'claveCliente11', 'Valeria', 'Torres', 'valeria.torres@example.com', '123450', 1),
('Avenida calle poniente #4', 'cliente12', 'claveCliente12', 'Javier', 'García', 'javier.garcia@example.com', '234561', 1),
('Avenida calle poniente #4', 'cliente13', 'claveCliente13', 'Marcela', 'Vargas', 'marcela.vargas@example.com', '345612', 1),
('Avenida calle poniente #4', 'cliente14', 'claveCliente14', 'Andrés', 'Luna', 'andres.luna@example.com', '456123', 1),
('Avenida calle poniente #4', 'cliente15', 'claveCliente15', 'Carolina', 'Ríos', 'carolina.rios@example.com', '561234', 1),
('Avenida calle poniente #4', 'cliente16', 'claveCliente16', 'Roberto', 'Cortés', 'roberto.cortes@example.com', '612345', 1),
('Avenida calle poniente #4', 'cliente17', 'claveCliente17', 'Luisa', 'Ortega', 'luisa.ortega@example.com', '123456', 1),
('Avenida calle poniente #4', 'cliente18', 'claveCliente18', 'Santiago', 'Herrera', 'santiago.herrera@example.com', '234567', 1),
('Avenida calle poniente #4', 'cliente19', 'claveCliente19', 'Camila', 'Iglesias', 'camila.iglesias@example.com', '345678', 1),
('Avenida calle poniente #4', 'cliente20', 'claveCliente20', 'Alejandro', 'Mendoza', 'alejandro.mendoza@example.com', '456789', 1),
('Avenida calle poniente #4', 'cliente21', 'claveCliente21', 'Isabella', 'Cabrera', 'isabella.cabrera@example.com', '567890', 1),
('Avenida calle poniente #4', 'cliente22', 'claveCliente22', 'Gabriel', 'Santos', 'gabriel.santos@example.com', '678901', 1),
('Avenida calle poniente #4', 'cliente23', 'claveCliente23', 'Mariana', 'Cruz', 'mariana.cruz@example.com', '789012', 1),
('Avenida calle poniente #4', 'cliente24', 'claveCliente24', 'Hugo', 'Guzmán', 'hugo.guzman@example.com', '890123', 1),
('Avenida calle poniente #4', 'cliente25', 'claveCliente25', 'Valentina', 'Silva', 'valentina.silva@example.com', '901234', 1);

INSERT INTO ctg_marcas (descripcion_marca) VALUES
('Nike'),('Adidas'),('Puma'),('Vans'),('Converse'),('New Balance'),('Reebok'),('Skechers'),('Fila'),
('Under Armour'),('Timberland'),('Dr. Martens'),('Clarks'),('Salomon'),('Merrell'),('Crocs'),
('Birkenstock'),('Havaianas'),('Gucci'),('Balenciaga'),('Prada'),('Versace'),('Valentino'),
('Jimmy Choo'),('Dior');

INSERT INTO prc_modelos (id_marca, descripcion_modelo, foto_modelo) VALUES
(1, 'Nike Air Force 1', 'air-jordan-1-high-og-washed-pink.jpg'),
(1, 'Nike Air Max 90', 'air-jordan-1-mid-true-blue.jpg'),
(1, 'Nike Roshe Run', 'air-jordan-1-retro-high-og-atmosphere.jpg'),
(2, 'Adidas Stan Smith', 'jordan1-bluegrey.jpg'),
(2, 'Adidas Superstar', 'jordan1-darkmocha.jpg'),
(2, 'Adidas Gazelle', 'jordan1-diademuertos.jpg'),
(3, 'Puma Suede Classic', 'air_Jordan_1_Mid_SE_Basketball_Blossom.jpg'),
(3, 'Puma Basket Classic', 'air-jordan-1-high-chicago.jpg'),
(3, 'Puma Roma', 'air-Jordan-1-High-Dior.jpg'),
(4, 'Vans Old Skool', 'air-jordan-1-mid-se-grey-green.jpg'),
(4, 'Vans Authentic', 'air-jordan-1-high-og-washed-pink.jpg'),
(4, 'Vans Era', 'air-jordan-1-mid-true-blue.jpg'),
(5, 'Converse Chuck Taylor All Star', 'air-jordan-1-retro-high-og-atmosphere.jpg'),
(5, 'Converse One Star', 'jordan1-bluegrey.jpg'),
(5, 'Converse Jack Purcell', 'jordan1-darkmocha.jpg'),
(6, 'New Balance 574', 'jordan1-diademuertos.jpg'),
(6, 'New Balance 990', 'air_Jordan_1_Mid_SE_Basketball_Blossom.jpg'),
(6, 'New Balance Fresh Foam', 'air-jordan-1-high-chicago.jpg'),
(7, 'Reebok Classic Leather', 'air-Jordan-1-High-Dior.jpg'),
(7, 'Reebok Club C', 'air-jordan-1-mid-se-grey-green.jpg'),
(7, 'Reebok Workout Plus', 'air-jordan-1-high-og-washed-pink.jpg'),
(8, 'Skechers Go Walk', 'air-jordan-1-mid-true-blue.jpg'),
(8, 'Skechers D"Lites', 'air-jordan-1-retro-high-og-atmosphere.jpg'),
(8, 'Skechers Energy', 'jordan1-bluegrey.jpg'),
(9, 'Fila Disruptor II', 'jordan1-darkmocha.jpg');


INSERT INTO ctg_tallas (descripcion_talla) VALUES
('4'),('4.5'),('5'),('5.5'),('6'),('6.5'),('7'),('7.5'),('8'),('8.5'),('9'),('9.5'),('10'),
('10.5'),('11'),('11.5'),('12'),('12.5'),('13'),('13.5'),('14'),('14.5'),('15'),('15.5'),
('16');

INSERT INTO ctg_tipo_noticias(descripcion_tipo_noticia,estado_tipo_noticia) 
VALUES('Oferta',true),('Nuevos productos',true),('Temporada',true);

INSERT INTO prc_noticias(id_tipo_noticia,titulo_noticia,foto_noticia,contenido_noticia,estado_noticia,fecha_noticia )
VALUES(1,'Adidas Back','6648fd8f022e0.jpg','Vuelve Adidas', true,now()),
(2,'Nike Return','6648fd50a5590.jpg','Vuelve Nike',true,now()),
(3,'Puma Feeling','6648fcbd13740.jpg','Vuelve Puma',true,now());

INSERT INTO prc_modelo_tallas (id_talla, id_modelo, stock_modelo_talla, precio_modelo_talla) VALUES
(1, 1, 10, 99.99),(1, 2, 5, 129.99),(1, 3, 15, 89.99),(2, 4, 8, 79.99),(2, 5, 3, 109.99),
(2, 6, 12, 69.99),(3, 7, 20, 79.99),(3, 8, 10, 99.99),(3, 9, 18, 69.99),(4, 10, 6, 89.99),
(4, 11, 2, 119.99),(4, 12, 10, 79.99),(5, 13, 15, 69.99),(5, 14, 5, 99.99),(5, 15, 12, 59.99),
(6, 16, 10, 99.99),(6, 17, 5, 129.99),(6, 18, 15, 89.99),(7, 19, 8, 79.99),(7, 20, 3, 109.99),
(7, 21, 12, 69.99),(8, 22, 20, 79.99),(8, 23, 10, 99.99),(8, 24, 18, 69.99),(9, 25, 6, 89.99);

INSERT INTO prc_pedidos (id_cliente, forma_pago_pedido, estado_pedido,fecha_pedido) VALUES
(1, 'Efectivo', 'Finalizado','2023-07-10'),(2, 'Transferencia', 'Finalizado','2023-08-10'),
(3, 'Efectivo', 'Finalizado','2023-09-10'),(4, 'Transferencia', 'Finalizado','2023-10-10'),
(5, 'Efectivo', 'Finalizado','2023-11-10'),(6, 'Transferencia', 'Finalizado','2023-12-10'),
(7, 'Efectivo', 'Finalizado','2024-01-10'),(8, 'Transferencia', 'Finalizado','2024-02-10'),
(9, 'Efectivo', 'Finalizado','2024-03-10'),(10, 'Transferencia', 'Finalizado','2024-04-10'),
(11, 'Efectivo', 'Finalizado','2024-05-10'),(12, 'Transferencia', 'Finalizado','2024-06-10'),
(13, 'Efectivo', 'Finalizado','2024-07-10'),(14, 'Transferencia', 'Finalizado',now()),
(15, 'Efectivo', 'Finalizado',now()),(16, 'Transferencia', 'Finalizado',now()),
(17, 'Efectivo', 'Pendiente',now()),(18, 'Transferencia', 'Pendiente',now()),(19, 'Efectivo', 'Pendiente',now()),
(20, 'Transferencia', 'Pendiente',now()),(21, 'Efectivo', 'Pendiente',now()),
(22, 'Transferencia', 'Pendiente',now()),(23, 'Efectivo', 'Pendiente',now()),
(24, 'Transferencia', 'Pendiente',now()),(25, 'Efectivo', 'Pendiente',now());

INSERT INTO prc_detalle_pedidos (id_pedido, id_modelo_talla, cantidad_detalle_pedido) VALUES
(1, 1, 2),(2, 2, 1),(3, 12, 1),(4, 14, 2),(5, 20, 1),(6, 25, 2),(7, 6, 2),(8, 11, 1),
(9, 15, 2),(10, 19, 3),(11, 23, 1),(12, 24, 2),(13, 1, 1),(14, 2, 3),(14, 5, 1),
(15, 12, 1),(16, 14, 2),(17, 20, 1),(18, 25, 2),(19, 6, 2),(20, 11, 1),(21, 15, 2),
(22, 19, 3),(23, 23, 1),(24, 25, 2),(25, 4, 2);

INSERT INTO prc_comentarios (id_detalle, contenido_comentario, puntuacion_comentario) VALUES
(1, 'Excelente producto, muy satisfecho con mi compra.', 5),
(2, 'El tamaño no era el esperado, un poco pequeño.', 3),
(3, 'Buena calidad, lo recomendaría a otros compradores.', 4),
(4, 'Entrega rápida y el producto en perfecto estado.', 5),
(5, 'No cumple con mis expectativas, baja calidad.', 2),
(6, 'El color no es exactamente como se muestra en la imagen.', 3),
(7, 'Muy buena atención al cliente, resolvieron mis dudas.', 4),
(8, 'El precio es un poco elevado para la calidad del producto.', 3),
(9, 'Excelente servicio, volvería a comprar sin duda.', 5),
(10, 'Tardó más de lo esperado en llegar, pero el producto es bueno.', 4),
(11, 'El producto llegó con defectos, solicité un reemplazo.', 2),
(12, 'Buena relación calidad-precio, lo recomendaría.', 4),
(13, 'El envío tuvo problemas y llegó con retraso.', 2),
(14, 'El producto es exactamente lo que esperaba, muy contento.', 5),
(15, 'Las costuras del producto se deshicieron rápidamente.', 2),
(16, 'El pedido llegó incompleto, falta un artículo.', 1),
(17, 'Buena atención al cliente, resolvieron mi problema.', 4),
(18, 'El producto es de buena calidad, lo recomendaría.', 4),
(19, 'El envío llegó en perfectas condiciones y dentro del plazo.', 5),
(20, 'No cumple con las especificaciones descritas en la página.', 2),
(21, 'El producto es tal como se muestra en la imagen, muy satisfecho.', 5),
(22, 'El precio es elevado, esperaba una mejor calidad.', 3),
(23, 'Excelente atención al cliente, respondieron rápidamente.', 5),
(24, 'El envío tuvo demoras y el producto llegó dañado.', 1),
(25, 'El producto es de buena calidad, lo recomendaré a mis amigos.', 4);


/*INSERT INTO sec_roles (descripcion_opc, estado_opc,marcas_opc,modelos_opc,tallas_opc,
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
(1,1,3,75),(2,1,3,80),(3,1,3,85),#NIKE JORDAN
(1,2,30,85),(2,2,30,90),(3,2,30,95),#NEWBALANCE
(1,3,30,65),(2,3,30,70),(3,3,30,75),#ADIDAS PREDATOR
(1,4,30,55),(2,4,30,60),(3,4,30,65);#NAUTICA BLUE
SELECT * FROM prc_modelo_tallas;



SELECT * FROM ctg_tipo_noticias;

INSERT INTO prc_noticias(id_tipo_noticia,titulo_noticia,foto_noticia,contenido_noticia,estado_noticia,fecha_noticia )
VALUES(1,'Nuevas ofertas por el día de San Valentín','234342asd12.jpg','Este 14 de febrero, 
tendremos en oferta todos los productos mayores a 200$', true,now()),
(2,'Nuevas productos','pr3241jsksd.jpg','Este 8 de marzo vendrán nuevos productos de la marca Nike edición 2024',
 true,now());
 
 SELECT * FROM prc_noticias;


INSERT INTO prc_pedidos(id_cliente,forma_pago_pedido,fecha_pedido,estado_pedido) 
VALUES(2,'Efectivo',now(),'Pendiente');


INSERT INTO prc_detalle_pedidos(id_pedido,id_modelo_talla,cantidad_detalle_pedido) VALUES(1,1,1);
INSERT INTO prc_detalle_pedidos(id_pedido,id_modelo_talla,cantidad_detalle_pedido) VALUES(2,1,1);

INSERT INTO prc_comentarios(id_detalle,contenido_comentario,puntuacion_comentario,fecha_comentario,estado_comentario) 
VALUES(1,'Me llego en buenas condiciones y los colores son muy bonitos',5,now(),true);



select * from prc_detalle_pedidos where 
select * from prc_comentarios

INSERT INTO prc_comentarios(id_detalle,contenido_comentario,puntuacion_comentario,fecha_comentario,estado_comentario) 
VALUES(2,'Me gusto debido a que',3,now(),true);
INSERT INTO prc_comentarios(id_detalle,contenido_comentario,puntuacion_comentario,fecha_comentario,estado_comentario) 
VALUES(1,'El mejor producto',5,now(),true);

select id_comentario,id_detalle,CONCAT(nombre_cliente," ",apellido_cliente) as cliente,
        CONCAT(descripcion_marca," ",descripcion_modelo) as modelo,contenido_comentario,
        puntuacion_comentario,estado_comentario,
        DATE_FORMAT(cm.fecha_comentario, "%d-%m-%Y - %h:%i %p") AS fecha_comentario
        from prc_comentarios cm
        INNER JOIN prc_detalle_pedidos dp USING(id_detalle)
        INNER JOIN prc_pedidos p USING(id_pedido)
        INNER JOIN prc_clientes c USING(id_cliente)
        INNER JOIN prc_modelo_tallas mt USING (id_modelo_talla)
        INNER JOIN prc_modelos mo USING (id_modelo)
        INNER JOIN ctg_marcas ma USING (id_marca)
use db_ynwa
delete from prc_comentarios where id_comentario>0

update prc_comentarios set puntuacion_comentario=4 where id_comentario=1

SELECT * FROM prc_detalle_pedidos*/