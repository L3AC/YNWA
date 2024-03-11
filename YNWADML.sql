INSERT INTO sec_roles (descripcion_opc, estado_opc,marcas_opc,modelos_opc,tallas_opc,
pedidos_opc,tipo_noticias_opc,noticias_opc,comentarios_opc,clientes_opc,usuarios_opc,roles_opc) 
VALUES('Admin',true,true,true,true,true,true,true,true,true,true,true),
('Empleado',true,false,true,false,true,false,true,true,false,false,false),
('Vendedor',true,false,true,false,true,false,false,true,false,false,false),
('Asistente',true,true,true,true,false,false,false,true,true,false,false);

INSERT INTO sec_usuarios (id_rol, usuario_usuario, clave_usuario, nombre_usuario, apellido_usuario, email_usuario, pin_usuario, estado_usuario) VALUES
(1, 'admin01', '$2y$10$aP8t6cRWFw29VBpgbNrLWuwDvQVME1O8kRzquocN8h/YgNKVtm/je', 'Adriana', 'Hernández', 'adriana.hernandez@example.com', '123456', 1),
(2, 'emp01', 'claveEmp01', 'Emilio', 'Pérez', 'emilio.perez@example.com', '234567', 1),
(2, 'emp02', 'claveEmp02', 'Elena', 'Sánchez', 'elena.sanchez@example.com', '345678', 1),
(3, 'vendedor01', 'claveVend01', 'Valentina', 'García', 'valentina.garcia@example.com', '456789', 1),
(3, 'vendedor02', 'claveVend02', 'Víctor', 'López', 'victor.lopez@example.com', '567890', 1),
(3, 'vendedor03', 'claveVend03', 'Verónica', 'Martínez', 'veronica.martinez@example.com', '678901', 1),
(4, 'asist01', 'claveAsist01', 'Andrea', 'Rodríguez', 'andrea.rodriguez@example.com', '789012', 1),
(4, 'asist02', 'claveAsist02', 'Alejandro', 'Gómez', 'alejandro.gomez@example.com', '890123', 1),
(4, 'asist03', 'claveAsist03', 'Ana', 'Torres', 'ana.torres@example.com', '901234', 1),
(2, 'emp03', 'claveEmp03', 'Esteban', 'Ramírez', 'esteban.ramirez@example.com', '012345', 0),
(3, 'vendedor04', 'claveVend04', 'Vanessa', 'Herrera', 'vanessa.herrera@example.com', '123450', 1),
(2, 'emp04', 'claveEmp04', 'Eva', 'González', 'eva.gonzalez@example.com', '345612', 1),
(3, 'vendedor05', 'claveVend05', 'Vicente', 'Díaz', 'vicente.diaz@example.com', '456123', 1),
(4, 'asist04', 'claveAsist04', 'Amanda', 'Soto', 'amanda.soto@example.com', '561234', 1),
(4, 'asist05', 'claveAsist05', 'Arturo', 'Herrera', 'arturo.herrera@example.com', '612345', 1),
(2, 'emp05', 'claveEmp05', 'Elisa', 'Cabrera', 'elisa.cabrera@example.com', '123456', 1),
(3, 'vendedor06', 'claveVend06', 'Valentín', 'Montes', 'valentin.montes@example.com', '234567', 1),
(2, 'emp06', 'claveEmp06', 'Enrique', 'Ortega', 'enrique.ortega@example.com', '456789', 1),
(3, 'vendedor07', 'claveVend07', 'Victoria', 'Cortés', 'victoria.cortes@example.com', '567890', 1),
(4, 'asist06', 'claveAsist06', 'Andrés', 'Santos', 'andres.santos@example.com', '678901', 1),
(4, 'asist07', 'claveAsist07', 'Alma', 'Cruz', 'alma.cruz@example.com', '789012', 1),
(2, 'emp07', 'claveEmp07', 'Eduardo', 'Ríos', 'eduardo.rios@example.com', '890123', 1),
(3, 'vendedor08', 'claveVend08', 'Vanesa', 'Iglesias', 'vanesa.iglesias@example.com', '901234', 1),
(2, 'emp08', 'claveEmp08', 'Antonio', 'Luna', 'antonio.luna@example.com', '234561', 1),
(2, 'emp09', 'claveEmp09', 'Angela', 'Mendoza', 'angela.mendoza@example.com', '345678', 1);

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
(1, 'Nike Air Force 1', 'ruta/a/foto1.jpg'),(1, 'Nike Air Max 90', 'ruta/a/foto2.jpg'),
(1, 'Nike Roshe Run', 'ruta/a/foto3.jpg'),(2, 'Adidas Stan Smith', 'ruta/a/foto4.jpg'),
(2, 'Adidas Superstar', 'ruta/a/foto5.jpg'),(2, 'Adidas Gazelle', 'ruta/a/foto6.jpg'),
(3, 'Puma Suede Classic', 'ruta/a/foto7.jpg'),(3, 'Puma Basket Classic', 'ruta/a/foto8.jpg'),
(3, 'Puma Roma', 'ruta/a/foto9.jpg'),(4, 'Vans Old Skool', 'ruta/a/foto10.jpg'),
(4, 'Vans Authentic', 'ruta/a/foto11.jpg'),(4, 'Vans Era', 'ruta/a/foto12.jpg'),
(5, 'Converse Chuck Taylor All Star', 'ruta/a/foto13.jpg'),(5, 'Converse One Star', 'ruta/a/foto14.jpg'),
(5, 'Converse Jack Purcell', 'ruta/a/foto15.jpg'),(6, 'New Balance 574', 'ruta/a/foto16.jpg'),
(6, 'New Balance 990', 'ruta/a/foto17.jpg'),(6, 'New Balance Fresh Foam', 'ruta/a/foto18.jpg'),
(7, 'Reebok Classic Leather', 'ruta/a/foto19.jpg'),(7, 'Reebok Club C', 'ruta/a/foto20.jpg'),
(7, 'Reebok Workout Plus', 'ruta/a/foto21.jpg'),(8, 'Skechers Go Walk', 'ruta/a/foto22.jpg'),
(8, 'Skechers D"Lites"', 'ruta/a/foto23.jpg'),(8, 'Skechers Energy', 'ruta/a/foto24.jpg'),
(9, 'Fila Disruptor II', 'ruta/a/foto25.jpg');

