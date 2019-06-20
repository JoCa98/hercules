import React from 'react';
import './App.css';
import ActCodeForm from './components/ActCodeForm';
import PasswordRecovery from './components/PasswordRecovery';
import AddAdmin from './components/AddAdmin';
<<<<<<< HEAD
import Header from './components/Header';
import Footer from './components/Footer';
import NavbarAdmin from './components/NavbarAdmin';
import HomeAdmin from './components/HomeAdmin';
import NavbarUserHome from './components/NavbarUserHome';
import UserHome from './components/UserHome';

=======
import SignIn from './components/SignIn';

import Header from './components/Header';
import Footer from './components/Footer';


import Navbar from './components/Navbar';
import EmailPruebaForm from './components/EmailPruebaForm';
import HomeAdmin from './components/HomeAdmin';
import HistoricPhysicalInfo from './components/HistoricPhysicalInfo';
import AddPhysicalInfo from './components/AddPhysicalInfo';
>>>>>>> 8864d62fdb147e9d370cb15e3600df773fd792d7

function App() {
  return (
    <div className="App">

      <Header />
<<<<<<< HEAD
      <NavbarUserHome />
      <UserHome />
=======
      <SignIn />
>>>>>>> 8864d62fdb147e9d370cb15e3600df773fd792d7
      <Footer />

    </div>
  );
}

export default App;
