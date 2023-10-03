import React, { useState } from 'react';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false); // Track whether to display users

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/users'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();

      // Add an 'index' property to each user object
      const usersWithIndex = data.map((user, index) => ({
        ...user,
        index: index + 1, // Add 1 to start indexing from 1
      }));

      setUsers(usersWithIndex);
      setShowUsers(true); // Display users when data is available
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        const response = await fetch(`/users/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        // Do not call getUsers here; it will be called automatically after setting users in the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove the deleted user from the state
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <button onClick={getUsers} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Users'}
      </button>
      {showUsers && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id}>
              <span className="user-index">{user.index}.</span>
              <span className="user-username">{user.username}</span>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
