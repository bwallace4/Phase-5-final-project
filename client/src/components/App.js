import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router,Switch, Route } from "react-router-dom";


function ItemList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editingItemId, setEditingItemId] = useState(null); // To track the item being edited
  const [editedName, setEditedName] = useState(''); // To store the edited item name

  useEffect(() => {
    fetch('http://127.0.0.1:5555/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleCreateItem = () => {
    if (!editingItemId) {
      // If not editing, create a new item
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
      // If editing, update the existing item
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
    // Set the editing state when the "Edit" button is clicked
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
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id === editingItemId ? (
              // Render the edit form when editing
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
              // Render the item name and buttons when not editing
              <div>
                {item.name}
                <button onClick={() => handleEditItem(item.id, item.name)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        {editingItemId === null && (
          // Render the item creation form when not editing
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
