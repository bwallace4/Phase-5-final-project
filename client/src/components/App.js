import React, { useEffect, useState } from "react";
import './ItemList.css'; // Import your CSS stylesheet

function ItemList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5555/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleCreateItem = () => {
    if (!editingItemId) {
      fetch('http://127.0.0.1:5555/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
        .then((response) => response.json())
        .then(() => {
          setName('');
          fetch('/items')
            .then((response) => response.json())
            .then((data) => setItems(data));
        });
    } else {
      fetch(` http://127.0.0.1:5555/items`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName }),
      })
        .then(() => {
          setEditingItemId(null);
          setEditedName('');
          fetch('/items')
            .then((response) => response.json())
            .then((data) => setItems(data));
        });
    }
  };

  const handleEditItem = (id, itemName) => {
    setEditingItemId(id);
    setEditedName(itemName);
  };

  const handleDeleteItem = (id) => {
    fetch(`/items/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetch('/items')
          .then((response) => response.json())
          .then((data) => setItems(data));
      });
  };

  return (
    <div className="item-list-container">
      <h1>Items</h1>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id}>
            {item.id === editingItemId ? (
              <div>
                <input
                  type="text"
                  placeholder="Edit item name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={handleCreateItem}>Save</button>
              </div>
            ) : (
              <div>
                <span>{item.name}</span>
                <button onClick={() => handleEditItem(item.id, item.name)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        {editingItemId === null && (
          <div>
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleCreateItem}>Create</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemList;
