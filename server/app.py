#!/usr/bin/env python3
from flask import request, jsonify, make_response
from flask_restful import Resource
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
            return json.dumps({"error": "Missing required fields"}), 400  # Use json.dumps here

        # Check if a user with the same username or email already exists
        existing_user = User.query.filter_by(username=data["username"]).first()
        if existing_user:
            return json.dumps({"error": "Username is already taken"}), 400  # Use json.dumps here

        existing_email = User.query.filter_by(email=data["email"]).first()
        if existing_email:
            return json.dumps({"error": "Email is already registered"}), 400  # Use json.dumps here

        try:
            # Create a new User instance and set the password directly
            new_user = User(username=data["username"], email=data["email"])
            new_user.password = data["password"]

            # Add the new user to the database
            db.session.add(new_user)
            db.session.commit()

            response_data = {"message": "User registered successfully"}
            return json.dumps(response_data), 201  # Use json.dumps here
        except Exception as e:
            error_data = {"error": str(e)}
            return json.dumps(error_data), 500  # Handle other exceptions gracefully and use json.dumps here

# Add the RegisterUserResource to your API
api.add_resource(RegisterUserResource, '/register')



     
# Get all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    
    if not users:
        return jsonify({"message": "No users found"}), 404
    
    return jsonify([user.to_dict() for user in users]), 200

# Update a specific user by ID
@app.route("/update/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        data = request.json
        username = data.get("username")
        
        if not username:
            return jsonify({"error": "Username is required"}), 400

        user_to_update = User.query.get(user_id)

        if not user_to_update:
            return jsonify({"error": "User not found"}), 404

        # Check if the provided username matches the user's current username
        if user_to_update.username != username:
            return jsonify({"error": "You can only update your own account"}), 403

        # You may want to add additional validation here for other fields if needed

        # Update the user's information (e.g., username or password)
        if "password" in data:
            password = data["password"]
            hashed_password = generate_password_hash(password, method="sha256")
            user_to_update.password_hash = hashed_password

        # Commit the changes to the database
        db.session.commit()

        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        # Log the error for debugging purposes
        print(str(e))
        return jsonify({"error": "An error occurred while updating the user"}), 500


# Delete a user by username
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200



if __name__ == "__main__":
    app.run(port=5555, debug=True)
