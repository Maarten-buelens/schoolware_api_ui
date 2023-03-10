import sys
sys.path.insert(1, '/home/mb/schoolware_api/schoolware_api')
from schoolware_api import schoolware
import json
from flask import Flask, render_template, request
import threading
from termcolor import colored


config = json.loads(open("./config.json","r").read())
schoolware = schoolware(config)
app = Flask(__name__)


class Background_process(threading.Thread):
     def __init__(self):
         super(Background_process, self).__init__()
 
     def run(self):
         from time import sleep
         while True:
            sleep(5*60)
            print(colored("background task: checking token","blue"))
            schoolware.check_if_valid()

background_task = Background_process()
background_task.start()

@app.route("/")
def base():
    return render_template("base.html")

@app.route("/agenda")
def agenda():
    date = request.args.get('date', default="", type=str)
    return render_template("agenda.html", agenda=schoolware.agenda(datum=date))

@app.route("/punten")
def punten():
    return render_template("punten.html", punten=schoolware.punten())

@app.route("/todo")
def todo():
    return render_template("todo.html", todo=schoolware.todo())

app.run(host="0.0.0.0", port=5000)