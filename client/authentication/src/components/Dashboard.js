import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // useEffect hook을 사용한 이유??
  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h2 style={{ marginBttom: '20px' }}>Hello, Jayden</h2>
      <button className="signOutBtn" onClick={handleSignOut}>
        SIGN OUT
      </button>
    </div>
  );
};

export default Dashboard;
