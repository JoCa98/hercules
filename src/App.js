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
import HistoricRoutineInfo from './components/HistoricRoutineInfo';
import NavbarUserHome from './components/NavbarUserHome';
import UserHome from './components/UserHome';
import AddRoutine from './components/AddRoutine';
import SignIn from './components/SignUp';
import UserConfiguration from './components/UserConfiguration';
import LogIn from './components/LogIn';
import ConsultUser from './components/ConsultUser';
import AdminHistoricPhysicalInfo from './components/AdminHistoricPhysicalInfo';
import AddMedicalForm from './components/AddMedicalForm';
import HistoricMedicalInfo from './components/HistoricMedicalInfo';
import RoutineAdmin from './components/RoutineAdmin';
import AddPhysicalInfo from './components/AddPhysicalInfo';
import HistoricMedicalUserInfo from './components/HistoricMedicalUserInfo';



function App() {
  return (
    <div className="App">
      <Header />      
      <UserHome />
      <Footer />
    </div>
  );
}

export default App;
