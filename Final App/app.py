
from flask import Flask, jsonify, render_template, request
import json
import pymongo
import pandas as pd

from ml import make_prediction

app = Flask(__name__)

conn = 'mongodb://timanderin.info:27017'
client = pymongo.MongoClient(conn)

@app.route('/')
def root():
    return render_template('index.html')


@app.route('/jdbar')
def jdBar():
    df = pd.read_csv("jdbar.csv")
    index = 0
    jdBarData = []
    for x in df['decade']:
        data = {}
        data['decade'] = x
        data['liberal'] = df['liberal'][index] * -1
        data['conservative'] = df['conservative'][index]
        jdBarData.append(data)
        index +=1

    return jsonify(jdBarData)

@app.route('/response', methods=['POST'])
def response():
    sampleText = request.form.get("sample")
    decade = make_prediction(sampleText)
    return render_template("index.html", sample=decade)


@app.route('/data')
def wd_cloud():
    decade = request.args.get('decade')
    f_json = str(decade)+".json"
    return (f_json)

if __name__ == "__main__":
    app.run(debug=True)
