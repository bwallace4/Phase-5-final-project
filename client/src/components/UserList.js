import React, { useState} from 'react';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users to display per page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const [isLoading, setIsLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/users'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setShowUsers(true);
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
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <button onClick={getUsers} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Users'}
      </button>
      {showUsers && (
        <>
          <ul className="user-list">
            {currentUsers.map((user) => (
              <li key={user.id}>
                <span className="user-username">{user.username}</span>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;

