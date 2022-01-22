from configparser import NoOptionError
from flask import Flask, request, jsonify
from flask_cors import CORS
from db import getConnectionDB

""" DEPENDENCIES BACKEND: flask, flask_cors, pymysql """
""" Execution: .\src\Backend\src\app.py """

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

@app.route('/users/<matricula>', methods=['POST'])
def getUser(matricula):
  try:
    conexion = getConnectionDB()
    password = request.get_json()
    status = None
    info = ""
    role = None
    id = None
    with conexion.cursor() as cursor:
      query = 'SELECT rol, aes_decrypt(password, %s) FROM usuario WHERE matricula = %s'
      cursor.execute(query, (KEYWORD, matricula))
      rows = cursor.fetchall()
      if (rows):
        roleStore = rows[0][0]
        passStore = rows[0][1].decode("utf-8") #String in binary then decode
        if (str(passStore) == str(password)):
          status = True
          role = str(roleStore)
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

@app.route('/topics', methods=['GET'])
def topics():
  try:
    conexion = getConnectionDB()
    topics = []
    with conexion.cursor() as cursor:
      cursor.execute("SELECT id_tema, nombre_tema FROM tema LIMIT 0,6")
      topics = cursor.fetchall()
    conexion.close()
    print(topics)    
    return jsonify({'status': True, 'topics': topics})
  except Exception as ex:
    return jsonify({'message': ex, 'status': False})

if __name__ == '__main__':
  app.run(debug=True)