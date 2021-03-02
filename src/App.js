import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomePage from './containers/HomePage/HomePage.js'
import LoginPage from './containers/LoginPage/LoginPage.js';
import RegisterPage from './containers/RegisterPage/RegisterPage.js';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './containers/ProfilePage/ProfilePage.js';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInUser } from './actions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() { 

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    if(!auth.authenticated){
      dispatch(isLoggedInUser())
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {/* only logged in user can access this home route */}
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <PrivateRoute path="/profile"  component={ProfilePage} />
      </Router>
    </div>
  );
}

export default App;