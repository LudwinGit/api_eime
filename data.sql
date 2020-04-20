INSERT INTO rol(nombre) VALUES('admin');
INSERT INTO rol(nombre) VALUES('catedratico');
INSERT INTO rol(nombre) VALUES('estudiante');
SELECT * FROM rol;

INSERT INTO usuario(nombre,dpi,correo,id_rol) VALUES('admin','NA','NA',1);
INSERT INTO historial_password(pwd,fecha_hora,id_usuario,active) VALUES('admin',date_trunc('second', NOW()::timestamp),1,B'1');

select create_user_estudiante('Cristian Castellanos','3363952351720',
							  'cristian6cas@hotmail.es','45966437',
							  'mypassword','ciudad','/assets/cristian.png',
							  '201709181');
select create_user_estudiante('Paola Casiano','3363952351721',
							  'c.Casiano@gmail.com','45966438',
							  'mypassword','ciudad','/assets/paola.png',
							  '201709182');
select create_user_estudiante('Darwin Cifuentes','3363952351722',
							  'darwin@gmail.com','45966439',
							  'mypassword','ciudad','/assets/darwin.png',
							  '201709183');
select create_user_estudiante('Brayan Chinchilla','3363952351723',
							  'brayan@gmail.com','45966440',
							  'mypassword','ciudad','/assets/brayan.png',
							  '201709184');
select create_user_estudiante('Maria Polo','3363952351724',
							  'casocerrado@gmail.com','45966441',
							  'mypassword','ciudad','/assets/polo.png',
							  '201709185');
select create_user_estudiante('Edgar Solares','3363952351725',
							  'edgar@hotmail.es','45966442',
							  'mypassword','ciudad','/assets/edgar.png',
							  '201709186');
select create_user_estudiante('Maria Rene','3363952351726',
							  'rene@gmail.com','45966443',
							  'mypassword','ciudad','/assets/rene.png',
							  '201709187');

select create_user_catedratico('Luis Espino','3363952351727',
							  'espino@gmail.com','45966444',
							  'mypassword','ciudad','/assets/espino.png',
							  'Ing. Sistemas','/assets/firmaEspino.png');
select create_user_catedratico('Claudia Contreras','3363952351728',
							  'cluaida@gmail.com','45966445',
							  'mypassword','ciudad','/assets/contreras.png',
							  'Ing. Sistemas','/assets/firmaContreras.png');
select create_user_catedratico('Bayron Lopes','3363952351729',
							  'blopez@gmail.com','45966446',
							  'mypassword','ciudad','/assets/darwin.png',
							  'Ing. Sistemas','/assets/firmaBayron.png');
select create_user_catedratico('Fernando Lopez','3363952351730',
							  'fernando@gmail.com','45966447',
							  'mypassword','ciudad','/assets/brayan.png',
							  'Ing. Sistemas','/assets/firmaFernando.png');
select create_user_catedratico('Jorge Alvarez','3363952351731',
							  'alvarez@gmail.com','45966448',
							  'mypassword','ciudad','/assets/polo.png',
							  'Ing. Sistemas','/assets/firmaAlvarrez.png');
select create_user_catedratico('Carlos Bolaños','3363952351732',
							  'bolanios@hotmail.es','45966449',
							  'mypassword','ciudad','/assets/edgar.png',
							  'Ing. Sistemas','/assets/firmaBolanios.png');
select create_user_catedratico('Oscar  Paz','3363952351733',
							  'paz@gmail.com','45966450',
							  'mypassword','ciudad','/assets/rene.png',
							  'Ing. Sistemas','/assets/firmaPaz.png');
							  
select * from usuario;
select * from historial_password;

--Recuperar id usuari nombre y password actual
select U.id_usuario, U.nombre, H.pwd as Password
from usuario U
inner join historial_password H
on U.id_usuario = H.id_usuario
AND H.active = B'1';

