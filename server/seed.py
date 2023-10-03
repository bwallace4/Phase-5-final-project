#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import bcrypt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import bcrypt

# Local imports
from app import app
from models import db,User
if __name__ == '__main__':
    fake = Faker()

     


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =  'sqlite:///app.db'  # Replace with your database URI
db = SQLAlchemy(app)

# Import your User model here

# Your seeding code
with app.app_context():
    # Seed the database with fake users
    for _ in range(10):  # Change the number as needed
        username = fake.user_name()
        email = fake.email()
        password = 'your_password_here'  # Replace with a password or generate one randomly

        # Hash the password using bcrypt
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

        # Create a new user instance and add it to the database
        new_user = User(username=username, email=email, password_hash=password_hash)
        db.session.add(new_user)

    # Commit the changes to the database
    db.session.commit()



