import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux'; 
import {LocalNotifications} from '@capacitor/local-notifications';

const store = configureStore();



/* this gives many warnings...
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/

/* ask to be allowed to make notifications */
LocalNotifications.requestPermissions();

ReactDOM.render(
  <Provider store={store}>
   <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
