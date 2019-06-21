import React from 'react';
import './App.css';
import ActCodeForm from './components/ActCodeForm';
import PasswordRecovery from './components/PasswordRecovery';
import AddAdmin from './components/AddAdmin';
import Header from './components/Header';
import Footer from './components/Footer';
import NavbarAdmin from './components/NavbarAdmin';
import HomeAdmin from './components/HomeAdmin';
import HistoricPhysicalInfo from './components/HistoricPhysicalInfo';
import RoutineList from './components/RoutineList';
import NavbarUserHome from './components/NavbarUserHome';
import UserHome from './components/UserHome';
import AddRutine from './components/AddRutine';
import SignIn from './components/SignUp';
import UserConfiguration from './components/UserConfiguration';
import LogIn from './components/LogIn';
import ConsultUser from './components/ConsultUser';

function App() {
  return (
    <div className="App">
      <Header />      
      <ConsultUser />
      <Footer />
    </div>
  );
}

export default App;
