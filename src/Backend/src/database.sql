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
  foreign key (id_tema) references tema(id_tema)
);

ALTER TABLE usuario ADD carrera varchar(45) AFTER password;

INSERT INTO usuario (matricula, nombre, apellido, email, password, rol) values (201772797, 'José Miguel', 'López', 'josemiguel.lml@gmail.com', aes_encrypt('Jose1234', '#irn15'), 'Alumno');
SELECT * FROM usuario;
SELECT matricula, aes_decrypt(password, '#irn15') FROM usuario;
SELECT rol, aes_decrypt(password, '#irn15') FROM usuario WHERE matricula = 201772797;

INSERT INTO tema (nombre_tema) values ('Introducción a Ingeniería de Software');
INSERT INTO tema (nombre_tema) values ('Modelos de Procesos de Desarrollo de Software');
INSERT INTO tema (nombre_tema) values ('Gestion de Proyectos Software');

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

