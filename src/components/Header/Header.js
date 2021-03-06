import React from 'react';

const Header = () => {
  return (
    <header className='jumbotron jumbotron-fluid'>
      <div className='container'>
        <h1 className='display-4'>Code Challenge: String Calculator</h1>
        <p className='lead'>
          A calculator that only supports an Add operation given a single
          formatted string.
        </p>
      </div>
    </header>
  );
};

export default Header;
