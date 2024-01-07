from schoolware_api import schoolware
import os
import json
from flask import Flask, render_template, request
import datetime
import locale
language_code = 'nl_BE.ISO8859-1'  # Change this to the desired language code

# Set the locale for the specified language
locale.setlocale(locale.LC_ALL, language_code)
#build

try:
    config = json.loads(os.environ["config"])
except Exception as e:
    config = json.loads(open("./config.json","r").read())
Schoolware = schoolware(config)
app = Flask(__name__)


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
    if(date==""):
        dt = datetime.datetime.today()
    else:
        dt = datetime.datetime.strptime(date.split(" ")[0], '%Y-%m-%d')
    display_date = dt.strftime("%A %d/%m")
    next_date = dt + datetime.timedelta(days=1)
    prev_date = dt - datetime.timedelta(days=1)
    return render_template("agenda.html", agenda=Schoolware.agenda(datum=date), display_date=display_date, next_date=next_date,prev_date=prev_date)
@app.route("/agenda_week")
def agenda_week():
    date = request.args.get('date', default="", type=str)
    if(date==""):
        dt = datetime.datetime.today()
    else:
        dt = datetime.datetime.strptime(date.split(" ")[0], '%Y-%m-%d')

    days_to_subtract = dt.weekday()
    start = dt - datetime.timedelta(days=days_to_subtract)

    next_date = start + datetime.timedelta(days=7)
    prev_date = start - datetime.timedelta(days=7)
    return render_template("agenda_week.html", days=Schoolware.agenda_week(datum=date), next_date=next_date,prev_date=prev_date)

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

app.run(host="0.0.0.0", port=8080, debug=True)
