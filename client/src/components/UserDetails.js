// Inside your user detail component (e.g., UserDetails.js)
import React, { useEffect, useState } from 'react';

function UserDetails({ userId }) {
  const [user, setUser] = useState({});
  const [updatedUsername, setUpdatedUsername] = useState('');

  useEffect(() => {
    // Send a GET request to retrieve user details
    fetch(`/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setUpdatedUsername(data.username);
      })
      .catch((error) => {
        // Handle errors, e.g., user not found
        console.error(error);
      });
  }, [userId]);

  const handleUpdateUser = () => {
    // Send a PUT request to update user details
    fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: updatedUsername }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., show a success message or handle errors
        console.log(data);
      })
      .catch((error) => {
        // Handle any network or request errors
        console.error(error);
      });
  };

  const handleDeleteUser = () => {
    // Send a DELETE request to delete the user
    fetch(`/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., show a success message or handle errors
        console.log(data);
      })
      .catch((error) => {
        // Handle any network or request errors
        console.error(error);
      });
  };

  return (
    <div>
      <h1>User Details</h1>
      <p>Username: {user.username}</p>
      <input
        type="text"
        value={updatedUsername}
        onChange={(e) => setUpdatedUsername(e.target.value)}
      />
      <button onClick={handleUpdateUser}>Update Username</button>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
}

export default UserDetails;
