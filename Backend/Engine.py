from flask import Flask
from flask_sqlalchemy import SQLAlchemy

Engine=Flask(__name__)
Engine.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
db=SQLAlchemy(Engine)

Engine.route('/')
def hello():
    return 'Hey!'

if __name__=='__main__':
    Engine.run()