--Listado de profesores para asignar a diplomados
select * from usuario where id_rol= 2;
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Estructura de Datos' ,9, 120,40, 'T3-410', '07:00:00', '16-01-2020','Curso inicial de estructuras');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Bases de datos 1'    ,9, 120,40, 'T3-410', '07:00:00', '17-01-2020','Curso inicial de bases 1');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Softwate avanzado 1' ,9, 120,40, 'T3-410', '07:00:00', '15-01-2020','Curso inicial de software 1');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Organizacion de lenguajes y compiladores 2',
		   						  9, 120,40, 'T3-310', '07:00:00','21-01-2020','Curso compiladores2');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Estadistica 1', 10, 120,40, 'T1-310','07:00:00','15-01-2020','Curso estadistica 1');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Organizacion de lenguajes y compiladores 2',
		                         11, 120,40, 'T3-310','07:00:00', '18-01-2020','Curso compiladores2');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Redes de computadoras 1',
		   						 12, 120,40, 'T3-210','07:00:00','16-01-2020','Curso de redes 1');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Teoria de sistemas 2',
		   						 13, 120,60, 'T3-110','07:00:00','16-01-2020','Curso de teo2');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Matematica Basica 1',14, 120,40, 'S12-110','07:00:00','15-01-2020','Curso mate1');
INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)
	VALUES('Manejo e implementacion de archivos',
		   						 15, 120,40, 'T5-301', '07:00:00', '15-01-2020', 'Curso archivos');
	
select * from diplomado;
--Se crean por defecto la primer sesion con el horario y fecha inicio del curso
select * from sesion;
--En este momento no hay ningun asignado entonces no se genera la asistencia a la primer sesion
select * from asistencia;

--Listado de estudiantes para asignar a diplomados
select * from usuario where id_rol= 3;
--Un trigger al asignar genera la primera asistencia a la primer sesion 
INSERT INTO asignacion VALUES(2,1, DATE_TRUNC('second', NOW()),'2_1_YHLQMDLG');
INSERT INTO asignacion VALUES(3,1, DATE_TRUNC('second', NOW()),'3_1_YHLQMDLG');
INSERT INTO asignacion VALUES(4,1, DATE_TRUNC('second', NOW()),'4_1_YHLQMDLG');
INSERT INTO asignacion VALUES(5,1, DATE_TRUNC('second', NOW()),'5_1_YHLQMDLG');
INSERT INTO asignacion VALUES(6,1, DATE_TRUNC('second', NOW()),'6_1_YHLQMDLG');
INSERT INTO asignacion VALUES(7,1, DATE_TRUNC('second', NOW()),'7_1_YHLQMDLG');
INSERT INTO asignacion VALUES(8,1, DATE_TRUNC('second', NOW()),'8_1_YHLQMDLG');

INSERT INTO asignacion VALUES(2,3, DATE_TRUNC('second', NOW()),'2_3_YHLQMDLG');
INSERT INTO asignacion VALUES(3,3, DATE_TRUNC('second', NOW()),'3_3_YHLQMDLG');
INSERT INTO asignacion VALUES(4,3, DATE_TRUNC('second', NOW()),'4_3_YHLQMDLG');
INSERT INTO asignacion VALUES(5,3, DATE_TRUNC('second', NOW()),'5_3_YHLQMDLG');
INSERT INTO asignacion VALUES(6,3, DATE_TRUNC('second', NOW()),'6_3_YHLQMDLG');
INSERT INTO asignacion VALUES(7,3, DATE_TRUNC('second', NOW()),'7_3_YHLQMDLG');
INSERT INTO asignacion VALUES(8,3, DATE_TRUNC('second', NOW()),'8_3_YHLQMDLG');

