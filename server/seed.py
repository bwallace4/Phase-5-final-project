#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db,User,app
from config import app, db, api
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

   # Seed the database with fake users
        for _ in range(10):  # Change the number as needed
            username = fake.user_name()
            email = fake.email()
            password = 'your_password_here'  # Replace with a password or generate one randomly

            # Create a new user instance, set the password directly (no need to hash)
            new_user = User(username=username, email=email)
            new_user.password = password

            # Add the user to the database (bcrypt will hash the password internally)
            db.session.add(new_user)

        # Commit the changes to the database
        db.session.commit()






