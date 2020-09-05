import React, { Fragment } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';
import './App.css';
import ActCodeForm from './components/ActCodeForm';
import PasswordRecovery from './components/PasswordRecovery';
import AddAdmin from './components/AddAdmin';
import Configuration from './components/Configuration';
import CareerConfiguration from './components/CareerConfiguration';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeAdmin from './components/HomeAdmin';
import ExercisesList from './components/ExercisesList';
import TipsAdmin from './components/TipsAdmin';
import TipsList from './components/TipsList';
import AddTip from './components/AddTip';
import ConsultTips from './components/ConsultTips';
import ConsultExercise from './components/ConsultExercise';
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
import AccountConfiguration from './components/AccountConfiguration';
import Reports from './components/Reports';
import ReportComponent from './components/ReportComponent';
import ConsultAdmin from './components/ConsultAdmin';
import AddExercise from './components/AddExercise';
import ConsultMedicPersonal from './components/ConsultMedicPersonal';
import AddCareer from './components/AddCareer';
import CareerUpdate from './components/CareerUpdate';
import ConsultCareer from './components/ConsultCareer';
import RiskConditions from './components/RiskConditions';
import AddRiskCondition from './components/AddRiskCondition';
import AddRoutineType from './components/AddRoutineType';
import AddExerciseType from './components/AddExerciseType';
import ExerciseTypeList from './components/ExerciseTypeList';
import ConfigurationRoutine from './components/ConfigurationRoutine';
import RoutineTypeList from './components/RoutineTypeList';
import ObjectiveTypeList from './components/ObjectiveTypeList';
import AddObjectiveType from './components/AddObjectiveType';


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
          <Route exact path="/Configuration" component={Configuration} />
          <Route exact path="/CareerConfiguration" component={CareerConfiguration} />
          <Route exact path="/ExercisesList" component={ExercisesList} />
          <Route exact path="/TipsAdmin" component={TipsAdmin} />
          <Route exact path="/ConsultTips" component={ConsultTips} />
          <Route exact path="/AddTip" component={AddTip} />
          <Route exact path="/AddExercise" component={AddExercise} />
          <Route exact path="/ConsultExercise" component={ConsultExercise} />
          <Route exact path="/AccountConfiguration" component={AccountConfiguration} />
          <Route exact path="/Reports" component={Reports} />
          <Route exact path="/Report" component={ReportComponent} />
          <Route exact path="/ConsultAdmin" component={ConsultAdmin} />
          <Route exact path="/ConsultMedicPersonal" component={ConsultMedicPersonal} />
          <Route exact path="/AddCareer" component={AddCareer} />
          <Route exact path="/CareerUpdate" component={CareerUpdate} />
          <Route exact path="/ConsultCareer" component={ConsultCareer} />
          <Route exact path="/RiskConditions" component={RiskConditions} />
          <Route exact path="/AddRiskCondition" component={AddRiskCondition} />
          <Route exact path="/RoutineTypeList" component={RoutineTypeList} />
          <Route exact path="/AddRoutineType" component={AddRoutineType} />
          <Route exact path="/ExerciseTypeList" component={ExerciseTypeList} />
          <Route exact path="/AddExerciseType" component={AddExerciseType} />
          <Route exact path="/ConfigurationRoutine" component={ConfigurationRoutine} />
          <Route exact path="/ObjectiveTypeList" component={ObjectiveTypeList} />
          <Route exact path="/AddObjectiveType" component={AddObjectiveType} />




          {/** User Side */}
          <Route exact path="/UserHome" component={UserHome} />
          <Route exact path="/UserHomeWithOut" component={UserHomeWithOut} />
          <Route exact path="/UserConfiguration" component={UserConfiguration} />
          <Route exact path="/HistoricPhysicalUserInfo" component={HistoricPhysicalUserInfo} />
          <Route exact path="/HistoricMedicalUserInfo" component={HistoricMedicalUserInfo} />
          <Route exact path="/TipsList" component={TipsList} />

          {/** All */}
          <Route exact path="/ChangeTempPassword" component={ChangeTempPassword} />

        </Fragment>
        <Footer />
      </Fragment>
    </Switch>
  );
}

export default App;