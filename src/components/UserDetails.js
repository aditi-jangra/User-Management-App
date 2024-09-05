import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../api';
import UserForm from '../components/UserForm';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchUsers();
        const userData = response.data.find(user => user.id === parseInt(userId));
        setUser(userData);
      } catch (err) {
        setError('Error fetching user.');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

  if (loading) return <Spinner/>;
  if (error) return <p>{error}</p>;

  return user ? <UserForm user={user} isEdit/> : <p>User not found.</p>;
};

export default UserDetail;
