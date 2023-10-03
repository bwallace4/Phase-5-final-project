import React, { useState, useEffect } from 'react';



function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/users'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (username) => {
    try {
      const response = await fetch(`/delete?username=${username}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Refresh the user list after successful deletion
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <button onClick={getUsers}>Get Users</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username}
              <button onClick={() => handleDeleteUser(user.username)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
