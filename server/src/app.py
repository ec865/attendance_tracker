from flask import Flask, request
from flask_cors import CORS, cross_origin

import os
import time
import json


import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("attendancetracker-239b2-firebase-adminsdk-49im3-73a41092ad.json")
firebase_admin.initialize_app(cred, {
  'projectId': "attendancetracker-239b2",
})

db = firestore.client()


def add_user(name, surname, email, password, role):
    user = db.collection(u'users').document(name+surname)
    user.set({
        u'name': name,
        u'surname': surname,
        u'email': email,
        u'password' : password,
        u'role' : role
    })

def list_users():
    users = db.collection(u'users')
    user_docs = users.stream()
    users = {}
    for user in user_docs:
        users[user.id] = user.to_dict()
    return json.loads(json.dumps(users))

def set_current_user(user_id):
    global current_user 
    current_user = user_id

def add_event(name, user_id):
    event = db.collection(u'events').document(name)
    event.set({
        u'event_name': name,
        u'user_id': user_id,
    })        

def list_events():
    events = db.collection(u'events')
    event_docs = events.stream()
    events = {}
    for event in event_docs:
        events[event.id] = event.to_dict()
    return json.loads(json.dumps(events))

def delete_event(event):
    db.collection(u'events').document(event).delete()

def add_description(des_name, passcode, status, event_id):
    des = db.collection(u'descriptions').document(des_name)
    des.set({
        u'description_name': des_name,
        u'passcode': passcode,
        u'status' : status,
        u'event_id' : event_id
    })        

def list_descriptions():
    descriptions = db.collection(u'description')
    dec_docs = descriptions.stream()
    des_of_event = {}
    for des in dec_docs:
        des_of_event[des.id] = des.to_dict()
    return json.loads(json.dumps(des_of_event))

def add_attendance(start_time, end_time):
    att = db.collection(u'descriptions').document()
    att.set({
        u'start_time': start_time,
        u'end_time': end_time
    })      

def list_attendances():
    attendances = db.collection(u'attendance')
    att_docs = attendances.stream()
    att_dict = {}
    for att in att_docs:
        att_dict[att.id] = att.to_dict()
    return json.loads(json.dumps(att_dict, default=str))    


app = Flask(__name__)
CORS(app)

def format_server_time():
    server_time = time.localtime()
    return time.strftime("%I:%M:%S %p", server_time)

@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def index():
    context = { 
        'users' : list_users(),
        'events' : list_events(),
        'descriptions' : list_descriptions(),
        'attendances' : list_attendances()
    }
    return context

@app.route('/api/signin', methods=['POST'])
@cross_origin()
def sign_in():
    email = request.args.get('email')
    password = request.args.get('password')
    users = db.collection(u'users')
    user_docs = users.stream()
    for user in user_docs:
        if email == user.get('email'):
            if password == user.get('password'):
                if user.get('role') == '1':
                    return "admin" , set_current_user(user.id)
                else:
                    return "user", set_current_user(user.id)
    return "404"

@app.route('/api/signup', methods=['POST'])
@cross_origin()
def sign_up():
    name = request.args.get('name')
    surname = request.args.get('surname')
    email = request.args.get('email')
    password = request.args.get('password')
    role = request.args.get('role')
    add_user(name, surname, email, password, role)
    return "user " + name + " added"

@app.route('/api/events/<string:user_id>', methods=['GET', 'POST'])
@cross_origin()
def events(user_id):
    #current_user = request.args.get('user_id')
    docs = db.collection(u'events').where(u'user_id', u'==', user_id).stream()
    events_of_user = {}
    for event in docs:
        events_of_user[event.id] = event.to_dict()
    return json.dumps(events_of_user)

@app.route('/api/descriptions', methods=['GET', 'POST'])
@cross_origin()
def descriptions():
    event_id = request.args.get('event_id')
    docs = db.collection(u'description').where(u'event_id', u'==', event_id).stream()
    des_of_event = {}
    for des in docs:
        des_of_event[des.id] = des.to_dict()
    des_name = request.args.get('des_name')
    passcode = request.args.get('passcode')
    status = request.args.get('status')
    add_description(des_name, passcode, status, event_id)
    return json.dumps(des_of_event)


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))