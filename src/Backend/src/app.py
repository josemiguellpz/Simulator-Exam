from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from db import getConnectionDB

""" RUN BACKEND """
""" Steps:
      1.- Create enviroment:  virtualenv -p python3 env
      2.- Dependencies:       pip install flask, flask_cors, pymysql, flask_mysql
      3.- Active enviroment:  .\env\Scripts\active
      4.- Execution:          .\src\Backend\src\app.py
"""

app=Flask(__name__)
CORS(app)

KEYWORD="#irn15" #Auth for password

@app.route('/users', methods=['POST'])
def users():
  try:
    role, matricula, name, lastName, email, password, carrer = request.json.values()
    conexion = getConnectionDB()
    # Default response
    status = False
    info = "Algo salio mal"
    with conexion.cursor() as cursor:
      # Check matrícula
      query = 'SELECT matricula FROM usuario WHERE matricula = %s'
      cursor.execute(query, (matricula))
      rows = cursor.fetchall() 
      if (rows): # If exist data
        matStore = rows[0][0]
        if (str(matStore) == str(matricula)):
          status = False 
          info = "Matrícula existente, por favor intente nuevamente"
      else:
        # Check email
        query = 'SELECT email FROM usuario WHERE email = %s'
        cursor.execute(query, (email))
        rows = cursor.fetchall() 
        if (rows): # If exist data
          emailStore = rows[0][0]
          if (str(emailStore) == str(email)):
            status = False 
            info = "Correo existente, por favor ingrese otro"
        else:
          # Insert query
          query = 'INSERT INTO usuario (matricula, nombre, apellido, email, password, carrera, rol) values(%s, %s, %s, %s, aes_encrypt(%s, %s), %s, %s)'
          cursor.execute(query, (matricula, name, lastName, email, password, KEYWORD, carrer, role))
          status = True
          info = "¡Registro Exitoso! Puede iniciar sesión"
    conexion.close()
    return jsonify({'status': status, 'info': info})
  except Exception as ex:
    return jsonify({'info': ex, 'status': False})

@app.route('/users/<matricula>', methods=['GET', 'POST']) # GET user / POST: login 
def user(matricula):
  try:
    conexion = getConnectionDB()
    # Default response
    status = None
    info = ""
    role = None
    id = None
    with conexion.cursor() as cursor:
      if request.method == 'GET':
        query = 'SELECT rol, nombre, apellido, carrera FROM usuario WHERE matricula = %s'
        cursor.execute(query, (matricula))
        data = cursor.fetchall()
        if(data[0][0] == "Alumno"):
          role = "student"
        else:
          role = "teacher"
        user = {'id': matricula, 'role': role, 'name': data[0][1], 'lastName': data[0][2], 'carrer': data[0][3], }
        return jsonify({'status': True, 'user': user}) 
      elif request.method == 'POST':
        password = request.get_json()
        # Find matrícula
        query = 'SELECT rol, aes_decrypt(password, %s) FROM usuario WHERE matricula = %s'
        cursor.execute(query, (KEYWORD, matricula))
        rows = cursor.fetchall()
        if (rows): # If exist data
          role_Store = rows[0][0]
          pass_Store = rows[0][1].decode("utf-8") #String in binary then decode
          if (str(pass_Store) == str(password)):
            status = True
            role = str(role_Store)
            id = matricula
          else:
            status = False
            info = "Contraseña incorrecta"
        else:
          status = False
          info = "Matrícula ingresada no existe"
    conexion.close()
    return jsonify({'status': status, 'info': info, 'role': role, 'id': id})
  except Exception as ex:
    return jsonify({'message': ex, 'status': False})

@app.route('/topics', methods=['GET', 'POST'])
def topics():
  try:
    conexion = getConnectionDB()              
    with conexion.cursor() as cursor:
      if request.method == 'GET':
        topics = []
        item = {}
        cursor.execute("SELECT id_tema, nombre_tema FROM tema") #LIMIT 0,6
        response = cursor.fetchall()
        conexion.close()
        for element in response:
          item = { 'id': element[0], 'value': element[1] } # Contains: id_tema and nombre_tema
          topics.append(item)
        return jsonify({'status': True, 'topics': topics})
      elif request.method == 'POST':
        topic, subtopic = request.json.values()
        cursor.execute("CALL insertTopic (%s, %s);", (topic, subtopic)) # Procedure Return id_tema, nombre_tema, id_subtema, nombre_subtema
        result = cursor.fetchall()
        ids = { 'topicID': result[0][0], 'topic': result[0][1], 'subtopicID': result[0][3], 'subtopic': result[0][4] }
        conexion.commit()
        conexion.close()
        return jsonify({'status': True, 'info': "Tema registrado", 'ids': ids})
  except Exception as ex:
    return jsonify({'message': ex, 'status': False})

@app.route('/topics/<topicID>', methods=['DELETE'])
def topic(topicID):
  try:
    conexion = getConnectionDB()              
    with conexion.cursor() as cursor:
      if request.method == 'DELETE':
        cursor.execute("DELETE FROM tema WHERE id_tema = %s", topicID)
        conexion.commit()
        conexion.close()
        return jsonify({'status': True, 'info':"Tema eliminado"})
  except Exception as ex:
    return jsonify({'message': ex, 'status': False})

