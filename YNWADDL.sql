
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
        ELSE
            SET min_id = NULL;
    END CASE;

    RETURN min_id;
END//
DELIMITER ;