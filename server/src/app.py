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
    user = db.collection(u'users').document(name + '_' + surname)
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

def add_event(name, user_id):
    event = db.collection(u'events').document(name + '_' + user_id)
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

def delete_event(event_id):
    db.collection(u'events').document(event_id).delete()

def add_description(des_name, passcode, status, start_time, end_time, event_id):
    des = db.collection(u'description').document(event_id + '_' + des_name)
    des.set({
        u'description_name': des_name,
        u'passcode': passcode,
        u'status' : status,
        u'start_time': start_time,
        u'end_time': end_time,
        u'event_id' : event_id
    })        

def list_descriptions():
    descriptions = db.collection(u'description')
    dec_docs = descriptions.stream()
    des_of_event = {}
    for des in dec_docs:
        des_of_event[des.id] = des.to_dict()
    return json.loads(json.dumps(des_of_event))

def add_attendance(user_id, description_id):
    att = db.collection(u'attendance').document(user_id + '_' + description_id)
    att.set({
        u'user_id': user_id,
        u'description_id': description_id
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

######################### API ############################

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
                return {
                    'name' : user.get('name'),
                    'surname' : user.get('surname'),
                    'role' : user.get('role')
                }
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
    return "User " + name + " added"

@app.route('/api/events', methods=['GET'])
@cross_origin()
def l_events():
    return list_events()

@app.route('/api/events/<string:user_id>', methods=['GET'])
@cross_origin()
def events(user_id):
    #current_user = request.args.get('user_id')
    docs = db.collection(u'events').where(u'user_id', u'==', user_id).stream()
    events_of_user = {}
    for event in docs:
        events_of_user[event.id] = event.to_dict()
    return json.dumps(events_of_user)

@app.route('/api/events/<string:user_id>/add', methods=['POST'])
@cross_origin()
def a_event(user_id):
    event_name = request.args.get('event_name')
    return "event added" , add_event(event_name, user_id)

@app.route('/api/events/delete', methods=['DELETE'])
@cross_origin()
def d_event():
    event_id= request.args.get('event_id')
    return "event deleted" , delete_event(event_id)

@app.route('/api/descriptions', methods=['GET'])
@cross_origin()
def l_descriptions():
    return list_descriptions()

@app.route('/api/descriptions/<string:event_id>', methods=['GET'])
@cross_origin()
def descriptions(event_id):
    docs = db.collection(u'description').where(u'event_id', u'==', event_id).stream()
    des_of_event = {}
    for des in docs:
        des_of_event[des.id] = des.to_dict()
    return json.dumps(des_of_event)

@app.route('/api/descriptions/<string:event_id>/add', methods=['POST'])
@cross_origin()
def a_description(event_id):
    des_name = request.args.get('des_name')
    passcode = request.args.get('passcode')
    status = request.args.get('status')
    start_time = request.args.get('start_time')
    end_time = request.args.get('end_time')
    return "description added" , add_description(des_name, passcode, status, start_time, end_time, event_id)


@app.route('/api/attendances', methods=['GET'])
@cross_origin()
def l_attedances():
    return list_attendances()

@app.route('/api/attendances/u/<string:user_id>', methods=['GET'])
@cross_origin()
def attedances_by_user(user_id):
    docs = db.collection(u'attendance').where(u'user_id', u'==', user_id).stream()
    atts = {}
    for att in docs:
        atts[att.id] = att.to_dict()
    return json.dumps(atts)

@app.route('/api/attendances/d/<string:des_id>', methods=['GET'])
@cross_origin()
def attedances_by_description(des_id):
    docs = db.collection(u'attendance').where(u'description_id', u'==', des_id).stream()
    atts = {}
    for att in docs:
        atts[att.id] = att.to_dict()
    return json.dumps(atts)

@app.route('/api/attendances/<string:user_id>/<string:des_id>', methods=['GET'])
@cross_origin()
def attedances_by_user_description(user_id, des_id):
    docs = db.collection(u'attendance').where(u'user_id', u'==', user_id).where(u'description_id', u'==', des_id).stream()
    atts = {}
    for att in docs:
        atts[att.id] = att.to_dict()
    return json.dumps(atts)

@app.route('/api/attendances/<string:user_id>/<string:des_id>/add', methods=['POST'])
@cross_origin()
def a_attedances(user_id, des_id):
    return "description added" , add_attendance(user_id, des_id)


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))