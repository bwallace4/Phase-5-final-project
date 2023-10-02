#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Users,user_schema,UserSchema

# Views go here!


@app.route('/useradd' , methods = ['POST'])
def useradd():
   name = request.json['name']
   email = request.json['email']

   users = Users(name,email)
   db.session.add(users)
   db.session.commit

   return user_schema.jsonify(users)
 

if __name__ == '__main__':
    app.run(port=5555, debug=True)
