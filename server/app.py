#!/usr/bin/env python3
from flask import request, jsonify, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
# Local imports
from config import app, db, api

# Add your model imports
from models import User, Tag, Post
import json  # Import the json module


class RegisterUserResource(Resource):
    def post(self):
        data = request.get_json()

        # Check if the required fields are present in the request data
        required_fields = ["username", "email", "password"]
        if not all(field in data for field in required_fields):
            return (
                json.dumps({"error": "Missing required fields"}),
                400,
            )

        # Check if a user with the same username or email already exists
        existing_user = User.query.filter_by(username=data["username"]).first()
        if existing_user:
            return (
                json.dumps({"error": "Username is already taken"}),
                400,
            )

        existing_email = User.query.filter_by(email=data["email"]).first()
        if existing_email:
            return (
                json.dumps({"error": "Email is already registered"}),
                400,
            )

        try:
            # Create a new User instance and set the username and email
            new_user = User(username=data["username"], email=data["email"])

            # Hash the plaintext password and set it in the User model
            new_user.password_hash = data["password"]

            # Add the new user to the database
            db.session.add(new_user)
            db.session.commit()

            # Store the user's ID in the session to authenticate them
            session['user_id'] = new_user.id

            response_data = {"message": "User registered successfully"}
            return json.dumps(response_data), 201
        except IntegrityError:
            return (
                json.dumps({"error": "Username or email is already taken"}),
                422,
            )
        except Exception as e:
            error_data = {"error": str(e)}
            return (
                json.dumps(error_data),
                500,
            )

class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            if user:
                return user.to_dict(), 200

        return {}, 204

class Logout(Resource):
    def delete(self):
        # Clear user's session
        session.clear()
        return {}, 204




# Add the RegisterUserResource to your API
api.add_resource(RegisterUserResource, "/register")
api.add_resource(Login, "/login")
api.add_resource(CheckSession, '/check-session')
api.add_resource(Logout, '/logout')

# Get all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()

    if not users:
        return jsonify({"message": "No users found"}), 404

    return jsonify([user.to_dict() for user in users]), 200


# Delete a user by username
@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200


if __name__ == "__main__":
    app.run(port=5555, debug=True)
