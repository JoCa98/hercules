import React from 'react';
import './App.css';
import ActCodeForm from './components/ActCodeForm';
import PasswordRecovery from './components/PasswordRecovery';

import AddAdmin from './components/AddAdmin';

import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import EmailPruebaForm from './components/EmailPruebaForm';
import HomeAdmin from './components/HomeAdmin';


function App() {
  return (
    <div className="App">
      <Header />
      <HomeAdmin />
      <Footer />
    </div>
  );
}

export default App;