INSERT INTO ctg_tallas (descripcion_talla) VALUES
('4'),('4.5'),('5'),('5.5'),('6'),('6.5'),('7'),('7.5'),('8'),('8.5'),('9'),('9.5'),('10'),
('10.5'),('11'),('11.5'),('12'),('12.5'),('13'),('13.5'),('14'),('14.5'),('15'),('15.5'),
('16');

INSERT INTO prc_modelo_tallas (id_talla, id_modelo, stock_modelo_talla, precio_modelo_talla) VALUES
(1, 1, 10, 99.99),(1, 2, 5, 129.99),(1, 3, 15, 89.99),(2, 4, 8, 79.99),(2, 5, 3, 109.99),
(2, 6, 12, 69.99),(3, 7, 20, 79.99),(3, 8, 10, 99.99),(3, 9, 18, 69.99),(4, 10, 6, 89.99),
(4, 11, 2, 119.99),(4, 12, 10, 79.99),(5, 13, 15, 69.99),(5, 14, 5, 99.99),(5, 15, 12, 59.99),
(6, 16, 10, 99.99),(6, 17, 5, 129.99),(6, 18, 15, 89.99),(7, 19, 8, 79.99),(7, 20, 3, 109.99),
(7, 21, 12, 69.99),(8, 22, 20, 79.99),(8, 23, 10, 99.99),(8, 24, 18, 69.99),(9, 25, 6, 89.99);

INSERT INTO prc_pedidos (id_cliente, forma_pago_pedido, estado_pedido) VALUES
(1, 'Efectivo', 'Pendiente'),(2, 'Transferencia', 'Pendiente'),(3, 'Efectivo', 'Pendiente'),(4, 'Transferencia', 'Pendiente'),
(5, 'Efectivo', 'Pendiente'),(6, 'Transferencia', 'Pendiente'),(7, 'Efectivo', 'Pendiente'),(8, 'Transferencia', 'Pendiente'),
(9, 'Efectivo', 'Pendiente'),(10, 'Transferencia', 'Pendiente'),(11, 'Efectivo', 'Pendiente'),(12, 'Transferencia', 'Pendiente'),
(13, 'Efectivo', 'Pendiente'),(14, 'Transferencia', 'Pendiente'),(15, 'Efectivo', 'Pendiente'),(16, 'Transferencia', 'Pendiente'),
(17, 'Efectivo', 'Pendiente'),(18, 'Transferencia', 'Pendiente'),(19, 'Efectivo', 'Pendiente'),(20, 'Transferencia', 'Pendiente'),
(21, 'Efectivo', 'Pendiente'),(22, 'Transferencia', 'Pendiente'),(23, 'Efectivo', 'Pendiente'),(24, 'Transferencia', 'Pendiente'),
(25, 'Efectivo', 'Pendiente');

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


INSERT INTO ctg_tipo_noticias(descripcion_tipo_noticia,estado_tipo_noticia) 
VALUES('Oferta',true),('Nuevos productos',true),('Temporada',true);
SELECT * FROM ctg_tipo_noticias;

INSERT INTO prc_noticias(id_tipo_noticia,titulo_noticia,foto_noticia,contenido_noticia,estado_noticia,fecha_noticia )
VALUES(1,'Nuevas ofertas por el dia de san valentin','234342asd12.jpg','Este 14 de febrero, 
tendremos en oferta todos los productos mayores a 200$', true,now()),
(2,'Nuevas productos','pr3241jsksd.jpg','Este 8 de marzo vendran nuevos productos de la marca Nike edición 2024',
 true,now());
 SELECT * FROM prc_noticias;


INSERT INTO prc_pedidos(id_cliente,forma_pago_pedido,fecha_pedido,estado_pedido) 
VALUES(1,'Efectivo',now(),'Pendiente');
SELECT * FROM prc_detalle_pedidos;
SELECT * FROM prc_modelo_tallas where id_modelo_talla = 12;

UPDATE prc_detalle_pedidos
                SET cantidad_detalle_pedido = ?
                WHERE id_detalle = ? AND id_pedido = ?

select * from prc_comentarios



INSERT INTO prc_detalle_pedidos(id_pedido,id_modelo_talla,cantidad_detalle_pedido) VALUES(1,1,1);
INSERT INTO prc_comentarios(id_detalle,contenido_comentario,puntuacion_comentario,fecha_comentario,estado_comentario) 
VALUES(5,'Me llego en buenas condiciones y los colores son muy bonitos',5,now(),true);
SELECT * FROM prc_detalle_pedidos*/