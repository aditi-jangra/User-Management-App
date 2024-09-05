import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers } from '../api';
import UserForm from '../components/UserForm';
import Spinner from '../components/Spinner';

const UserDetail = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchUsers(); 
        const userData = response.data.find(user => user.id === parseInt(userId)); 
        if (userData) {
          setUser(userData); 
        } else {
          setError('User not found'); 
        }
      } catch (err) {
        setError('Error fetching user'); 
      } finally {
        setLoading(false); 
      }
    };

    getUser(); 
  }, [userId]); 

  if (loading) return <Spinner/>; 
  if (error) return <p>{error}</p>; 

  return user ? (
    <div className="container">
      <h1>Edit User</h1>
      <UserForm user={user} isEdit/> 
    </div>
  ) : (
    <p>User not found.</p> 
  );
};

export default UserDetail;
