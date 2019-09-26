import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Calculator from './components/Calculator/Calculator';

function App() {
  return (
    <div className='App'>
      <Header />
      <Calculator />
      <Footer />
    </div>
  );
}

export default App;
