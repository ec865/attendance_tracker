from flask import Flask, request
from flask_cors import CORS, cross_origin

import os
import json

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("attendancetracker-239b2-firebase-adminsdk-49im3-73a41092ad.json")
firebase_admin.initialize_app(cred, {'projectId': "attendancetracker-239b2",})

db = firestore.client()

def add_user(name, surname, email, password, role):
    user = db.collection(u'users').document((name + '_' + surname).replace(' ', '-'))
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
    users = []
    for user in user_docs:
        users.append({
            'user_id' : user.id,
            'name': user.get('name'),
            'surname': user.get('surname'),
            'email': user.get('email'),
            'password' : user.get('password'),
            'role' : user.get('role')
        })
    return json.dumps(users)

def list_user_by_user_id(user_id):
    docs = db.collection(u'users').document(user_id)
    user_list = []
    user = docs.get()
    user_list.append({
        'user_id' : user.id,
        'name': user.get('name'),
        'surname': user.get('surname'),
        'email': user.get('email'),
        'password' : user.get('password'),
        'role' : user.get('role')
    })
    return json.dumps(user_list)

def user_exists(user_id):
    docs = db.collection(u'users').document(user_id)
    user = docs.get()
    if user.exists:
        return True
    return False

def user_email_exists(email):
    docs = db.collection(u'users').where(u'email', u'==', email).stream()
    for user in docs:
        if user.exists:
            return True
    return False

def add_event(name, user_id):
    event = db.collection(u'events').document((name + '_' + user_id).replace(' ', '-'))
    event.set({
        u'event_name': name,
        u'user_id': user_id,
    })        

def list_events():
    events = db.collection(u'events')
    event_docs = events.stream()
    events = []
    for event in event_docs:
        events.append({
            'event_id' : event.id,
            'event_name' : event.get('event_name'),
            'user_id' : event.get('user_id')
        })
    return json.dumps(events)

def list_events_by_user_id(user_id):
    docs = db.collection(u'events').where(u'user_id', u'==', user_id).stream()
    events = []
    for event in docs:
        events.append({
            'event_id' : event.id,
            'event_name' : event.get('event_name'),
            'user_id' : event.get('user_id')
        })
    return json.dumps(events)

def list_events_by_event_id(event_id):
    docs = db.collection(u'events').document(event_id)
    event_list = []
    event = docs.get()
    event_list.append({
        'event_id' : event.id,
        'event_name' : event.get('event_name'),
        'user_id' : event.get('user_id')
    })
    return json.dumps(event_list)

def delete_event(event_id):
    descriptions = json.loads(list_descriptions_by_event_id(event_id))
    for description in descriptions:
        attendances = json.loads(list_attendances_by_description_id(description['description_id']))
        for attendance in attendances:
            db.collection(u'attendance').document(attendance['attendance_id']).delete()
        db.collection(u'description').document(description['description_id']).delete()
    db.collection(u'events').document(event_id).delete()

def event_exists(event_id):
    docs = db.collection(u'events').document(event_id)
    event = docs.get()
    if event.exists:
        return True
    return False

def add_description(des_name, passcode, start_time, end_time, event_id):
    des = db.collection(u'description').document((event_id + '_' + des_name).replace(' ', '-'))
    des.set({
        u'description_name': des_name,
        u'passcode': passcode,
        u'start_time': start_time,
        u'end_time': end_time,
        u'event_id' : event_id
    })        

def list_descriptions():
    descriptions = db.collection(u'description')
    desc_docs = descriptions.stream()
    des_list = []
    for des in desc_docs:
        des_list.append({
            'description_id' : des.id,
            'description_name': des.get('description_name'),
            'passcode': des.get('passcode'),
            'start_time': des.get('start_time'),
            'end_time': des.get('end_time'),
            'event_id' : des.get('event_id')
        })
    return json.dumps(des_list)

def list_descriptions_by_event_id(event_id):
    docs = db.collection(u'description').where(u'event_id', u'==', event_id).stream()
    des_list = []
    for des in docs:
        des_list.append({
            'description_id' : des.id,
            'description_name': des.get('description_name'),
            'passcode': des.get('passcode'),
            'start_time': des.get('start_time'),
            'end_time': des.get('end_time'),
            'event_id' : des.get('event_id')
        })
    return json.dumps(des_list)

