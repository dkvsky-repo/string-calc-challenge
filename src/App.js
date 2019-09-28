import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Calculator from './components/Calculator/Calculator';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <ErrorBoundary>
        <Calculator />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
