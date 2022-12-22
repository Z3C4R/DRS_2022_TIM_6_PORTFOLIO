from datetime import datetime
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

Engine=Flask(__name__)
Engine.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:1234@localhost/Portfolio'
db=SQLAlchemy(Engine)

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

@Engine.route('/event', methods=['POST'])
def create_event():
    description=request.json['description']
    event=Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

@Engine.route('/events', method=['GET'])
def get_events():
    events=Event.query.order_by(Event.id.asc()).all()    

if __name__=='__main__':
    Engine.run()