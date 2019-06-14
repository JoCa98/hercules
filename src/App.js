import React from 'react';
import './App.css';
import ActCodeForm from './components/ActCodeForm';
import PasswordRecovery from './components/PasswordRecovery';

import AddAdmin from './components/AddAdmin';

import Header from './components/Header';
import Footer from './components/Footer';
import EmailPruebaForm from './components/EmailPruebaForm';


function App() {
  return (
    <div className="App">
      <Header />
      <ActCodeForm />
      <Footer />
    </div>
  );
}

export default App;
