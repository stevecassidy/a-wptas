import React from 'react'; 
import {Router, RouteComponentProps, Link} from '@reach/router';
import {Page, Toolbar, Icon} from 'react-onsenui'
import './App.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Home from './components/home/Home';
import ImageQuestion from './components/imageQuestion/ImageQuestion';
import NewPatient from './components/newPatient/NewPatient';
import Questions from './components/question/Question';

const ListPatients = (props: RouteComponentProps) => <div>List Patients</div>

function App() {
  return (
    <Page renderToolbar={() => 
      <Toolbar>
        <div className='left'>
        <Link to="/"><Icon  icon='home' /></Link>
        </div>
        <div className='center'>
          A-WPTAS
        </div>
        <div className='right'>
          &nbsp;
        </div>
      </Toolbar>
    }>
      <Router>
        <Home path="/" />
        <NewPatient path="/newpatient" />
        <Questions path="/newpatient/questions" />
        <ImageQuestion respond={false} path="/newpatient/images" />
        <ImageQuestion respond={true} path="/newpatient/images/response" />
        <ListPatients path="/listpatients" />
      </Router>
      
    </Page>
  );
}

export default App;
