
from flask import Flask, jsonify, render_template, request
import json
import pymongo
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MaxAbsScaler
from tensorflow.keras.utils import to_categorical


app = Flask(__name__)

conn = 'mongodb://timanderin.info:27017'
client = pymongo.MongoClient(conn)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/data')
def rawData():
    conn = 'mongodb://timanderin.info:27017'
    speechDB = client.speech_db
    col = speechDB.clean
    test = col.find()
    i= 0

    finalData = dict()

    while i < col.count():
        finalData[i] =test[i]
        finalData[i]['_id']=str(test[i]['_id'])
        finalData[i].pop('text')
        i=i+1

    return jsonify(finalData)

@app.route('/response', methods=['POST'])
def response():
    sampleText = request.form.get("sample")
    return render_template("index.html", sample=sampleText)

if __name__ == "__main__":
    app.run(debug=True)