INSERT INTO asignacion VALUES(2,2, DATE_TRUNC('second', NOW()),'2_2_YHLQMDLG');
INSERT INTO asignacion VALUES(3,2, DATE_TRUNC('second', NOW()),'3_2_YHLQMDLG');
INSERT INTO asignacion VALUES(4,2, DATE_TRUNC('second', NOW()),'4_2_YHLQMDLG');
INSERT INTO asignacion VALUES(5,4, DATE_TRUNC('second', NOW()),'5_2_YHLQMDLG');
INSERT INTO asignacion VALUES(6,4, DATE_TRUNC('second', NOW()),'6_2_YHLQMDLG');
INSERT INTO asignacion VALUES(7,4, DATE_TRUNC('second', NOW()),'7_2_YHLQMDLG');
INSERT INTO asignacion VALUES(8,4, DATE_TRUNC('second', NOW()),'8_2_YHLQMDLG');

INSERT INTO asignacion VALUES(2,5, DATE_TRUNC('second', NOW()),'2_5_YHLQMDLG');
INSERT INTO asignacion VALUES(3,5, DATE_TRUNC('second', NOW()),'3_5_YHLQMDLG');
INSERT INTO asignacion VALUES(4,5, DATE_TRUNC('second', NOW()),'4_5_YHLQMDLG');
INSERT INTO asignacion VALUES(5,5, DATE_TRUNC('second', NOW()),'5_5_YHLQMDLG');
INSERT INTO asignacion VALUES(6,5, DATE_TRUNC('second', NOW()),'6_5_YHLQMDLG');
INSERT INTO asignacion VALUES(7,5, DATE_TRUNC('second', NOW()),'7_5_YHLQMDLG');
INSERT INTO asignacion VALUES(8,5, DATE_TRUNC('second', NOW()),'8_5_YHLQMDLG');

INSERT INTO asignacion VALUES(2,6, DATE_TRUNC('second', NOW()),'2_6_YHLQMDLG');
INSERT INTO asignacion VALUES(3,6, DATE_TRUNC('second', NOW()),'3_6_YHLQMDLG');
INSERT INTO asignacion VALUES(4,6, DATE_TRUNC('second', NOW()),'4_6_YHLQMDLG');
INSERT INTO asignacion VALUES(5,6, DATE_TRUNC('second', NOW()),'5_6_YHLQMDLG');
INSERT INTO asignacion VALUES(6,6, DATE_TRUNC('second', NOW()),'5_6_YHLQMDLG');
INSERT INTO asignacion VALUES(7,6, DATE_TRUNC('second', NOW()),'7_6_YHLQMDLG');
INSERT INTO asignacion VALUES(8,6, DATE_TRUNC('second', NOW()),'8_6_YHLQMDLG');

INSERT INTO asignacion VALUES(2,7, DATE_TRUNC('second', NOW()),'2_7_YHLQMDLG');
INSERT INTO asignacion VALUES(3,7, DATE_TRUNC('second', NOW()),'3_7_YHLQMDLG');
INSERT INTO asignacion VALUES(4,7, DATE_TRUNC('second', NOW()),'4_7_YHLQMDLG');
INSERT INTO asignacion VALUES(5,8, DATE_TRUNC('second', NOW()),'5_7_YHLQMDLG');
INSERT INTO asignacion VALUES(6,8, DATE_TRUNC('second', NOW()),'6_7_YHLQMDLG');
INSERT INTO asignacion VALUES(7,8, DATE_TRUNC('second', NOW()),'7_7_YHLQMDLG');
INSERT INTO asignacion VALUES(8,8, DATE_TRUNC('second', NOW()),'8_7_YHLQMDLG');

--Todas las asignaciones
select * from asignacion;

--Asignaciones de un estudiante por el numero de carne
select u.nombre, c.nombre 
from diplomado c
inner join asignacion a
on c.id_diplomado = a.id_diplomado
inner join usuario u
on u.id_usuario = a.id_usuario
and u.carne='201709181';

--podemos ver que se crearon las asistencia a las sesion de los cursos a los que se asignaron TODO para la primer sesion
select * from asistencia;

--La primer sesion de cada diplomado esta creada pero falta agregar la hora limite y contrasenia
--Es la unica sesion que se puede editar, las demas se insertan directamente con toda su informacion
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 1;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 2;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 3;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 4;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 5;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 6;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 7;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 8;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 9;
UPDATE sesion SET codigo_validacion='generadoNuevamente', hora_limite = '09:00:00' WHERE id_sesion = 10;