def list_description_by_description_id(des_id):
    docs = db.collection(u'description').document(des_id)
    des_list = []
    des = docs.get()
    des_list.append({
        'description_id' : des.id,
        'description_name': des.get('description_name'),
        'passcode': des.get('passcode'),
        'start_time': des.get('start_time'),
        'end_time': des.get('end_time'),
        'event_id' : des.get('event_id')
    })
    return json.dumps(des_list)

def description_exists(des_id):
    docs = db.collection(u'description').document(des_id)
    des = docs.get()
    if des.exists:
        return True
    return False

def get_description_passcode(des_id):
    docs = db.collection(u'description').document(des_id)
    doc = docs.get()
    passcode = doc.get('passcode')
    return passcode

def add_attendance(status, user_id, description_id):
    att = db.collection(u'attendance').document(user_id + '_' + description_id)
    att.set({
        'status' : status,
        'user_id': user_id,
        'description_id': description_id
    })      

def list_attendances():
    attendances = db.collection(u'attendance')
    att_docs = attendances.stream()
    atts = []
    for att in att_docs:
        atts.append({
            'attendance_id' : att.id,
            'status' : att.get('status'),
            'user_id': att.get('user_id'),
            'description_id': att.get('description_id')
        })
    return json.dumps(atts)    

def list_attendances_by_user(user_id):
    docs = db.collection(u'attendance').where(u'user_id', u'==', user_id).stream()
    atts = []
    for att in docs:
        atts.append({
            'attendance_id' : att.id,
            'status' : att.get('status'),
            'user_id': att.get('user_id'),
            'description_id': att.get('description_id')
        })
    return json.dumps(atts)

def list_attendances_by_description_id(des_id):
    docs = db.collection(u'attendance').where(u'description_id', u'==', des_id).stream()
    atts = []
    for att in docs:
        atts.append({
            'attendance_id' : att.id,
            'status' : att.get('status'),
            'user_id': att.get('user_id'),
            'description_id': att.get('description_id')
        })
    return json.dumps(atts)

def list_attedances_by_user_description(user_id, des_id):
    docs = db.collection(u'attendance').where(u'user_id', u'==', user_id).where(u'description_id', u'==', des_id).stream()
    atts = []
    for att in docs:
        atts.append({
            'attendance_id' : att.id,
            'status' : att.get('status'),
            'user_id': att.get('user_id'),
            'description_id': att.get('description_id')
        })
    return json.dumps(atts)

def list_attedances_by_user_event(user_id, event_id):
    descriptions = db.collection(u'description').stream()
    for des in descriptions:
        if (des.get('event_id') == event_id):
            print(des.id)
            return list_attedances_by_user_description(user_id, des.id)
    return "no attendance by the given user_id and event_id" , 404


def list_attendance_by_attendance_id(att_id):
    docs = db.collection(u'attendance').document(att_id)
    if (attendance_exists(att_id)):
        att = docs.get()
        des_id = att.get('description_id')
        return list_description_by_description_id(des_id)
    return "attendance not found" , 404

def attendance_exists(att_id):
    docs = db.collection(u'attendance').document(att_id)
    att = docs.get()
    if att.exists:
        return True
    return False


app = Flask(__name__)
CORS(app)

########################### API ##############################

@app.route('/', methods=['GET'])
@cross_origin()
def index():
    return "Hey! Please use the APIs to do more!"

#Sign in
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
                    'user_id' : user.id,
                    'name' : user.get('name'),
                    'surname' : user.get('surname'),
                    'role' : user.get('role')
                }
    return "email or password is wrong", 404
#Sign up
@app.route('/api/signup', methods=['POST'])
@cross_origin()
def sign_up():
    name = request.args.get('name')
    surname = request.args.get('surname')
    email = request.args.get('email')
    password = request.args.get('password')
    role = request.args.get('role')
    if (user_email_exists(email)):
        return "this email is in use, please choose another email"
    add_user(name, surname, email, password, role)
    return "User " + name + " added" 

#Lists all users in the database
@app.route('/api/users', methods=['GET'])
@cross_origin()
def l_users():
    return list_users()

@app.route('/api/users/<string:user_id>', methods=['GET'])
@cross_origin()
def user_by_user_id(user_id):
    return list_user_by_user_id(user_id)

#Lists all events in the database
@app.route('/api/events', methods=['GET'])
@cross_origin()
def l_events():
    return list_events()
