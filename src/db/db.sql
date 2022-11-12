CREATE DATABASE company WITH
OWNER = 'postgres'
ENCODING = 'UTF8';

\c company
--Eliminacion de tablas---
DROP TABLE IF EXISTS departamento;
DROP TABLE IF EXISTS empleados;

CREATE SEQUENCE departamento_codigo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE;

CREATE TABLE departamento(
    codigo_departamento INTEGER NOT NULL DEFAULT NEXTVAL('departamento_codigo_seq'),
    nombre VARCHAR(100) NOT NULL,
    presupuesto float,
     PRIMARY KEY (codigo_departamento));

cleINSERT INTO departamento(nombre,presupuesto) VALUES('Financiero', 2000.1);     
INSERT INTO departamento (nombre,presupuesto) VALUES('Recursos Humanos',3020.2);
INSERT INTO departamento (nombre,presupuesto) VALUES('Comercial',4054.2);
INSERT INTO departamento (nombre,presupuesto) VALUES('Compras', 5467.1);

  \d departamento

CREATE SEQUENCE empleados_codigo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE;

    CREATE TABLE empleados(
        codigo_empleados  INTEGER NOT NULL DEFAULT NEXTVAL('empleados_codigo_seq'),
        nombre VARCHAR(100)DEFAULT NULL,
        apellido1 VARCHAR(100) NOT NULL,
        apellido2 VARCHAR(100) NOT NULL,
        direccion varchar(50) NOT NULL,
        telefono varchar(10) NOT NULL,
        puesto varchar(15) NOT NULL,
        fk_departamento SERIAL NOT NULL,

        PRIMARY KEY (codigo_empleados),
        FOREIGN KEY (fk_departamento)
        REFERENCES departamento(codigo_departamento)ON DELETE RESTRICT ON UPDATE CASCADE
    );


INSERT INTO empleados (nombre,apellido1,apellido2, direccion , telefono,puesto,fk_departamento) 
VALUES ('Ryan','ruiz' ,'contreras','cr98#74-51','3123456783','Gerente','1');

INSERT INTO empleados (nombre,apellido1,apellido2,direccion , telefono,puesto,fk_departamento) 
VALUES ('joe ','peres','gelvez','dg 106 # 13-11','3127754123','reclutador','2');

INSERT INTO empleados (nombre,apellido1,apellido2,direccion , telefono,puesto,fk_departamento) 
VALUES ('johan','leal','gonzales','dg 106 # 13-11','3143135723','vendedor','3');


INSERT INTO empleados (nombre,apellido1,apellido2,direccion , telefono,puesto,fk_departamento) 
VALUES ('pedro ','diaz','angarita','dg 20 #13-18','3153451289','lider','4');

INSERT INTO empleados (nombre,apellido1,apellido2,direccion , telefono,puesto,fk_departamento) 
VALUES ('carlos','leon' ,'castro','cll 54#24-53','3143879102','Facilitador','2');

INSERT INTO empleados (nombre,apellido1,apellido2,direccion , telefono,puesto,fk_departamento) 
VALUES ('ana ','garcia','porra','cr 10 # 11-42','3175411923','Auxiliar ','1');

INSERT INTO empleados (nombre,apellido1,apellido2,direccion , telefono,puesto,fk_departamento) 
VALUES ('jose ','garcia','quintero','cr 10 # 11-42','3175411923','vendedor ','3');

INSERT INTO empleados (nombre,apellido1,apellido2,direccion , telefono,puesto,fk_departamento) 
VALUES ('cristian','zapata','duque','cr 10 # 11-42','3175411923','jefe ','4');