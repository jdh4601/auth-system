import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashborad from './components/Dashboard';
import PhoneVerify from './components/PhoneVerify';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashborad />} />
        <Route path="/phone/verify" element={<PhoneVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
