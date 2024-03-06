
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

/*FUNCION PARA SELECCIONAR EL PRIMER REGISTRO*/
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
        ELSE
            SET min_id = NULL;
    END CASE;

    RETURN min_id;
END//
DELIMITER ;

/*PROCEDMIENTO PARA INSERTAR UN MODELO*/
DELIMITER $$
CREATE PROCEDURE insertar_modelo(
    IN nombre_marca VARCHAR(255),
    IN descripcion_modelo VARCHAR(255),
    IN foto_modelo LONGTEXT
)
BEGIN
    DECLARE id_marca_param INT;

    SELECT id_marca INTO id_marca_param
    FROM ctg_marcas
    WHERE descripcion_marca = nombre_marca;
    
    INSERT INTO prc_modelos (id_marca, descripcion_modelo, foto_modelo)
    VALUES (id_marca_param, descripcion_modelo, foto_modelo);

    SELECT LAST_INSERT_ID() AS id_modelo;
END$$
DELIMITER ;
