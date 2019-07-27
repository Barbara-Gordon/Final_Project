
from flask import Flask, jsonify, render_template, request
import json
import pymongo

app = Flask(__name__)

conn = 'mongodb://timanderin.info:27017'


@app.route('/')
def root():
    return render_template('index.html')
    
#@app.route('yourtext')
#def chart1():
#    return render_template("yourtext")

if __name__ == "__main__":
    app.run(debug=True)
