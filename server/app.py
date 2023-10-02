#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,jsonify,make_response
from flask_restful import Resource
# Local imports
from config import app, db, api
# Add your model imports
from models import User

# Views go here!
@app.route('/users', methods=['GET']) 
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        username=data['username'],
        email=data['email']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict())

if __name__ == '__main__':
    app.run(port=5555, debug=True)
