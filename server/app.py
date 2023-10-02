#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,jsonify,make_response
from flask_restful import Resource
from flask_marshmallow import Marshmallow
# Local imports
from config import app, db, api
# Add your model imports
from models import Users
ma=Marshmallow(app)
# Views go here!
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','name','email','password')
  
user_schema = UserSchema()
users_schema = UserSchema(many=True)
  
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
 
@app.route('/users', methods=['GET']) 
def listusers():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)
  
@app.route('/userdetails/<id>',methods =['GET'])
def userdetails(id):
    user = Users.query.get(id)
    return user_schema.jsonify(user)
  
@app.route('/userupdate/<id>',methods = ['PUT'])
def userupdate(id):
    user = Users.query.get(id)
  
    name = request.json['name']
    email = request.json['email']
  
    user.name = name
    user.email = email
  
    db.session.commit()
    return user_schema.jsonify(user)
 
@app.route('/userdelete/<id>',methods=['DELETE'])
def userdelete(id):
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)
  
@app.route('/newuser',methods=['POST'])
def newuser():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
  
    print(name)
    print(email)
    print(password)
 
    users = Users(name=name, email=email, password=password)
 
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify(users)
if __name__ == '__main__':
    app.run(port=5555, debug=True)
