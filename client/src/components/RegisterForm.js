import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory

function RegisterForm() {
  const history = useHistory(); // Initialize useHistory
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = () => {
    // Send a POST request to /register with formData
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);
          // Redirect the user to another page upon successful registration
          history.push('/success-page'); // Use history.push to navigate to the new page
        }
      })
      .catch((error) => {
        // Handle any network or request errors
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button onClick={handleRegistration}>Register</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
