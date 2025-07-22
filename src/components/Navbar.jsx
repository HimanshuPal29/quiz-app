import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')}>
        🧠 QuizMaster
      </div>
      <div className="navbar-right">
        <button onClick={() => alert("Login coming soon!")}>Login</button>
        <button onClick={() => alert("Signup coming soon!")}>Signup</button>
      </div>
    </nav>
  );
}

export default Navbar;
