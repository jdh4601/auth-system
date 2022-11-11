import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');

  const postSignUpDetails = () => {
    fetch('http://localhost:4000/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        username,
        tel,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        // if user data isn't in server
        if (data.error_message) {
          alert(data.error_message);
        } else {
          // if user data is in server
          alert(data.message);
          navigate('/');
        }
      })
      .catch(err => console.err(err));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(username, tel, email, password);
    postSignUpDetails();
    setEmail('');
    setPassword('');
    setUsername('');
    setTel('');
  };

  const navigate = useNavigate();
  const MoveToLogin = () => {
    navigate('/');
  };

  return (
    <div className="signup__container">
      <h1>SIGN UP</h1>
      <form className="signup__form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="username">USER NAME</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          required
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="tel">TEL</label>
        <input
          type="text"
          id="tel"
          name="tel"
          value={tel}
          required
          onChange={e => setTel(e.target.value)}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <p>
          Already have an account?{' '}
          <span className="link" onClick={MoveToLogin}>
            Sign in
          </span>
        </p>
        <button className="signupBtn">SIGN UP</button>
      </form>
    </div>
  );
};

export default Signup;
