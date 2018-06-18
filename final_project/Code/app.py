from flask import Flask, Response, render_template,url_for, flash, jsonify
# from setting import host, database, user, password, Gentrifying, Non_Gentrifying, Higher_Income, cur
import pandas as pd
import urllib, json
import urllib3

app = Flask(__name__)

url = "https://raw.githubusercontent.com/davidhhk1994/Data-Visualization/master/final_project/New_Dataset/education_expend.json"
response = urllib.request.urlopen(url)
data = json.loads(response.read())
# print data
#use urllib3
# http = urllib3.PoolManager()
# r = http.request('GET','https://raw.githubusercontent.com/davidhhk1994/Data-Visualization/master/final_project/New_Dataset/education_expend.json')
# data = json.loads(r.data.decode('utf-8'))
url2 = "https://raw.githubusercontent.com/davidhhk1994/Data-Visualization/master/final_project/New_Dataset/literacy.json"
response2 = urllib.request.urlopen(url2)
data1 = json.loads(response2.read())


# http = urllib3.PoolManager()
# r2 = http.request('GET','https://raw.githubusercontent.com/davidhhk1994/Data-Visualization/master/final_project/New_Dataset/literacy.json')
# data1 = json.loads(r2.data.decode('utf-8'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/<year>',methods=['GET', 'POST'])
def api(year):
    y = str(year)
    print(y,data['education_expenditure'][y])
    return jsonify(data['education_expenditure'][y])

@app.route('/vis/<year>',methods=['GET', 'POST'])
def vis(year):
    y = str(year)
    print(y,data1['literacy'][y])
    return jsonify(data1['literacy'][y])

if __name__ == '__main__':
   app.run(debug = True,port=4023)