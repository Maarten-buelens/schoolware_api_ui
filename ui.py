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

if("jaartotaal" in config and config["jaartotaal"] == True):
    from schoolware_api_tools import schoolware_tools
    vaardigheden = config["vaardigheden"]
    vakken = config["vakken"]
    calc = schoolware_tools(schoolware=Schoolware)


@app.route("/")
def base():
    return render_template("base.html")

@app.route("/agenda")
def agenda():
    date = request.args.get('date', default="", type=str)
    return render_template("agenda.html", agenda=Schoolware.agenda(datum=date))

@app.route("/agenda_api")
def agenda_api():
    date = request.args.get('date', default="", type=str)
    return Schoolware.agenda(datum=date)#render_template("agenda.html", agenda=Schoolware.agenda(datum=date))

@app.route("/punten")
def punten():
    return render_template("punten.html", punten=Schoolware.punten())

@app.route("/punten_api")
def punten_api():
    return Schoolware.punten()#render_template("punten.html", punten=Schoolware.punten())

@app.route("/todo")
def todo():
    return render_template("todo.html", todo=Schoolware.todo())

@app.route("/todo_api")
def todo_api():
    return Schoolware.todo()#render_template("todo.html", todo=Schoolware.todo())

if(config["jaartotaal"] == True):
    @app.route("/jaartotaal")
    def jaartotaal():
        jaartotaal_result = calc.alle_vakken(vakken=vakken,vaardigheden=vaardigheden)
        return render_template("jaartotaal.html", result=jaartotaal_result)

Schoolware.telegram_point_diff()

app.run(host="0.0.0.0", port=8080)
