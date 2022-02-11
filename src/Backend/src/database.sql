/* 
  ******** THIS FILE IS DOCUMENTATION FOR THE DATABASE ********
*/
CREATE DATABASE dbexams;

use dbexams;

CREATE TABLE usuario(
  matricula int not null,
  nombre    varchar(20) not null,
  apellido  varchar(20) not null,
  email     varchar(40) not null,
  password  blob not null,
  rol       varchar(10) not null,
  primary key(matricula)
);
ALTER TABLE usuario ADD carrera varchar(45) AFTER password;

CREATE TABLE tema(
  id_tema     int not null auto_increment,
  nombre_tema varchar(70) not null,
  primary key(id_tema) 
);

CREATE TABLE subtema(
  id_tema         int not null,
  id_subtema      int not null auto_increment,
  nombre_subtema  varchar(70) not null,
  primary key (id_subtema),
  foreign key (id_tema) references tema(id_tema) on update cascade on delete cascade
);

CREATE TABLE pregunta(
  id_tema         int not null,
  id_subtema      int not null,
  id_pregunta     int not null auto_increment,
  pregunta        text not null,
  correcta        text not null,
  incorrecta1     text not null,
  incorrecta2     text not null,
  incorrecta3     text not null,
  argumento       text not null,
  primary key (id_pregunta),
  foreign key (id_tema) references tema(id_tema) on update cascade on delete cascade,
  foreign key (id_subtema) references subtema(id_subtema) on update cascade on delete cascade
);

INSERT INTO usuario (matricula, nombre, apellido, email, password, carrera, rol) values (201772797, 'José Miguel', 'López', 'josemiguel.lml@gmail.com', aes_encrypt('Jose1234', '#irn15'), '', 'Docente');
INSERT INTO usuario (matricula, nombre, apellido, email, password, carrera, rol) values (201772798, 'Miguel', 'Aguilera', 'josemiguel_3093@hotmail.com', aes_encrypt('Jose1234', '#irn15'), 'Ingeniería en Ciencias de la Computación', 'Alumno');
SELECT * FROM usuario;
SELECT matricula, aes_decrypt(password, '#irn15') FROM usuario;
SELECT rol, aes_decrypt(password, '#irn15') FROM usuario WHERE matricula = 201772797;

INSERT INTO tema (nombre_tema) values ('Introducción a Ingeniería de Software');
INSERT INTO tema (nombre_tema) values ('Modelos de Procesos de Desarrollo de Software');
INSERT INTO tema (nombre_tema) values ('Gestion de Proyectos Software');
INSERT INTO tema (id_tema, nombre_tema) values (4, 'Planeación');
DELETE FROM tema where id_tema = 4;

INSERT INTO subtema (id_tema, nombre_subtema) values (1, "Subtema de Introduccion 1");
INSERT INTO subtema (id_tema, nombre_subtema) values (4, "Subtema de Planeacion 1");
INSERT INTO subtema (id_tema, nombre_subtema) values (4, "Subtema de Planeacion 2");
INSERT INTO subtema (id_tema, nombre_subtema) values (4, "Subtema de Planeacion 3");
DELETE FROM subtema WHERE id_subtema = 2;

INSERT INTO pregunta (id_tema, id_subtema, pregunta, correcta, incorrecta1, incorrecta2, incorrecta3, argumento) 
  values (4, 1, "Pregunta de prueba 1", "Correct Answer", "Bad Answer", "Bad Answer", "Bad Answer", "Argumento 1");
INSERT INTO pregunta (id_tema, id_subtema, pregunta, correcta, incorrecta1, incorrecta2, incorrecta3, argumento) 
  values (4, 1, "Pregunta de prueba 2", "Correct Answer", "Bad Answer", "Bad Answer", "Bad Answer", "Argumento 1");
INSERT INTO pregunta (id_tema, id_subtema, pregunta, correcta, incorrecta1, incorrecta2, incorrecta3, argumento) 
  values (4, 2, "Pregunta de prueba 3", "Correct Answer", "Bad Answer", "Bad Answer", "Bad Answer", "Argumento 1");
INSERT INTO pregunta (id_tema, id_subtema, pregunta, correcta, incorrecta1, incorrecta2, incorrecta3, argumento) 
  values (4, 2, "Pregunta de prueba 4", "Correct Answer", "Bad Answer", "Bad Answer", "Bad Answer", "Argumento 1");

DROP TABLE tema, subtema, pregunta;

/* DRAFT */

create table historial(
  id_historial int not null auto_increment primary key,
  matricula int not null,
  id_tema int not null,
  calificacion double not null,
  fecha date not null,
  num_correctas int (5) not null,
  num_incorrectas int (5) not null,
  foreign key (matricula) references usuario(matricula) 
  on delete cascade on update cascade,
  foreign key (id_tema) references tema(id_tema) on 
  delete cascade on update cascade
);

