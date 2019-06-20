import React from 'react';
import './App.css';
import ActCodeForm from './components/ActCodeForm';
import PasswordRecovery from './components/PasswordRecovery';

import AddAdmin from './components/AddAdmin';
import SignIn from './components/SignIn';

import Header from './components/Header';
import Footer from './components/Footer';


import Navbar from './components/Navbar';
import EmailPruebaForm from './components/EmailPruebaForm';
import HomeAdmin from './components/HomeAdmin';
import HistoricPhysicalInfo from './components/HistoricPhysicalInfo';
import AddPhysicalInfo from './components/AddPhysicalInfo';

function App() {
  return (
    <div className="App">
      <Header />
      <SignIn />
      <Footer />
    </div>
  );
}

export default App;
