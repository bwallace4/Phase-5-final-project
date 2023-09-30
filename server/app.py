#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request,jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User,Comment,Post,Favorites,UserComment

# Views go here!

@app.route('/messages', methods=['GET', 'POST'])
def messages():
    if request.method == 'GET':
        messages = Message.query.order_by('created_at').all()

        response = make_response(
            jsonify([message.to_dict() for message in messages]),
            200,
        )
    
    elif request.method == 'POST':
        data = request.get_json()
        message = Message(
            body=data['body'],
            username=data['username']
        )

        db.session.add(message)
        db.session.commit()

        response = make_response(
            jsonify(message.to_dict()),
            201,
        )

    return response

@app.route('/messages/<int:id>', methods=['PATCH', 'DELETE'])
def messages_by_id(id):
    message = Message.query.filter_by(id=id).first()

    if request.method == 'PATCH':
        data = request.get_json()
        for attr in data:
            setattr(message, attr, data[attr])
            
        db.session.add(message)
        db.session.commit()

        response = make_response(
            jsonify(message.to_dict()),
            200,
        )

    elif request.method == 'DELETE':
        db.session.delete(message)
        db.session.commit()

        response = make_response(
            jsonify({'deleted': True}),
            200,
        )

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)

