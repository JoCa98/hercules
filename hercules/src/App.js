import React, { Fragment } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';
import './App.css';
import ActCodeForm from './components/ActCodeForm';
import PasswordRecovery from './components/PasswordRecovery';
import AddAdmin from './components/AddAdmin';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeAdmin from './components/HomeAdmin';
import HistoricPhysicalUserInfo from './components/HistoricPhysicalUserInfo';
import HistoricRoutineInfo from './components/HistoricRoutineInfo';
import NavbarUserHome from './components/NavbarUserHome';
import UserHome from './components/UserHome';
import AddRoutine from './components/AddRoutine';
import SignUp from './components/SignUp';
import UserConfiguration from './components/UserConfiguration';
import LogIn from './components/LogIn';
import ConsultUser from './components/ConsultUser';
import HistoricPhysicalInfoAdmin from './components/HistoricPhysicalInfoAdmin';
import MedicalForm from './components/MedicalForm';
import HistoricMedicalInfo from './components/HistoricMedicalInfo';
import RoutineAdmin from './components/RoutineAdmin';
import AddPhysicalInfo from './components/AddPhysicalInfo';
import EditPhysicalInfo from './components/EditPhysicalInfo';
import HistoricMedicalUserInfo from './components/HistoricMedicalUserInfo';
import ConfigurationAdmin from './components/ConfigurationAdmin';
import validations from './components/validations';
import Hash from './components/Hash';
import UserHomeWithOut from './components/UserHomeWithOut';
import Terms from './components/Terms';
import ChangeTempPassword from './components/ChangeTempPassword';


function App() {
  return (
    <Switch>
      <Fragment >
        <Header />
        <Route exact path="/" component={LogIn} />
        <Fragment>
          {/** Outside */}
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/ActCodeForm" component={ActCodeForm} />
          <Route exact path="/PasswordRecovery" component={PasswordRecovery} />
          <Route exact path="/Terms" component={Terms} />

          {/** Admin Side */}
          <Route exact path="/HomeAdmin" component={HomeAdmin} />
          <Route exact path="/AddAdmin" component={AddAdmin} />
          <Route exact path="/MedicalForm" component={MedicalForm} />
          <Route exact path="/AddPhysicalInfo" component={AddPhysicalInfo} />
          <Route exact path="/EditPhysicalInfo" component={EditPhysicalInfo} />
          <Route exact path="/AddRoutine" component={AddRoutine} />
          <Route exact path="/RoutineAdmin" component={RoutineAdmin} />
          <Route exact path="/ConsultUser" component={ConsultUser} />
          <Route exact path="/HistoricMedicalInfo" component={HistoricMedicalInfo} />
          <Route exact path="/HistoricPhysicalInfoAdmin" component={HistoricPhysicalInfoAdmin} />
          <Route exact path="/HistoricRoutineInfo" component={HistoricRoutineInfo} />
          <Route exact path="/ConfigurationAdmin" component={ConfigurationAdmin} />

          {/** User Side */}
          <Route exact path="/UserHome" component={UserHome} />
          <Route exact path="/UserHomeWithOut" component={UserHomeWithOut} />
          <Route exact path="/UserConfiguration" component={UserConfiguration} />
          <Route exact path="/HistoricPhysicalUserInfo" component={HistoricPhysicalUserInfo} />
          <Route exact path="/HistoricMedicalUserInfo" component={HistoricMedicalUserInfo} />

          {/** All */}
          <Route exact path="/ChangeTempPassword" component={ChangeTempPassword} />

        </Fragment>
        <Footer />
      </Fragment>
    </Switch>
  );
}

export default App;