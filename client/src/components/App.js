import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router,Switch, Route } from "react-router-dom";


function ItemList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handleCreateItem = () => {
    fetch('/items', {
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
            {item.name}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleCreateItem}>Create</button>
      </div>
    </div>
  );
}

export default ItemList;
