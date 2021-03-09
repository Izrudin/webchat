import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import { signin } from '../../actions';
import './loginpage.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function LoginPage
**/

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const userLogin = (e) => {
    e.preventDefault();

    if(email === ""){
      alert("Email is required");
      return;
    }
    if(password === ""){
      alert("Password is required");
      return;
    }

    dispatch(signin({ email, password }));
  }

  if(auth.authenticated){
    return <Redirect to={`/`} />
  }
  return(
    <Layout>
      <div className="loginContainer">
        <form onSubmit={userLogin}>
                <h3>Sign in</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Log In</button>
                <div>
                  <p>No Account? <a href="/signup">Sign up</a> and start chatting!</p>
                </div>
            </form>
      </div>
    </Layout>
   )
 }

export default LoginPage