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
  carrera   varchar(45),
  rol       varchar(10) not null,
  primary key(matricula)
);

CREATE TABLE tema(
  id_tema     int not null auto_increment,
  nombre_tema varchar(100) not null,
  primary key(id_tema) 
);

CREATE TABLE subtema(
  id_tema         int not null,
  id_subtema      int not null auto_increment,
  nombre_subtema  varchar(100) not null,
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
  imagen          text,
  primary key (id_pregunta),
  foreign key (id_tema) references tema(id_tema) on update cascade on delete cascade,
  foreign key (id_subtema) references subtema(id_subtema) on update cascade on delete cascade
);

CREATE TABLE historial(
  id_historial    int not null auto_increment,
  matricula       int not null,
  id_tema         int not null,
  num_correctas   int not null,
  num_incorrectas int not null,
  calificacion    double not null,
  fecha           date not null,
  primary key (id_historial),
  foreign key (matricula) references usuario(matricula) on update cascade on delete cascade,
  foreign key (id_tema) references tema(id_tema) on update cascade on delete cascade
);

/* PROCEDURES */

DELIMITER //
CREATE PROCEDURE insertTopic (IN topic VARCHAR(100), IN subtopic VARCHAR(100))
BEGIN
  INSERT INTO tema (nombre_tema) values (topic);
  SET @a = LAST_INSERT_ID();
  INSERT INTO subtema (id_tema, nombre_subtema) values (@a, subtopic);
  SET @b = LAST_INSERT_ID();
  SELECT * FROM tema INNER JOIN subtema WHERE tema.id_tema = @a and subtema.id_subtema = @b;
END //

DELIMITER //
CREATE PROCEDURE insertSubtopic (IN topicID INT, IN subtopic varchar(100))
BEGIN
  INSERT INTO subtema (id_tema, nombre_subtema) values (topicID, subtopic);
  SET @a = LAST_INSERT_ID();
  SELECT id_subtema FROM subtema WHERE id_subtema = @a;
END //

DELIMITER //
CREATE PROCEDURE insertQuestion (IN topicID INT, IN subtopicID INT, IN question text, IN correct text, IN incorrect1 text, IN incorrect2 text, IN incorrect3 text, IN argument text)
BEGIN
  INSERT INTO pregunta (id_tema, id_subtema, pregunta, correcta, incorrecta1, incorrecta2, incorrecta3, argumento) values (topicID, subtopicID, question, correct, incorrect1, incorrect2, incorrect3, argument);
  SET @a = LAST_INSERT_ID();
  SELECT id_pregunta FROM pregunta WHERE id_pregunta = @a;
END //

DELIMITER //
CREATE PROCEDURE insertHistory (IN matricula INT, IN topicID INT, IN corrects INT, IN incorrects INT, IN qualification double)
BEGIN
  INSERT INTO historial (matricula, id_tema, num_correctas, num_incorrectas, calificacion, fecha) values (matricula, topicID, corrects, incorrects, qualification, CURRENT_TIMESTAMP());
  SET @a = LAST_INSERT_ID();
  SELECT id_historial FROM historial WHERE id_historial = @a;
END //

/* DATA TEST */

INSERT INTO usuario (matricula, nombre, apellido, email, password, carrera, rol) values (201772797, 'José Miguel', 'López', 'josemiguel.lml@gmail.com', aes_encrypt('Jose1234', '#irn15'), '', 'Docente');
INSERT INTO usuario (matricula, nombre, apellido, email, password, carrera, rol) values 
(201772798, 'Miguel', 'Aguilera', 'josemiguel_3093@hotmail.com', aes_encrypt('Jose1234', '#irn15'), 'Ingeniería en Ciencias de la Computación', 'Alumno'),
(201504170, 'Mariana', 'López Soto', 'mariana.lopsot@alumno.buap.mx', aes_encrypt('150417Mm', '#irn15'), 'Ingeniería en Ciencias de la Computación', 'Alumno');
(201815141, 'Samantha', 'Martínez González', 'samantha.mtz@alumno.buap.mx', aes_encrypt('Sam@78mxt0', '#irn15'), 'Licenciatura en Ciencias de la Computación', 'Alumno');

INSERT INTO usuario (matricula, nombre, apellido, email, password, carrera, rol) values (123456789, 'Alumno', 'Prueba', 'alumno@buap.mx', aes_encrypt('Alumno1234', '#irn15'), 'Licenciatura en Ciencias de la Computación', 'Alumno');
SELECT matricula, aes_decrypt(password, '#irn15') FROM usuario;
SELECT rol, aes_decrypt(password, '#irn15') FROM usuario WHERE matricula = 201772797;

