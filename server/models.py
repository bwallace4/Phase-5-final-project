from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
import bcrypt
from config import db
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model,SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    
    @hybrid_property
    def  password_hash(self):
        raise AttributeError('password is not a readable attribute')


    @password_hash.setter
    def  password_hash(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password) 
    
    def __repr__(self):
        return f"User {self.username}, ID: {self.id}, Email:{self.email}"
    
    @validates('username')
    def validate_username(self, key, username):
        # Check if username meets your validation criteria (e.g., length)
        if len(username) < 3:
            raise ValueError('Username must be at least 3 characters long.')
        return username

    @validates('email')
    def validate_email(self, key, email):
        # Check if email meets your validation criteria (e.g., format)
        if not email or "@" not in email:
            raise ValueError('Invalid email address.')
        return email

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), unique=True, nullable=False)

post_tags = db.Table('post_tags',
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)
