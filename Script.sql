SET datestyle = 'SQL,DMY';
SET lc_time = 'es_MX.utf8';

CREATE TABLE rol(
	id_rol SERIAL PRIMARY KEY,
	nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE usuario(
	id_usuario SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	dpi VARCHAR(45) UNIQUE NOT NULL,
	correo VARCHAR(200) UNIQUE NOT NULL,
	deBaja BIT DEFAULT B'0',
	id_rol INTEGER,
	CONSTRAINT fk_usuario_rol
		FOREIGN KEY (id_rol)
		REFERENCES rol(id_rol) ON DELETE NO ACTION,
	
	telefono VARCHAR(45),
	direccion VARCHAR(200),
	foto text,
	
	carne VARCHAR(10) UNIQUE, --Para usuario *Es obligatorio
	
	carrera VARCHAR(200),--Para catedratico *Es obligatorio
	firma text	 --Para catedratico *Es obligatorio
);

CREATE TABLE bitacora(
	correlativo SERIAL PRIMARY KEY,
	id_usuario INTEGER NOT NULL,
	fecha_hora TIMESTAMP NOT NULL,
	ip VARCHAR(100) NOT NULL,
	CONSTRAINT fk_bitacora_usuario
		FOREIGN KEY (id_usuario)
		REFERENCES usuario(id_usuario) ON DELETE NO ACTION
);

CREATE TABLE historial_password(
	id_password SERIAL PRIMARY KEY,
	pwd VARCHAR(50) NOT NULL,
	fecha_hora TIMESTAMP,
	id_usuario INTEGER NOT NULL,
	CONSTRAINT fk_pass_usuario
		FOREIGN KEY (id_usuario)
		REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	active BIT DEFAULT B'0',
	CONSTRAINT u_pass_usuario
		UNIQUE(pwd,id_usuario)
);

CREATE TABLE diplomado(
	id_diplomado SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	id_catedratico INTEGER NOT NULL,
	CONSTRAINT fk_diplomado_usuario
		FOREIGN KEY (id_catedratico)
		REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	duracion_h SMALLINT NOT NULL,
	no_sesiones SMALLINT NOT NULL,
	lugar VARCHAR(100) NOT NULL,
	hora TIME NOT NULL,
	fecha_inicio DATE NOT NULL,
	estado BIT DEFAULT B'1',
	descripcion VARCHAR(200),
	CONSTRAINT u_fecha_hora
		UNIQUE(lugar,fecha_inicio,hora)
);

CREATE TABLE sesion(
	id_sesion SERIAL PRIMARY KEY,
	id_diplomado INTEGER NOT NULL,
	CONSTRAINT fk_session_diplomado
		FOREIGN KEY (id_diplomado)
		REFERENCES diplomado(id_diplomado) ON DELETE CASCADE,
	codigo_validacion VARCHAR(100),
	fecha DATE NOT NULL,
	hora_inicio TIME NOT NULL,
	hora_limite TIME,
	CONSTRAINT u_diplomado_sesion
		UNIQUE(id_diplomado,fecha,hora_inicio)
);

CREATE TABLE asignacion(
	id_usuario INTEGER NOT NULL,
	id_diplomado INTEGER NOT NULL,
	fecha_hora TIMESTAMP NOT NULL,
	codigo_unico VARCHAR(100) NOT NULL,
	PRIMARY KEY(id_diplomado, id_usuario),
	CONSTRAINT fk_asignacion_diplomado
		FOREIGN KEY (id_diplomado)
		REFERENCES diplomado(id_diplomado) ON DELETE NO ACTION,
	CONSTRAINT fk_asignacion_usuario
		FOREIGN KEY (id_usuario)
		REFERENCES usuario(id_usuario) ON DELETE NO ACTION
);

CREATE TABLE asistencia(
	id_usuario INTEGER NOT NULL,
	id_sesion INTEGER NOT NULL,
	PRIMARY KEY (id_sesion, id_usuario),
	CONSTRAINT fk_asistencia_sesion
		FOREIGN KEY (id_sesion)
		REFERENCES sesion(id_sesion) ON DELETE CASCADE,
	CONSTRAINT fk_asistencia_usuario
		FOREIGN KEY (id_usuario)
		REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	fecha_hora TIMESTAMP,
	asistio BIT DEFAULT B'0'
);

CREATE OR REPLACE FUNCTION create_first_session()
  RETURNS trigger AS $$
BEGIN
	INSERT INTO sesion(id_diplomado,fecha,hora_inicio,codigo_validacion)
	VALUES(NEW.id_diplomado, NEW.fecha_inicio,NEW.hora,'Bienvenida');
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER first_session
  AFTER INSERT
  ON diplomado
  FOR EACH ROW
  EXECUTE PROCEDURE create_first_session();
 
 CREATE OR REPLACE FUNCTION create_user_estudiante(
	_nombre VARCHAR(100),
	_dpi VARCHAR(45),
	_correo VARCHAR(200),
	_telefono VARCHAR(45),
	_pwd VARCHAR(50),
	_direccion VARCHAR(200),
	_foto text,
	_carne VARCHAR(10)
	)
  RETURNS text AS $$
DECLARE new_id integer;
BEGIN
	new_id = (SELECT nextval(pg_get_serial_sequence('usuario', 'id_usuario')));
	INSERT INTO usuario(id_usuario,nombre,dpi,correo,telefono,id_rol,direccion,foto,carne)
	VALUES(new_id, _nombre, _dpi, _correo, _telefono,3, _direccion,_foto,_carne);
	INSERT INTO historial_password(pwd,fecha_hora,id_usuario,active)
	VALUES(_pwd,DATE_TRUNC('second', NOW()::timestamp), new_id,B'1');
	RETURN 'Agregado con exito';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_user_catedratico(
	_nombre VARCHAR(100),
	_dpi VARCHAR(45),
	_correo VARCHAR(200),
	_telefono VARCHAR(45),
	_pwd VARCHAR(50),
	_direccion VARCHAR(200),
	_foto text,
	_carrera VARCHAR(200),
	_firma text
	)
  RETURNS text AS $$
DECLARE new_id integer;
BEGIN
	new_id = (SELECT nextval(pg_get_serial_sequence('usuario', 'id_usuario')));
	INSERT INTO usuario(id_usuario,nombre,dpi,correo,telefono,id_rol,direccion,foto,carrera,firma)
	VALUES(new_id, _nombre, _dpi, _correo, _telefono,2, _direccion,_foto,_carrera,_firma);
	INSERT INTO historial_password(pwd,fecha_hora,id_usuario,active)
	VALUES(_pwd, DATE_TRUNC('second', NOW()::timestamp), new_id,B'1');
	RETURN 'Agregado con exito';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_asistencias()
  RETURNS trigger AS $$
DECLARE r asignacion%rowtype;
BEGIN
	FOR r IN
        SELECT * FROM asignacion WHERE id_diplomado = NEW.id_diplomado
    LOOP
        INSERT INTO asistencia(id_usuario,id_sesion)
		VALUES(r.id_usuario, NEW.id_sesion);
    END LOOP;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_session_asistencia
  AFTER INSERT
  ON sesion
  FOR EACH ROW
  EXECUTE PROCEDURE create_asistencias();
  
CREATE OR REPLACE FUNCTION validar_asistencia(
	_id_usuario INTEGER,
	_id_sesion INTEGER,
	_codigo VARCHAR(100),
	_fecha_hora TIMESTAMP)
  RETURNS text  AS $$
DECLARE s sesion%rowtype;
BEGIN
	SELECT INTO s * FROM sesion WHERE id_sesion = _id_sesion;
	IF(s.codigo_validacion = _codigo) THEN
		IF(s.fecha = _fecha_hora::timestamp::date) THEN
			IF(_fecha_hora::timestamp::time>=s.hora_inicio AND _fecha_hora::timestamp::time<=s.hora_limite) THEN
				BEGIN
					UPDATE asistencia SET asistio = B'1', fecha_hora=DATE_TRUNC('second', _fecha_hora) WHERE id_usuario = _id_usuario AND id_sesion = _id_sesion;
					RETURN 'Asistencia valida' as mensaje;
				END;
			END IF;
			RETURN 'No cumple la hora';
		END IF;
		RETURN 'No cumple la fecha';
	END IF;
	RETURN 'Codigo no valido';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_first_asistencia()
  RETURNS trigger AS $$
DECLARE cu diplomado%rowtype;
	s sesion%rowtype;
BEGIN
	SELECT INTO cu * FROM diplomado WHERE id_diplomado = NEW.id_diplomado;
	SELECT INTO s * FROM sesion WHERE id_diplomado = NEW.id_diplomado AND fecha = cu.fecha_inicio;
	INSERT INTO asistencia(id_usuario, id_sesion)
	VALUES(NEW.id_usuario, s.id_sesion);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER first_asistencia
  AFTER INSERT
  ON asignacion
  FOR EACH ROW
  EXECUTE PROCEDURE create_first_asistencia();
  
/*
DROP TABLE asistencia;
DROP TABLE asignacion;
DROP TABLE sesion;
DROP TABLE diplomado;
DROP TABLE historial_password;
DROP TABLE bitacora;
DROP TABLE usuario;
DROP TABLE rol;

DROP FUNCTION create_user_catedratico;
DROP FUNCTION create_user_estudiante;
DROP FUNCTION validar_asistencia;

*/