import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
      <p className="footer-links">
        <a href="#">About</a> | <a href="#">Contact</a> | <a href="#">Privacy</a>
      </p>
    </footer>
  );
}

export default Footer;
