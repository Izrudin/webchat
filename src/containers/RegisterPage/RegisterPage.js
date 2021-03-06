import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { signup } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './registerpage.css';


/**
* @author
* @function RegisterPage
**/

const RegisterPage = () => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);


  const registerUser = (e) => {
    
    e.preventDefault();

    const user = {
      firstName, lastName, email, password
    }
    
    dispatch(signup(user))
  }

  if(auth.authenticated){
    return <Redirect to={`/`} />
  }

  return(
    <Layout>
      <div className="registerContainer">
        <form onSubmit={registerUser}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
      </div>
    </Layout>
   )
 }

export default RegisterPage