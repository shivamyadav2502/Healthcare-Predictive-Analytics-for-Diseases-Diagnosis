from flask import Flask, render_template, request

from helper.helper import predict

import os

app=Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/recommend')
def recom():
    return render_template("Recommender.html")


@app.route('/result')
def result():
    return render_template("Result.html")

@app.route('/predict',methods=["POST"])
def prediction():
    symptoms = request.get_json()["data"]
    return predict(symptoms)


if __name__ == '__main__':
    app.run(debug=False, port=os.getenv("PORT", default=5000))