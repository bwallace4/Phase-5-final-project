// Inside your registration component (e.g., RegisterForm.js)
import React, { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

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
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default RegisterForm;
