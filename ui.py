from schoolware_api import schoolware
import os
import json
from flask import Flask, render_template, request

#build

try:
    config = json.loads(os.environ["config"])
except Exception as e:
    config = json.loads(open("./config.json","r").read())
Schoolware = schoolware(config)
app = Flask(__name__)
Schoolware.telegram_point_diff()


@app.route("/")
def base():
    return render_template("base.html")

@app.route("/agenda")
def agenda():
    date = request.args.get('date', default="", type=str)
    return render_template("agenda.html", agenda=Schoolware.agenda(datum=date))

@app.route("/punten")
def punten():
    return render_template("punten.html", punten=Schoolware.punten())

@app.route("/todo")
def todo():
    return render_template("todo.html", todo=Schoolware.todo())

Schoolware.telegram_point_diff()

app.run(host="0.0.0.0", port=8080)