INSERT INTO tema (nombre_tema) VALUES ('Introducción a Ingeniería de Software'),
('Modelos de Procesos de Desarrollo de Software'),
('Gestion de Proyectos Software');

INSERT INTO subtema (id_tema, nombre_subtema) VALUES 
(1, "Conceptos Básicos"),
(1, "Fundamentos de Ingeniería de Software"),
(2, "Modelos de Ciclo de Vida"),
(3, "Estructuración"),
(3, "Gestión de Recursos");

INSERT INTO pregunta (id_tema, id_subtema, pregunta, correcta, incorrecta1, incorrecta2, incorrecta3, argumento) VALUES
(1, 1, "Disciplina de la ingenieria que se interesa por todos los aspectos de la produccion de software.", "Ingenieria de Software", "Ingenieria Web", "Ingenieria Ambiental", "Ingenieria de productos", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 1, "Conjunto de etapas, actividades y tareas para alcanzar un objetivo que implica un trabajo no inmediato a un plazo relativamente largo.", "Proyecto", "Proceso", "Producto", "Personas", " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 1, "Conjunto de actividades tecnicas y administrativas realizadas durante el desarrollo, mantenimiento y retiro de software.", "Proceso", "Persona", "Proyecto", "Producto", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 1, 'Programa de computo y su documentacion asociada que surge dentro de un proyecto llevando acabo un proceso para su realizacion.', 'Producto', 'Proyecto', 'Personas', 'Proceso', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 1, 'Son los costos de la ingenieria de software.', '60% costos y 40% prueba', '45% costos y 55% prueba', '40% costos y 60% prueba', '50% costos y 50% prueba', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 1, 'Se desarrolla para un cliente en particular o para un mercado en general.', 'Software', 'Hardware', 'Documentacion', 'Herramienta CASE', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 1, 'Se crea a fin de entender mejor los requerimientos del software y el diseño que los satisfara.', 'Modelado', 'Planeacion', 'Construccion', 'Comunicacion', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 2, 'El software debe escribirse de tal forma que pueda evolucionar para satisfacer las necesidades de los clientes. Con esto hacemos razon a...', 'Mantenimiento', 'Eficiencia', 'Aceptabilidad', 'Disponibilidad', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 2, 'Incluye un rango de caracteristicas que abarcan fiabilidad, seguridad y proteccion. No tiene que causar mal fisico ni economico.', 'Confiabilidad y seguridad', 'Validacion', 'Mantenimiento', 'Calidad', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 2, '¿Cual de estas actividades no pertenece al mantenimiento?', 'Todas las mencionadas', 'Correcion de errores', 'Cambio de requisitos', 'Cambio de entorno', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 2, 'Un producto de software contiene:', 'Programa', 'Ninguna de las mencionadas', 'Proyecto de software', 'Sistema de Software', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 2, 'Tarea muy importante la cual realiza en todas las etapas, ya que cada una tiene como entrada varios documentos y produce otros de salida.', 'Documentacion', 'Implementacion', 'Comprobacion', 'Codificacion', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 2, 'Los requerimientos de un sistema pueden ser:', 'Ambos requerimientos', 'Requerimiento funcional', 'Requerimiento no funcional', 'Ninguna', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 2, 'Personas que utilizan dicho sistema y las que se encargan de que funcione.', 'Usuarios y administradores', 'Administradores', 'Visor de recursos', 'Usuarios finales', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(1, 2, 'La crisis de software se vio originada por una falta de:', 'Todas las mencionadas', 'Falta de mantenimiento', 'Metodologia', 'Administracion eficaz', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Modelo de ciclo de vida que se centra en las actividades y correccion.', 'Modelo en V', 'Cascada', 'Desarrollo Incremental', 'Modelo XP', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Es la fase del modelo de ciclo de vida que realiza la elaboracion de un modelo funcional del sistema.', 'Diseño', 'Analisis', 'Implementacion', 'Requerimientos', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Tipo de modelo de ciclo de vida que consta  de requerimientos, diseño, implementacion, prueba y mantenimiento.', 'Modelo de cascada', 'Modelo de prototipo', 'Modelo de espiral', 'Modelo en V', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Procedimiento de desarrollo especializado que permite a los desarrolladores la posibilidad poder validad su esencia funcional.', 'Metodologia de prototipo', 'Metodologia evolutiva', 'Modelo XP', 'Modelo en cascada', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Proceso agil que pone mas enfasis en la adaptabilidad que en la previsibilidad, usa un enfoque orientado a objetos.', 'Modelo XP', 'SCRUM', 'Metodologias Agil', 'Modelo Matematico', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Es recomendable usar la metodologia XP en proyectos de:', 'Corto plazo', 'Largo plazo', 'Mediano plazo', 'Ninguna', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Modelo particularmente util cuando no se cuenta con una dotacion de personal suficiente.', 'Modelo incremental', 'Modelo iterativo', 'Modelo en V', 'SCRUM', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Modelo que reconoce la naturaleza iterativa del desarrollo y combina actividades de desarrollo con gestion de riesgo.', 'Modelo en espiral', 'Modelo en cascada', 'Modelo en V', 'Modelo evolutivo', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Fase del modelo de ciclo de vida donde se realiza estudio preliminar, definicion del problema y determinacion de requerimientos.', 'Analisis', 'Implementacion', 'Diseño', 'Mantenimiento', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Es un proceso en el que se aplican de manera regular un conjunto de buenas practicas para trabajar colaborativamente en equipo.', 'SCRUM', 'Modelo XP', 'Modelo incremental', 'Modelo en cascada', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Requisito para el desarrollo de software:', 'Todas las mencionadas', 'Consulta con Base de Datos', 'Entrevista con Cliente', 'Metodologia Definida', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Ventaja que no pertenece al modelo de cascada:', 'Se puede retroceder', 'Ninguna ', 'Ideal en proyectos estables', 'Facil de implementar', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Atributo de software de calidad.', 'Ninguno', 'Costoso', 'Seguridad', 'Escalable', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Modelo de ciclo de vida que cada etapa debe esperar a que finalice la que antecede para empezar la siguiente.', 'Modelo en Cascada', 'Modelo en V', 'Modelo Incremental', 'Modelo por Prototipos', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(2, 3, 'Modelo que busca reducir el riesgo que surge entre las necesidades del usuario o el producto final por malos entendidos en la etapa solicitud de requerimientos.', 'Modelo Iterativo', 'Modelo Evolutivo', 'Modelo en Cascada', 'Modelo XP', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 4, 'Es la división de un problema inicial en trabajos más sencillos que permite al personal dominar la complejidad del software que se debe desarrollar.', 'Proyecto', 'Producto', 'Metodologia', 'Modelado', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 4, 'Organigrama de equipo que no tiene un jefe permanente y la toma de decisiones se hacen por consenso del grupo.', 'Desentralizado Democratico', 'Desentralizado Controlado', 'Centralizado Controlado', 'Ninguno', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 4, 'Organigrama de equipo que tiene un jefe que coordina tareas y jefes secundarios para subtareas. Implementacion de soluciones se reparten en subgrupos.', 'Desentralizado Controlado', 'Centralizado Controlado', 'Desentralizado Democratico', 'Ninguno', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 4, 'Fase que define los objetivos o metas de la organizacion trazando una estrategia para alcanzar dichos objetivos.', 'Planeacion', 'Analisis', 'Diseño', 'Implementacion', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 4, 'Estructura al equipo libremente y depende de la iniciativa individual de los miembros del equipo.', 'Paradigma Aleatorio', 'Paradigma Abierto', 'Paradigma Cerrado', 'Ninguno', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 4, 'Estructura al equipo con una mezcla del paradigma cerrado con el aleatorio. Aqui el trabajo se desarrolla con toma de decisiones consensuadas.', 'Paradigma Abierto', 'Paradigma Sincronizado', 'Paradigma Cerrado', 'Ninguno', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 4, 'Diagnostica aspectos tecnicos y de organizacion y estructurar una solucion.', 'Resolucion del Problema', 'Analisis de requerimientos', 'Planeacion', 'Implementacion', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 5, 'Partes fundamentales para la gestion de proyectos.', 'Personal, problema, proceso', 'Producto, personal, tecnico', 'Problema, precio, personal', 'Proceso, plaza, problema', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 5, 'Especifican los requerimientos para la ingeniería del software.', 'Clientes', 'Profesionales', 'Tecnicos', 'Usuarios finales', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 5, 'Tiene un jefe de equipo que resuelve problemas de alto nivel y coordina el equipo.', 'Centralizado Controlado', 'Desentralizado Controlado', 'Desentralizado Democratico', 'Ninguno', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 5, 'Se basa en un ciclo de vida de cuatro aspectos: planificacion, direccion, organizacion y control.', 'Gestion de Proyectos', 'Metodologia Agil', 'Metodologia Tradicional', 'SCRUM', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 5, 'Modelo de gestion (MOI) segun Weinberg.', 'Motivacion, Organizacion,Ideas', 'Metodologia, Orden, Inovacion', 'Metodica, Orden, Ingenio', 'Ninguno', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 5, 'Se basa en la comportamiento natural de un problema y organiza los miembros del equipo para trabajar el problema con poca comunicacion activa entre ellos.', 'Paradigma Sincronizado', 'Paradigma Abierto', 'Paradigma Aleatorio', 'Paradigma Cerrado', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 5, 'Es un conjunto de actividades tecnicas y administrativas realizadas durante la adquisicion, desarrollo, mantenimiento y retiro del software.', 'Proceso', 'Producto', 'Hito', 'Modelo', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. "),
(3, 5, 'Son datos visibles al cliente, impone limitaciones en el sistema que se desea construir. Todo esto define un:', 'Problema', 'Producto', 'Requisito', 'Ninguno', "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat pharetra risus quis porttitor. Fusce volutpat libero sit amet tellus dictum suscipit. Phasellus vulputate nisi sem, at ullamcorper est vestibulum ac. Aliquam efficitur est vitae consequat sollicitudin. Etiam orci lectus, accumsan non lobortis at, viverra consectetur magna. Etiam finibus lacinia euismod. Aliquam ut mi quam. ");

