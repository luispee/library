from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database connection
db_config = {
    'host': 'localhost',
    'user': 'librarian',
    'password': 'secure_password',
    'database': 'Biblioteca'
}

def get_db_connection():
    conn = mysql.connector.connect(**db_config)
    return conn

@app.route('/', methods=['GET'])
def home():
    return 'Biblioteca'

# Agregar Libro
@app.route('/libros', methods=['POST'])
def add_book():
    data = request.json
    title = data.get('title')
    author = data.get('author')
    year = data.get('year')
    type_ = data.get('type')
    category = data.get('category')
    condition = data.get('condition')
    location = data.get('location')
    wishlist = data.get('wishlist', False)
    intent = data.get('intent')
    library_id = ((data.get('library')))

    if not title or not author or not year or not condition:
        return jsonify({'error': 'Required fields: title, author, year, condition'}), 400
    print(data)
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """INSERT INTO Libro (titulo, autor, año, tipo, id_categoria, id_condicion, ubicacion, paraLeer, id_fin, biblioteca)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
        (title, author, year, type_, category, condition, location, wishlist, intent, library_id)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'message': 'Book added successfully'}), 201

# API to get all libraries
@app.route('/api/libraries', methods=['GET'])
def get_libraries():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT nombre FROM Estante")
    categories = cursor.fetchall()
    connection.close()
    return jsonify(categories)

# API to get all conditions
@app.route('/api/conditions', methods=['GET'])
def get_conditions():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT id, value FROM Condicion")
    conditions = cursor.fetchall()
    connection.close()
    return jsonify(conditions)

# API to get all intents
@app.route('/api/intents', methods=['GET'])
def get_intents():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT id, value FROM Fin")
    intents = cursor.fetchall()
    connection.close()
    return jsonify(intents)

# API to get all categories
@app.route('/api/categories', methods=['GET'])
def get_categories():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT id, value FROM Categoria")
    categories = cursor.fetchall()
    connection.close()
    return jsonify(categories)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
