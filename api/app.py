from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector as MYSQL
import numpy as np
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
    sql = open("./sql/client.insert.sql").read()
    val = (data['full_name'])
    cursor.execute(sql, (val,))
    db.commit()
    return jsonify({'status': 'OK'}), 201


@app.route('/clients', methods=['GET'])
def read_clients():
    db = db_conn()
    cursor = db.cursor()
    sql = open("./sql/client.read.sql").read()
    cursor.execute(sql)
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
    sql = open("./sql/client.update.sql").read()
    val = (data['full_name'], client_id)
    cursor.execute(sql, val)
    db.commit()
    return jsonify({'status': 'OK'}), 200


@app.route('/clients/<client_id>', methods=['DELETE'])
def delete_client(client_id):
    db = db_conn()
    cursor = db.cursor()
    sql = open("./sql/client.delete.sql").read()
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
    sql = open("./sql/item.insert.sql").read()
    val = (data['title'])
    cursor.execute(sql, (val,))
    db.commit()
    return jsonify({'status': 'OK'}), 201


@app.route('/items', methods=['GET'])
def read_items():
    db = db_conn()
    cursor = db.cursor()
    sql = open("./sql/item.read.sql").read()
    cursor.execute(sql)
    db_result = cursor.fetchall()
    cursor.close()
    db.close()
    payload = []
    for row in db_result:
        content = {'id': row[0], 'title': row[1], 'available': row[2]}
        payload.append(content)
    return jsonify(payload)


@app.route('/items/<item_id>', methods=['PATCH'])
def update_item(item_id):
    data = request.get_json()
    db = db_conn()
    cursor = db.cursor()
    sql = open("./sql/item.update.sql").read()
    val = (data['title'], item_id)
    cursor.execute(sql, val)
    db.commit()
    return jsonify({'status': 'OK'}), 200


@app.route('/items/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    db = db_conn()
    cursor = db.cursor()
    sql = open("./sql/item.delete.sql").read()
    val = (item_id)
    cursor.execute(sql, (val,))
    db.commit()
    return jsonify({'status': 'OK'}), 204


# TRANSACTIONS


@app.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()
    db = db_conn()
    cursor = db.cursor()

    transactions_sql = "INSERT INTO transaction (client_id) VALUES (%s)"
    val = (data['client_id'])
    cursor.execute(transactions_sql, (val,))

    items_sql = "INSERT INTO transaction_item (transaction_id, item_id, count) VALUES (%s, %s, %s)"
    val = list(
        map(lambda item: (cursor.lastrowid, item['id'], item['count']), data['items']))
    cursor.executemany(items_sql, val)

    db.commit()
    return jsonify({'status': 'OK'}), 201


@app.route('/transactions', methods=['GET'])
def read_transactions():
    db = db_conn()
    cursor = db.cursor()

    cursor.execute("""
        SELECT `transaction`.id, `transaction`.timestamp, `transaction`.client_id, transaction_item.item_id, transaction_item.count, item.title, client.full_name
        FROM `transaction` 
        LEFT JOIN transaction_item ON transaction_item.transaction_id = transaction.id
        LEFT JOIN client ON client.id = transaction.client_id
        LEFT JOIN item ON item.id = transaction_item.item_id
    """)
    db_result = cursor.fetchall()
    cursor.close()
    db.close()

    unique_ids = np.unique(list(map(lambda row: row[0], db_result)))
    payload = []
    for _id in unique_ids:
        tr = list(filter(lambda row: row[0] == _id, list(db_result)))
        client = None if tr[0][2] == None else {
            'id': tr[0][2], 'full_name': tr[0][6]}
        items = []
        for tri in tr:
            items.append(
                {'item': {'id': tri[3], 'title': tri[5]}, 'count': tri[4]})
        row = {
            'id': int(_id), 'timestamp': tr[0][1], 'client': client, 'items': items}
        payload.append(row)

    return jsonify(payload), 200
