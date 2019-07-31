
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
    
@app.route('/year')
def year():
    conn = 'mongodb://timanderin.info:27017'
    client = pymongo.MongoClient(conn)
    speechDB = client.speech_db
    clean = speechDB.clean
    results = clean.find()

    year = request.args.get('year')

    return jsonify()

@app.route('polstentiment')
def polstentiment():
    conn = 'mongodb://timanderin.info:27017'
    client = pymongo.MongoClient(conn)
    speechDB = client.speech_db
    clean = speechDB.clean
    results = clean.find()

    df = pd.DataFrame(list(results))
    df = df.groupby("decade").agg({"liberal":"mean","conservative":"mean"})

    d_list = []
    index = 0
    for d in df["decade"]:
        d_dict = {"decade":d, "liberal": df['liberal'][index], "conservative": df['conservative'][index]}
        d_list.append(d_dict)
    
    return jsonify(d_list)

if __name__ == "__main__":
    app.run(debug=True)
