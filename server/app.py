#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Item

# Views go here!
@app.route('/items', methods=['GET', 'POST'])
def items():
    if request.method == 'GET':
        items = Item.query.all()
        items_list = [{'id': item.id, 'name': item.name} for item in items]
        return jsonify(items_list)
    elif request.method == 'POST':
        data = request.json
        new_item = Item(name=data['name'])
        db.session.add(new_item)
        db.session.commit()
        return jsonify({'message': 'Item created successfully'}), 201

@app.route('/items/<int:item_id>', methods=['GET', 'PUT', 'DELETE'])
def item(item_id):
    item = Item.query.get_or_404(item_id)
    if request.method == 'GET':
        return jsonify({'id': item.id, 'name': item.name})
    elif request.method == 'PUT':
        data = request.json
        item.name = data['name']
        db.session.commit()
        return jsonify({'message': 'Item updated successfully'})
    elif request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Item deleted successfully'})

if __name__ == '__main__':
    app.run(port=5555, debug=True)
