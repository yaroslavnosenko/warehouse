from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector as MYSQL
app = Flask(__name__)
CORS(app)


def db_conn():
    return MYSQL.connect(host="147.232.40.14", user="yn584cd", passwd="ie2Hu8xu", database="yn584cd")


# CLIENTS

@app.route('/clients', methods=['POST'])
def create_client():
    data = request.get_json()
    db = db_conn()
    cursor = db.cursor()
    cursor.execute("SELECT id, full_name from client")
    db_result = cursor.fetchall()
    cursor.close()
    db.close()
    payload = []
    for row in db_result:
        content = {'id': row[0], 'full_name': row[1]}
        payload.append(content)
    return jsonify(payload)


@app.route('/clients', methods=['GET'])
def get_all_clients():
    db = db_conn()
    cursor = db.cursor()
    cursor.execute("SELECT id, full_name from client")
    db_result = cursor.fetchall()
    cursor.close()
    db.close()
    payload = []
    for row in db_result:
        content = {'id': row[0], 'full_name': row[1]}
        payload.append(content)
    return jsonify(payload)


@app.route('/clients/<client_id>', methods=['GET'])
def get_client(client_id):
    db = db_conn()
    cursor = db.cursor()
    cursor.execute(
        "SELECT id, full_name from client WHERE id={}".format(client_id))
    db_result = cursor.fetchall()
    cursor.close()
    db.close()
    row = db_result[0]
    payload = {'id': row[0], 'full_name': row[1]}
    return jsonify(payload)
