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
    sql = "INSERT INTO client (full_name) VALUES (%s)"
    val = (data['full_name'])
    cursor.execute(sql, (val,))
    db.commit()
    return jsonify({'status': 'OK'}), 201


@app.route('/clients', methods=['GET'])
def read_clients():
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


@app.route('/clients/<client_id>', methods=['PATCH'])
def update_client(client_id):
    data = request.get_json()
    db = db_conn()
    cursor = db.cursor()
    sql = "UPDATE client SET full_name = %s WHERE id = %s"
    val = (data['full_name'], client_id)
    cursor.execute(sql, val)
    db.commit()
    return jsonify({'status': 'OK'}), 200


@app.route('/clients/<client_id>', methods=['DELETE'])
def delete_client(client_id):
    db = db_conn()
    cursor = db.cursor()
    sql = "DELETE FROM client WHERE id = %s"
    val = (client_id)
    cursor.execute(sql, (val,))
    db.commit()
    return jsonify({'status': 'OK'}), 204


# ITEMS

@app.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    db = db_conn()
    cursor = db.cursor()
    sql = "INSERT INTO item (title) VALUES (%s)"
    val = (data['title'])
    cursor.execute(sql, (val,))
    db.commit()
    return jsonify({'status': 'OK'}), 201


@app.route('/items', methods=['GET'])
def read_items():
    db = db_conn()
    cursor = db.cursor()

    # TODO: COUNT AVAIDABLE

    cursor.execute("SELECT id, title from item")
    db_result = cursor.fetchall()
    cursor.close()
    db.close()
    payload = []
    for row in db_result:
        content = {'id': row[0], 'title': row[1]}
        payload.append(content)
    return jsonify(payload)


@app.route('/items/<item_id>', methods=['PATCH'])
def update_item(item_id):
    data = request.get_json()
    db = db_conn()
    cursor = db.cursor()
    sql = "UPDATE item SET title = %s WHERE id = %s"
    val = (data['title'], item_id)
    cursor.execute(sql, val)
    db.commit()
    return jsonify({'status': 'OK'}), 200


@app.route('/items/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    db = db_conn()
    cursor = db.cursor()
    sql = "DELETE FROM item WHERE id = %s"
    val = (item_id)
    cursor.execute(sql, (val,))
    db.commit()
    return jsonify({'status': 'OK'}), 204