INSERT INTO sesion(id_diplomado,codigo_validacion,fecha,hora_inicio, hora_limite)
VALUES(1,'codigo1', '21-01-2020','07:00:00','09:00:00');

--Al crear una sesion aniade las asistencias a los usuarios
select * from sesion;
--select * from diplomado;
select * from asistencia;

--Validar asistencias
select validar_asistencia(2,1, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:50:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(3,1, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:07:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(4,1, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 07:15:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(5,1, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(6,1, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:59:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(7,1, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:33:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(8,1, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 07:30:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);

select validar_asistencia(2,3, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(3,3, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(4,3, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(5,3, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(6,3, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(7,3, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(8,3, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);

select validar_asistencia(2,2, 'generadoNuevamente', 
	TO_TIMESTAMP('17-01-2020 20:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(3,2, 'generadoNuevamente', 
	TO_TIMESTAMP('17-01-2020 20:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(4,2, 'generadoNuevamente', 
	TO_TIMESTAMP('17-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
	
select validar_asistencia(5,4, 'generadoNuevamente', 
	TO_TIMESTAMP('21-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(6,4, 'generadoNuevamente', 
	TO_TIMESTAMP('21-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(7,4, 'generadoNuevamente', 
	TO_TIMESTAMP('21-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(8,4, 'generadoNuevamente', 
	TO_TIMESTAMP('21-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);

select validar_asistencia(2,5, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(3,5, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(4,5, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(5,5, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(6,5, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(7,5, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(8,5, 'generadoNuevamente', 
	TO_TIMESTAMP('15-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
	
select validar_asistencia(2,7, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(3,7, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(4,7, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
	
select validar_asistencia(5,8, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(6,8, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(7,8, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(8,8, 'generadoNuevamente', 
	TO_TIMESTAMP('16-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);

select validar_asistencia(2,6, 'generadoNuevamente', 
	TO_TIMESTAMP('18-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(3,6, 'generadoNuevamente', 
	TO_TIMESTAMP('18-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(4,6, 'generadoNuevamente', 
	TO_TIMESTAMP('18-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(5,6, 'generadoNuevamente', 
	TO_TIMESTAMP('18-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(6,6, 'generadoNuevamente', 
	TO_TIMESTAMP('18-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(7,6, 'generadoNuevamente', 
	TO_TIMESTAMP('18-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(8,6, 'generadoNuevamente', 
	TO_TIMESTAMP('18-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);

select validar_asistencia(2,11, 'codigo1', 
	TO_TIMESTAMP('21-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(3,11, 'codigo1', 
	TO_TIMESTAMP('21-01-2020 08:00:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(4,11, 'codigo1', 
	TO_TIMESTAMP('21-01-2020 08:10:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(5,11, 'codigo1', 
	TO_TIMESTAMP('21-01-2020 08:10:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(6,11, 'codigoMalo', 
	TO_TIMESTAMP('21-01-2020 07:10:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(7,11, 'codigo1', 
	TO_TIMESTAMP('22-01-2020 00:01:00','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(8,11, 'codigo1', 
	TO_TIMESTAMP('22-01-2020 00:10:45','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select * from asistencia where id_sesion = 11;

/*select validar_asistencia(1,9, 'sin este codigo no es valida la asistencia', NOW()::TIMESTAMP);
select validar_asistencia(1,9, 'sin este codigo no es valida la asistencia', 
						  TO_TIMESTAMP('16-03-2020 15:27:51','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
select validar_asistencia(1,9, 'sin este codigo no es valida la asistencia', 
						  TO_TIMESTAMP('17-03-2020 14:59:51','DD-MM-YYYY HH24:MI:SS')::timestamp without time zone);
update asistencia set asistio = B'0';
select * from sesion;
update sesion set hora_limite='23:59:59' where id_sesion = 9;
update sesion set hora_limite='15:00:00' where id_sesion = 9;*/
