import React from 'react'; 
import {Router, RouteComponentProps, Link} from '@reach/router';
import {grommet, Grommet, Box} from 'grommet';
import Home from './components/home/Home'
import Questions from './components/question/Question';

const AppBar = (props: any) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
    />
)

const NewPatient = (props: RouteComponentProps) => <Questions />
const ListPatients = (props: RouteComponentProps) => <div>List Patients</div>

function App() {
  return (
    <Grommet theme={grommet}>
      <AppBar>A-WPTAS</AppBar>
      <Router>
        <Home path="/" />
        <NewPatient path="/newpatient" />
        <ListPatients path="/listpatients" />
      </Router>
      <Link to="/">Home</Link>
    </Grommet>
  );
}

export default App;
