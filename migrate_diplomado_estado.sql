--Cambiando el tipo de dato de BIT a smallint para
--guardar mas estados del diplomado *** el nuevo estado es, cancelado****
--Sigue la misma nomenclatura 
--0 finalizado
--1 activo
--2 Cancelado
CREATE TABLE tmp_diplomado(
	id INTEGER PRIMARY KEY,
	estado SMALLINT
);

INSERT INTO tmp_diplomado
SELECT id_diplomado, 
	CASE WHEN estado = B'1' THEN 1
	ELSE 0 END
FROM diplomado;

--Comporbamos que la informacion se haya guardado de forma correcta
SELECT d.id_diplomado, t.id ,d.estado, t.estado
FROM diplomado d,  tmp_diplomado t
WHERE d.id_diplomado = t.id;

--Votamos la columna de estado
ALTER TABLE diplomado DROP COLUMN estado;

--Aniadimos la nueva columna
ALTER TABLE diplomado ADD COLUMN estado SMALLINT DEFAULT 1;

--Por el momento todos tiene el valor por defecto
select * from diplomado;

--Actualizamos con la nueva informacion
UPDATE diplomado
    SET estado = r.estado
FROM 
	( SELECT t.id as id, t.estado as estado FROM tmp_diplomado t) r
WHERE diplomado.id_diplomado = r.id;

--Comprobamos los cambios
SELECT * from diplomado;
