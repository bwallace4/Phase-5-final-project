from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import relationship


from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    username = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    comments = relationship('Comment', secondary='user_comment', backref='commented_by')


    def __repr__(self):
        return f'<User(id={self.id}, username={self.username}, email={self.email})>'

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    commented_by = relationship('User', secondary='user_comment', backref='comments')

    def __repr__(self):
        return f"<Comment(id={self.id}, user_id={self.user_id}, post_id={self.post_id}, created_at={self.created_at})>"

class Post(db.Model, SerializerMixin):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __repr__(self):
        return f"<Post(id={self.id}, title='{self.title}', user_id={self.user_id}, created_at={self.created_at})>"
    
class Favorites(db.Model, SerializerMixin):
     __tablename__ = 'favorites'
    
     id = db.Column(db.Integer, primary_key=True)
     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
     post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

     def __repr__(self):
        return f'<Favorites(id={self.id}, user_id={self.user_id}, post_id={self.post_id})>'
     
class UserComment(db.Model,SerializerMixin):
    __tablename__ = 'user_comment'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'), nullable=False)