#Lists events that belong to a user
@app.route('/api/events/u/<string:user_id>', methods=['GET'])
@cross_origin()
def events_by_user_id(user_id):
    return list_events_by_user_id(user_id)
#Lists the event by the given event_id
@app.route('/api/events/e/<string:event_id>', methods=['GET'])
@cross_origin()
def event_by_event_id(event_id):
    return list_events_by_event_id(event_id)
#Adds a new event
@app.route('/api/events/<string:user_id>/add', methods=['POST'])
@cross_origin()
def a_event(user_id):
    event_name = request.args.get('event_name')
    if (user_exists(user_id)):
        return "event added" , add_event(event_name, user_id)
    return "user does not exist, please check the user_id" , 404
#Deletes an event
@app.route('/api/events/delete', methods=['DELETE'])
@cross_origin()
def d_event():
    event_id= request.args.get('event_id')
    if (event_exists(event_id)):
        return "event deleted" , delete_event(event_id)
    return "event not found" , 404

#Lists all descriptions in the database
@app.route('/api/descriptions', methods=['GET'])
@cross_origin()
def l_descriptions():
    return list_descriptions()
#Lists descriptions by event_id
@app.route('/api/descriptions/e/<string:event_id>', methods=['GET'])
@cross_origin()
def descriptions_by_event_id(event_id):
    return list_descriptions_by_event_id(event_id)
#Lists the description by description_id
@app.route('/api/descriptions/d/<string:des_id>', methods=['GET'])
@cross_origin()
def description_by_description_id(des_id):
    return list_description_by_description_id(des_id)
#Adds a new description
@app.route('/api/descriptions/<string:event_id>/add', methods=['POST'])
@cross_origin()
def a_description(event_id):
    des_name = request.args.get('des_name')
    passcode = request.args.get('passcode')
    start_time = request.args.get('start_time')
    end_time = request.args.get('end_time')
    if (event_exists(event_id)):
        return "description added" , add_description(des_name, passcode, start_time, end_time, event_id)
    return "event does not exist, please check the event_id" , 404

#Lists all attendances in the database
@app.route('/api/attendances', methods=['GET'])
@cross_origin()
def l_attedances():
    return list_attendances()
#Lists attendances by user_id
@app.route('/api/attendances/u/<string:user_id>', methods=['GET'])
@cross_origin()
def attedances_by_user(user_id):
    return list_attendances_by_user(user_id)
#Lists attendances by description_id
@app.route('/api/attendances/d/<string:des_id>', methods=['GET'])
@cross_origin()
def attedances_by_description(des_id):
    return list_attendances_by_description_id(des_id)
#Lists the attendance(description) by attendance_id
@app.route('/api/attendances/a/<string:att_id>', methods=['GET'])
@cross_origin()
def attedance_by_attendance_id(att_id):
    return list_attendance_by_attendance_id(att_id)
#Lists attendances by user_id and description_id
@app.route('/api/attendances/u/<string:user_id>/d/<string:des_id>', methods=['GET'])
@cross_origin()
def attedances_by_user_description(user_id, des_id):
    return list_attedances_by_user_description(user_id, des_id)
#Lists attendances by user_id and event_id
@app.route('/api/attendances/u/<string:user_id>/e/<string:event_id>', methods=['GET'])
@cross_origin()
def attedances_by_user_event(user_id, event_id):
    if(user_exists(user_id)):
        if(event_exists(event_id)):
            return list_attedances_by_user_event(user_id, event_id)
        return "event does not exist, please check the event_id" , 404
    return "user does not exist, please check the user_id" , 404
#Adds a new attendance
@app.route('/api/attendances/u/<string:user_id>/d/<string:des_id>/add', methods=['POST'])
@cross_origin()
def a_attedances(user_id, des_id):
    if (user_exists(user_id)):
        if (description_exists(des_id)):
            actual_passcode = get_description_passcode(des_id)
            passcode = request.args.get('passcode')
            if (passcode == actual_passcode):
                status = request.args.get('status')
                if (attendance_exists(user_id + '_' + des_id)):    
                    return "this user has already submitted their attendance to this event"
                return "user's attendance added" , add_attendance(status, user_id, des_id)
            return "passcodes do not match"
        return "description does not exist, please check the description_id" , 404
    return "user does not exist, please check the user_id" , 404

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))