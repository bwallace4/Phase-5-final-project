from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

# Models go here!
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Define the association table
user_group_association = db.Table(
    'user_group_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    # Define the many-to-many relationship with Group
    groups = db.relationship('Group', secondary=user_group_association, backref='users')

    def __repr__(self):
        return f'<User(id={self.id}, username={self.username})>'

class Group(db.Model):
    __tablename__ = 'group'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    # Define the many-to-many relationship with User
    users = db.relationship('User', secondary=user_group_association, backref='groups')

    def __repr__(self):
        return f'<Group(id={self.id}, name={self.name})>'
