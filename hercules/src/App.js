import React, { Fragment } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';
import './App.css';
import ActCodeForm from './components/ActCodeForm';
import PasswordRecovery from './components/PasswordRecovery';
import AddAdmin from './components/AddAdmin';
import Header from './components/Header';
import Footer from './components/Footer';
import NavbarAdmin from './components/NavbarAdmin';
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
import AddMedicalForm from './components/AddMedicalForm';
import HistoricMedicalInfo from './components/HistoricMedicalInfo';
import RoutineAdmin from './components/RoutineAdmin';
import AddPhysicalInfo from './components/AddPhysicalInfo';
import HistoricMedicalUserInfo from './components/HistoricMedicalUserInfo';
import validations from './components/validations';
import Hash from './components/Hash';
function App() {
  return (
      <Switch>
        <Fragment >
          <Header />
<<<<<<< HEAD
          <Route exact path="/" component={AddRoutine} />
=======
          <Route exact path="/" component={AddAdmin} />
>>>>>>> 1f6bcbde09f1456e132bde0250e286111b960d92
          <Fragment>
          <Route exact path="/UserHome" component={UserHome} />
            <Route exact path="/UserConfiguration" component={UserConfiguration} />
            <Route exact path="/SignUp" component={SignUp} />
            <Fragment>
              <Route exact path="/ActCodeForm" component={ActCodeForm} />
              <Route exact path="/RoutineAdmin" component={RoutineAdmin} />
              <Route exact path="/AddRoutine" component={AddRoutine} />
              <Fragment>
                <Route exact path="/AddMedicalForm" component={AddMedicalForm} />
                <Route exact path="/HistoricMedicalInfo" component={HistoricMedicalInfo} />
                <Route exact path="/HistoricPhysicalInfoAdmin" component={HistoricPhysicalInfoAdmin} />
                <Route exact path="/HistoricRoutineInfo" component={HistoricRoutineInfo} />
              </Fragment>
            </Fragment>
          </Fragment>
          <Footer />
        </Fragment>
      </Switch>

  );
}

export default App;