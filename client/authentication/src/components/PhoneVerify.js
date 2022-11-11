import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PhoneVerify = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ code });
    setCode('');
    navigate('/dashboard');
  };

  return (
    <div className="verify">
      <h2 style={{ marginBottom: '30px' }}>Verify your phone number</h2>
      <form className="verify__form" onSubmit={handleSubmit}>
        <label style={{ marginBottom: '30px' }}>
          A code has been sent your phone
        </label>
        <input
          type="text"
          name="code"
          id="code"
          className="code"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />
        <button className="codeBtn">AUTHENTICATE</button>
      </form>
    </div>
  );
};

export default PhoneVerify;
