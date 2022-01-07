from flask import Flask, request, jsonify
from flask_cors import CORS
from db import getConnectionDB

'''Execution: .\src\Backend\src\app.py'''

app=Flask(__name__)
CORS(app)

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
      query = 'SELECT matricula FROM usuario where matricula = %s'
      cursor.execute(query, (matricula))
      rows = cursor.fetchall() 
      if (rows): # If exist data
        mat = rows[0][0]
        if (str(mat) == str(matricula)):
          status = False 
          info = "Matrícula existente, por favor intente nuevamente"
      else:
        # Check email
        query = 'SELECT correo FROM usuario where correo = %s'
        cursor.execute(query, (email))
        rows = cursor.fetchall() 
        if (rows): # If exist data
          ema = rows[0][0]
          if (str(ema) == str(email)):
            status = False 
            info = "Correo existente, por favor ingrese otro"
        else:
          # Insert query
          query = 'INSERT INTO usuario (matricula, tipo, nombre, apellido, correo, contraseña) values(%s, %s, %s, %s, %s, %s)'
          cursor.execute(query, (matricula, role, name, lastName, email, password))
          status = True
          info = "¡Registro Exitoso! Puede iniciar sesión"
    conexion.close()
    return jsonify({'status': status, 'info': info})
  except Exception as ex:
    return jsonify({'info': ex, 'status': False})

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