@app.route('/topics/<topicID>/subtopics', methods=['GET', 'POST'])
def subtopics(topicID):
  try:
    conexion = getConnectionDB()              
    with conexion.cursor() as cursor:
      if request.method == 'GET':
        subtopics = []
        # item = {} 
        cursor.execute("SELECT id_subtema, nombre_subtema FROM subtema WHERE id_tema = %s", topicID)
        response = cursor.fetchall()
        for element in response:
          item = { 'id': element[0], 'value': element[1] } # Contains: id_subtema and nombre_subtema
          subtopics.append(item)
        conexion.close()
        return jsonify({'subtopics': subtopics})
      elif request.method == 'POST':
        topic, subtopic = request.json.values()
        cursor.execute("CALL insertSubtopic (%s, %s);", (topicID, subtopic)) # Procedure Return id_subtema
        result = cursor.fetchall()
        result = { 'topicID': int(topicID), 'topic': topic, 'subtopicID': result[0][0], 'subtopic': subtopic }
        conexion.commit()
        conexion.close()
        return jsonify({'status': True, 'info':"Subtema registrado", 'topic': result})
  except Exception as ex:
    return jsonify({'message': ex, 'status': False})

@app.route('/topics/<topicID>/subtopics/<subtopicID>', methods=['DELETE', 'PUT'])
def subtopic(topicID, subtopicID):
  try:
    conexion = getConnectionDB()              
    with conexion.cursor() as cursor:
      if request.method == 'DELETE':
        cursor.execute("DELETE FROM subtema WHERE id_tema = %s and id_subtema = %s", (topicID, subtopicID))
        conexion.commit()
        conexion.close()
        return jsonify({'status': True, 'info':"Subtema eliminado"})
      elif request.method == 'PUT':
        # Update Topic and Subtopic Name
        topic, subtopic = request.json.values()
        cursor.execute("UPDATE tema SET nombre_tema = %s WHERE id_tema = %s", (topic, topicID))
        cursor.execute("UPDATE subtema SET nombre_subtema = %s WHERE id_tema = %s and id_subtema = %s", (subtopic, topicID, subtopicID))
        result = {'topicID': topicID, 'topic': topic, 'subtopicID': subtopicID, 'subtopic': subtopic}
        conexion.commit()
        conexion.close()
        return jsonify({'status': True, 'info':"Tema modificado", 'topic': result})
  except Exception as ex:
    return jsonify({'message': ex, 'status': False})

@app.route('/topics/<topicID>/subtopics/<subtopicID>/questions', methods=['GET', 'POST'])
def questions(topicID, subtopicID):
  try:
    conexion = getConnectionDB()
    with conexion.cursor() as cursor:
      if request.method == 'GET':
        questions = []
        cursor.execute("SELECT id_pregunta, pregunta, correcta, incorrecta1, incorrecta2, incorrecta3, argumento FROM pregunta WHERE id_tema = %s and id_subtema = %s", (topicID, subtopicID))
        result = cursor.fetchall()
        for element in result:
          item = {'id': int(element[0]), 'question': element[1], 'correct': element[2], 'incorrect1': element[3], 'incorrect2': element[4], 'incorrect3': element[5], 'argument': element[6]}
          questions.append(item)
        return jsonify({'questions': questions})
      elif request.method == 'POST':
        question, correct, incorrect1, incorrect2, incorrect3, argument = request.json.values()
        cursor.execute("CALL insertQuestion(%s, %s, %s, %s, %s, %s, %s, %s);", (topicID, subtopicID, question, correct, incorrect1, incorrect2, incorrect3, argument)) # Return id_pregunta
        questionID  =  cursor.fetchall()
        quest = {'id': questionID[0][0], 'quest': question}
        conexion.commit()
        conexion.close()
        return jsonify({'status': True, 'info':"Pregunta registrada", 'quest': quest})
  except Exception as ex:
    return jsonify({'message': ex, 'status': False})

@app.route('/topics/<topicID>/subtopics/<subtopicID>/questions/<questionID>', methods=['GET', 'PUT', 'DELETE'])
def question(topicID, subtopicID, questionID):
  try:
    conexion = getConnectionDB()              
    with conexion.cursor() as cursor:
      if request.method == 'GET':
        cursor.execute("SELECT pregunta, correcta, incorrecta1, incorrecta2, incorrecta3, argumento FROM pregunta WHERE id_tema = %s and id_subtema = %s and id_pregunta = %s;", (topicID, subtopicID, questionID))
        result = cursor.fetchall()
        dataQuestion = {
          'question':   result[0][0], 'correct':    result[0][1], 'incorrect1': result[0][2], 
          'incorrect2': result[0][3], 'incorrect3': result[0][4], 'argument':   result[0][5],
        }
        conexion.close()
        return jsonify({'dataQuestion': dataQuestion})
      elif request.method == 'PUT':
        question, correct, incorrect1, incorrect2, incorrect3, argument = request.json.values()
        cursor.execute("UPDATE pregunta SET pregunta = %s, correcta = %s, incorrecta1 = %s, incorrecta2 = %s, incorrecta3 = %s, argumento = %s WHERE id_tema = %s and id_subtema = %s and id_pregunta = %s;", (question, correct, incorrect1, incorrect2, incorrect3, argument, topicID, subtopicID, questionID))
        quest = {'id': int(questionID), 'quest': question}
        conexion.commit()
        conexion.close()
        return jsonify({'status': True, 'info':"Pregunta modificada", 'quest': quest})
      elif request.method == 'DELETE':
        cursor.execute("DELETE FROM pregunta WHERE id_tema = %s and id_subtema = %s and id_pregunta = %s;", (topicID, subtopicID, questionID))
        conexion.commit()
        conexion.close()
        return jsonify({'status': True, 'info':"Pregunta eliminada"})
  except Exception as ex:
    return jsonify({'message': ex, 'status': False})

if __name__ == '__main__':
  app.run(debug=True)