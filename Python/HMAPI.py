import mysql.connector
from mysql.connector import Error
from flask import Flask , request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

def mysqlconnection():
    try:
        mySqlDb = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password='root',
            port=3306,
            database='lodge'
        )
        if mySqlDb.is_connected():
            return mySqlDb, mySqlDb.cursor()
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None, None

@app.route('/')
# @cross_origin()
def home():
    return "<h1>API is running</h1>"


@app.route('/registerCustomer', methods=['POST'])
# @cross_origin()
def registerCustomer():
    try:
        data = request.json
        custno = data['custno']
        name = data['name']
        addr = data['addr']
        roomBookdate = data['roomBookdate']

        mySqlDb, mycursor = mysqlconnection()
        if mySqlDb is None or mycursor is None:
            return jsonify({"error": "Database connection failed"}), 500

        sql = 'INSERT INTO cdata (custno, custname, addr, bdate) VALUES (%s, %s, %s, %s)'
        mycursor.execute(sql, (custno, name, addr, roomBookdate))
        mySqlDb.commit()

        return jsonify({"message": "Customer registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    finally:
        if mySqlDb.is_connected():
            mycursor.close()
            mySqlDb.close()

@app.route('/calculateRoomRent', methods=['POST'])
# @cross_origin()
def calculateRoomRent():
    # if not request.is_json:
    #     return jsonify({"error": "Request must be JSON"}), 400

    data = request.json
    print(data)
    required_fields = ['custno', 'choice', 'num_rooms', 'extra_persons']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    custno = data['custno']
    choice = data['choice']
    num_rooms = data['num_rooms']
    extra_persons = data['extra_persons']

    room_cost = 0
    if choice == 1:
        room_cost = 6000
    elif choice == 2:
        room_cost = 4000
    elif choice == 3:
        room_cost = 2000
    else:
        return jsonify({"error": "Invalid room type selected"}), 400

    room_rent = room_cost * num_rooms
    extra_person_rent = extra_persons * 500
    # total_rent = room_rent + extra_person_rent


    try:
        total_rent = room_rent + extra_person_rent
    except TypeError as e:
        return jsonify({"error": f"Error calculating total rent: {e}"}), 500

    room_cost_list = [custno, room_rent, extra_person_rent, total_rent]
    try:
        mySqlDb, mycursor = mysqlconnection()
        if mySqlDb is None or mycursor is None:
            return jsonify({"error": "Database connection failed"}), 500

        sql = "INSERT INTO roomrent (custno, rent_tot, ext_rent_tot, g_tot) VALUES (%s, %s, %s, %s)"
        mycursor.execute(sql, room_cost_list)
        mySqlDb.commit()

        return jsonify({"message": "Room rent calculated successfully", "total_rent": total_rent}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    finally:
        if mySqlDb.is_connected():
            mycursor.close()
            mySqlDb.close()


@app.route('/getAllCustomer', methods=['GET'])
# @cross_origin()
def dispAllCustomerDetails():
    mySqlDb = None
    mycursor = None

    try:
        mySqlDb, mycursor = mysqlconnection()

        print("aasssssssssssssssss")
        if mySqlDb is None:
            return jsonify({"error": "Failed to connect to the database"}), 500

        mycursor = mySqlDb.cursor(dictionary=True)
        sql = """
        SELECT cdata.custno, cdata.custname, cdata.addr, cdata.bdate,
               roomrent.rent_tot, roomrent.ext_rent_tot, roomrent.g_tot 
        FROM cdata 
        INNER JOIN roomrent ON cdata.custno = roomrent.custno
        """
        mycursor.execute(sql)
        res = mycursor.fetchall()

        return jsonify(res)
    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if mycursor is not None:
            mycursor.close()
        if mySqlDb is not None and mySqlDb.is_connected():
            mySqlDb.close()


if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='127.0.0.1', port=5000, debug=True)
