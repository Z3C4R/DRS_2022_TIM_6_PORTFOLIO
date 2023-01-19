from datetime import datetime
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

Engine=Flask(__name__)
Engine.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:1234@localhost/Portfolio'
Engine.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(Engine)
CORS(Engine)

Engine.app_context().push()

@Engine.route('/')
def hello():
    return 'Hey!'


class Coin(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    ownerId=db.Column(db.String(100), nullable=False)
    coinName=db.Column(db.String(100), nullable=False)
    coinValue=db.Column(db.String(100), nullable=False)
    coinAmount=db.Column(db.String(100), nullable=False)
    created_at=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Coin: {self.ownerId+','+self.coinName+','+self.coinValue+','+self.coinAmount}"

    def __init__(self, ownerId, coinName, coinValue, coinAmount):
        self.ownerId=ownerId,
        self.coinName=coinName,
        self.coinValue=coinValue,
        self.coinAmount=coinAmount
       

def format_coin(coin):
    return{
        "id":coin.id,
        "Owner":coin.ownerId,
        "CoinName":coin.coinName,
        "CoinValue":coin.coinValue,
        "CoinAmount":coin.coinAmount,
        "created_at": coin.created_at
    }


# create an coin
@Engine.route('/coins', methods=['POST'])
def create_coin():
    ownerId=request.json['ownerId']
    coinName=request.json['coinName']
    coinValue=request.json['coinValue']
    coinAmount=request.json['coinAmount']
    coin=Coin(ownerId,coinName,coinValue,coinAmount)
    db.session.add(coin)
    db.session.commit()
    return format_coin(coin)

# get all coins
@Engine.route('/coins', methods=['GET'])
def get_coins():
    coins=Coin.query.order_by(Coin.id.asc()).all()    
    coin_list = []
    for coin in coins:
        coin_list.append(format_coin(coin))
    return {'coins' : coin_list}

# get single coin
@Engine.route('/coins/<id>', methods = ['GET'])
def get_coin(id):
    coin = Coin.query.filter_by(id=id).one()
    formatted_coin = format_coin(coin)
    return {'coin' : formatted_coin}

# delete an coin 
@Engine.route('/coins/<id>', methods = ['DELETE'])
def delete_coin(id):
    coin = Coin.query.filter_by(id=id).one()
    db.session.delete(coin)
    db.session.commit()
    return f'Coin (id: {id}) deleted!'

# edit an coin
@Engine.route('/coins/<id>', methods = ['PUT'])
def update_coin(id):
    coin = Coin.query.filter_by(id=id)
    ownerId=request.json['ownerId']
    coinName=request.json['coinName']
    coinValue=request.json['coinValue']
    coinAmount=request.json['coinAmount']
    coin=Coin(ownerId,coinName,coinValue)
    coin.update(dict(ownerId=ownerId, coinName=coinName, coinValue=coinValue, coinAmount=coinAmount, created_at = datetime.utcnow()))
    db.session.commit()
    return {'coin': format_coin(coin.one())}

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