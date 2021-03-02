import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store/Store.js';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeX-xcz7Lj9mH8U9Lr5K6snn-73XGkAPY",
  authDomain: "react-chatapp-e12ff.firebaseapp.com",
  databaseURL: "https://react-chatapp-e12ff-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-chatapp-e12ff",
  storageBucket: "react-chatapp-e12ff.appspot.com",
  messagingSenderId: "781804304637",
  appId: "1:781804304637:web:5accdecd6a1d258c84a694",
  measurementId: "G-Y8NJ4PN0M2"
};


firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
