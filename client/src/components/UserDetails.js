// Inside your user detail component (e.g., UserDetails.js)
import React, { useEffect, useState } from 'react';

function UserDetails({ userId }) {
  
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [user, setUsers] = useState([]);
  
    useEffect(() => {
      // Send a GET request to retrieve the list of users
      fetch('/users')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          return response.json();
        })
        .then((data) => {
          // Set the list of users in the state
          setUsers(data);
        })
        .catch((error) => {
          // Handle any network or request errors
          console.error(error);
        });
    }, []);
  const handleUpdateUser = () => {
    try {
      // Send a PUT request to update user details
      fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: updatedUsername }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json(); // Parse response JSON
            throw new Error(errorData.error || 'Update failed');
          }
          return response.json(); // Parse response JSON for successful requests
        })
        .then((data) => {
          // Handle the response, e.g., show a success message
          console.log(data);
        })
        .catch((error) => {
          // Handle any network or request errors
          console.error(error.message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleDeleteUser = () => {
    try {
      // Send a DELETE request to delete the user
      fetch(`/users/${userId}`, {
        method: 'DELETE',
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json(); // Parse response JSON
            throw new Error(errorData.error || 'Delete failed');
          }
          return response.json(); // Parse response JSON for successful requests
        })
        .then((data) => {
          // Handle the response, e.g., show a success message
          console.log(data);
        })
        .catch((error) => {
          // Handle any network or request errors
          console.error(error.message);
        });
    } catch (error) {
      console.error(error.message);
    }
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