INSERT INTO historial (matricula, id_tema, num_correctas, num_incorrectas, calificacion, fecha) VALUES
(201504170, 1, 14,  1, 93.3, CURRENT_TIMESTAMP()),
(201504170, 1,  9,  6,   60, CURRENT_TIMESTAMP()),
(201504170, 1, 11,  4, 73.3, CURRENT_TIMESTAMP()),
(201504170, 2,  5, 10, 33.3, CURRENT_TIMESTAMP()),
(201504170, 2, 12,  3,   80, CURRENT_TIMESTAMP()),
(201504170, 3,  8,  7, 53.3, CURRENT_TIMESTAMP()),
(201504170, 3, 13,  2, 86.6, CURRENT_TIMESTAMP()),
(201504170, 3, 15,  0,  100, CURRENT_TIMESTAMP()),
(201815141, 1, 10,  5, 66.6, CURRENT_TIMESTAMP()),
(201815141, 1, 13,  2, 86.6, CURRENT_TIMESTAMP()),
(201815141, 3, 14,  1, 93.3, CURRENT_TIMESTAMP()),
(201815141, 3,  8,  7, 53.3, CURRENT_TIMESTAMP()),
(201772798, 1, 11,  4, 73.3, CURRENT_TIMESTAMP()),
(201772798, 1, 14,  1, 93.3, CURRENT_TIMESTAMP()),
(201772798, 2,  9,  6,   60, CURRENT_TIMESTAMP()),
(201772798, 2, 13,  2, 86.6, CURRENT_TIMESTAMP()),
(201772798, 2,  3, 12,   20, CURRENT_TIMESTAMP());

DROP TABLE tema, subtema, pregunta;

/* UPDATE PASSWORD */
UPDATE usuario SET password = AES_ENCRYPT('Mari1234', '#irn15') WHERE matricula = 201504170 

/* SEARCH STUDENT */
SELECT matricula, IF (nombre LIKE '%leal%' OR apellido LIKE '%leal%', CONCAT(nombre, ' ', apellido), null) AS alumno FROM usuario WHERE rol = 'Alumno';

/* GET TOPICS AND SUBTOPICS */
SELECT * FROM tema INNER JOIN subtema ON tema.id_tema = subtema.id_tema;

/* GET QUESTIONS FOR EXAM */
SELECT 
  subtema.id_subtema,
  subtema.nombre_subtema,
  pregunta.id_pregunta,
  pregunta.pregunta,
  pregunta.correcta,
  pregunta.incorrecta1,
  pregunta.incorrecta2,
  pregunta.incorrecta3,
  pregunta.argumento
FROM pregunta INNER JOIN subtema WHERE subtema.id_subtema = pregunta.id_subtema AND pregunta.id_tema = 1 ORDER BY RAND() LIMIT 15;

ALTER TABLE usuario ADD carrera varchar(45) AFTER password;