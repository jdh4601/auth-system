import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Clear submit form
  const handleSubmit = event => {
    event.preventDefault();
    console.log(email, password);
    setEmail('');
    setPassword('');
  };
  // Move to sign up page if login is failed.
  const moveToSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="login__container">
      <h1>Login</h1>
      <form className="login__form">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <p>
          Don't have an account?{' '}
          <span className="link" onClick={moveToSignUp}>
            Sign up
          </span>
        </p>
        <button className="loginBtn" onClick={handleSubmit}>
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default Login;
