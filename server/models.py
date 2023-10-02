import datetime
from flask_marshmallow import Marshmallow
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db,app

# Models go here!
ma=Marshmallow(app)


# Define the association table


class Users(db.Model):
    __tablename__ = "users"
 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    date = db.Column(db.DateTime,default=datetime.datetime.now)
 
    def __init__(self,name,email):
        self.name = name
        self.email = email

    def __repr__(self):
        return f"{self.name}:{self.email}"

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','name','email','date')

user_schema = UserSchema()
user_schema = UserSchema(many =True)
 
       
 
 