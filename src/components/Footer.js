import React from 'react';

const Footer = () => {

  const footerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderTop: '1px solid #ddd',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%', // Make the footer full width
  };
  return (
    <footer style={footerStyle} className="main-footer">
    <div className="float-right d-none d-sm-inline-block">
      All rights reserved.
    </div>
    <strong>&copy; 2022-2023 <a href="https://Kelmission.com">Kelmission</a></strong>
  </footer>
  );
};

export default Footer;