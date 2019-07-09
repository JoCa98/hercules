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
function App() {
  return (
    <HashRouter>
      <Switch>
        <Fragment >
          <Header />
          <Route exact path="/" component={HistoricRoutineInfo} />
          <Fragment>
          <Route exact path="/UserConfiguration" component={UserConfiguration} />
            <Route exact path="/SignUp" component={SignUp} />
            <Fragment>
              <Route exact path="/ActCodeForm" component={ActCodeForm} />
              <Route exact path="/RoutineAdmin" component={RoutineAdmin} />

            </Fragment>
          </Fragment>
          <Footer />
        </Fragment>
      </Switch>
    </HashRouter>

  );
}

export default App;