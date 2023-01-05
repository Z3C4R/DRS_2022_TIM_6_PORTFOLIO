from datetime import datetime
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

Engine=Flask(__name__)
Engine.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:aca@localhost/Portfolio'
Engine.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(Engine)
CORS(Engine)

Engine.app_context().push()

class Event(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    description=db.Column(db.String(100), nullable=False)
    created_at=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Event: {self.description}"

    def __init__(self, description):
        self.description=description

def format_event(event):
    return{
        "description":event.description,
        "id":event.id,
        "created_at": event.created_at
    }

@Engine.route('/')
def hello():
    return 'Hey!'

# create an event
@Engine.route('/events', methods=['POST'])
def create_event():
    description=request.json['description']
    event=Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

# get all events
@Engine.route('/events', methods=['GET'])
def get_events():
    events=Event.query.order_by(Event.id.asc()).all()    
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {'events' : event_list}

# get single event
@Engine.route('/events/<id>', methods = ['GET'])
def get_event(id):
    event = Event.query.filter_by(id=id).one()
    formatted_event = format_event(event)
    return {'event' : formatted_event}

# delete an event 
@Engine.route('/events/<id>', methods = ['DELETE'])
def delete_event(id):
    event = Event.query.filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f'Event (id: {id}) deleted!'

# edit an event
@Engine.route('/events/<id>', methods = ['PUT'])
def update_event(id):
    event = Event.query.filter_by(id=id)
    description = request.json['description']
    event.update(dict(description = description, created_at = datetime.utcnow()))
    db.session.commit()
    return {'event': format_event(event.one())}

class User(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    firstname=db.Column(db.String(100), nullable=False)
    lastname=db.Column(db.String(100), nullable=False)
    adress=db.Column(db.String(100), nullable=False)
    city=db.Column(db.String(100), nullable=False)
    country=db.Column(db.String(100), nullable=False)
    phonenumber=db.Column(db.String(100), nullable=False)
    email=db.Column(db.String(100), nullable=False)
    password=db.Column(db.String(100), nullable=False)
    created_at=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"User: {self.firstname+','+self.lastname+','+self.adress+','+self.city+','+self.country+','+self.phonenumber+','+self.email+','+self.password}"

    def __init__(self, firstname, lastname, adress, city, country, phonenumber, email, password):
        self.firstname=firstname,
        self.lastname=lastname,
        self.adress=adress,
        self.city=city,
        self.country=country,
        self.phonenumber=phonenumber,
        self.email=email,
        self.password=password

# register user
@Engine.route('/users', methods=['POST'])
def create_user():
    firstname=request.json['firstname']
    lastname=request.json['lastname']
    adress=request.json['adress']
    city=request.json['city']
    country=request.json['country']
    phonenumber=request.json['phonenumber']
    email=request.json['email']
    password=request.json['password']
    user=User(firstname,lastname,adress,city,country,phonenumber,email,password)
    db.session.add(user)
    db.session.commit()
    return format_user(user)

#list all users
@Engine.route('/users', methods=['GET'])
def get_users():
    users=User.query.order_by(User.id.asc()).all()    
    user_list = []
    for user in users:
        user_list.append(format_user(user))
    return {'Users' : user_list}

# get single users
@Engine.route('/users/<id>', methods = ['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).one()
    formatted_user = format_user(user)
    return {'users' : formatted_user}

# delete user 
@Engine.route('/users/<id>', methods = ['DELETE'])
def delete_user(id):
    user = User.query.filter_by(id=id).one()
    db.session.delete(user)
    db.session.commit()
    return f'User (id: {id}) deleted!'

# edit user
@Engine.route('/users/<id>', methods = ['PUT'])
def update_user(id):
    user = User.query.filter_by(id=id)
    firstname=request.json['firstname']
    lastname=request.json['lastname']
    adress=request.json['adress']
    city=request.json['city']
    country=request.json['country']
    phonenumber=request.json['phonenumber']
    email=request.json['email']
    password=request.json['password']
    user.update(dict(firstname = firstname, lastname=lastname, adress=adress, city=city, country=country, phonenumber=phonenumber, email=email, password=password, created_at = datetime.utcnow()))
    db.session.commit()
    return {'user': format_user(user.one())}    

def format_user(user):
    return{ 
        "id":user.id,
        "Firstname":user.firstname,
        "Lastname":user.lastname,
        "Adress":user.adress,
        "City":user.city,
        "Country":user.country,
        "Phonenumber":user.phonenumber,
        "Email":user.email,
        "Password":user.password,
        "created_at": user.created_at

    }

if __name__=='__main__':
    Engine.run(debug=True, port=5000)