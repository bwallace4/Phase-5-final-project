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
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({'error': 'Username is required'}), 400

    user = User(username=username)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully', 'user_id': user.id}), 201

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'username': user.username} for user in users]
    return jsonify(user_list)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
