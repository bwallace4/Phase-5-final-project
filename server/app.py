#!/usr/bin/env python3
from flask import request, jsonify, make_response
from flask_restful import Resource
from werkzeug.security import generate_password_hash, check_password_hash

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Tag, Post


@app.route("/register", methods=["POST"])
def register_user():
    data = request.json

    # Check if the required fields are present in the request data
    required_fields = ["username", "email", "password"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if a user with the same username or email already exists
    existing_user = User.query.filter_by(username=data["username"]).first()
    if existing_user:
        return jsonify({"error": "Username is already taken"}), 400

    existing_email = User.query.filter_by(email=data["email"]).first()
    if existing_email:
        return jsonify({"error": "Email is already registered"}), 400

    # Hash the password before storing it in the database
    password = data["password"]
    hashed_password = generate_password_hash(password, method="sha256")

    # Create a new User instance
    new_user = User(
        username=data["username"], email=data["email"], password_hash=hashed_password
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict()), 200

# Update a specific user by ID
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    if "username" in data:
        existing_user = User.query.filter_by(username=data["username"]).first()
        if existing_user and existing_user.id != user.id:
            return jsonify({"error": "Username is already taken"}), 400

    if "email" in data:
        existing_email = User.query.filter_by(email=data["email"]).first()
        if existing_email and existing_email.id != user.id:
            return jsonify({"error": "Email is already registered"}), 400

    if "password" in data:
        password = data["password"]
        hashed_password = generate_password_hash(password, method="sha256")
        user.password_hash = hashed_password

    db.session.commit()

    return jsonify({"message": "User updated successfully"}), 200

# Delete a specific user by ID
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
