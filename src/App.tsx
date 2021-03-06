import React from 'react'; 
import {Router, Link} from '@reach/router';
import {Page, Toolbar, Icon} from 'react-onsenui'
import paths from './urls';

import './App.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Home from './components/home/Home';
import ImageQuestion from './components/imageQuestion/ImageQuestion';
import ImageGrid from './components/imageQuestion/ImageGrid';
import NewPatient from './components/newPatient/NewPatient';
import ScreeningQ from './components/screeningQ/ScreeningQ';
import Questions from './components/question/Question';
import PatientList from './components/patientList/PatientList';
import PatientReport from './components/patientReport/PatientReport';
import SetReminder from './components/setReminder/SetReminder';
import Help from './components/help/Help';

function App() {

  return (
    <Page renderToolbar={() => 
      <Toolbar>
        <div className='left'>
        <Link to={paths.home}><Icon  icon='home' /></Link>
        </div>
        <div className='center'>
          A-WPTAS
        </div>
        <div className='right'>
          <Link to={paths.help}><Icon icon='question-circle' />&nbsp;</Link>
        </div>
      </Toolbar>
    }>
      <Router>
        <Home path={paths.home} />
        <NewPatient path={paths.newpatient} />
        <ScreeningQ path={paths.screening} />
        <Questions path={paths.questions} />
        <ImageQuestion respond={false} path={paths.images} />
        <ImageQuestion respond={false} gohome={true} path={paths.imagesquick} />
        <ImageQuestion respond={true} path={paths.imageresponse} />
        <ImageGrid respond={true} path={paths.imagegrid} />
        <ImageGrid respond={false} path={paths.imagegridquick} />
        <PatientList path={paths.listpatients} />
        <PatientReport path={paths.patientreport} />
        <SetReminder path={paths.setreminder} />
        <Help path={paths.help} />
      </Router>
      
    </Page>
  );
}

export default App;
