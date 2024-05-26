from flask import Flask, render_template, request, redirect, jsonify
from movies import get_movie

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/movies', methods=['GET'])
def get_movies():
    search_query = request.args.get('search')
    try:
        data = get_movie(search_query)
        return jsonify({
            'data': data,
            'search': search_query
        })
    except Exception as error:
        print(error)
        return jsonify({'error': str(error)}), 500