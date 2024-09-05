import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '../api';

const UserForm = ({ user, isEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, phone };

    try {
      if (isEdit) {
        await updateUser(user.id, userData); 
        await createUser(userData); 
      }
      navigate('/'); 
    } catch (err) {
      setError('Error saving user');
    }
  };

  return (
    <div className="container">
      <h1>{isEdit ? 'Edit User' : 'Create New User'}</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <button type="submit">{isEdit ? 'Update User' : 'Create User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
