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


function App() {
  return (
    <div className="App">
      <Header/>
      <RoutineList/>
      <Footer/>
      </div>

  );
}

export default App;
