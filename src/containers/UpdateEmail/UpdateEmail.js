import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { updateUserEmail } from '../../actions';
import './updateemail.css';


const UpdateEmail = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const updateEmail=(e)=>{
        e.preventDefault();
        const pass = password;
        const email = newEmail;
        dispatch(updateUserEmail(pass,email));
    }

    return(
        <Layout>
            <form onSubmit={updateEmail}>
                <div className="updateEmailContainer">
                    <h3>Update Email</h3>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="New Email" />
                    </div>
                    <div className="form-group">
                        <label>New Email</label>
                        <input name="newemail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="text" className="form-control" placeholder="New Email" />
                    </div>
                    <button  type="submit" className="btn btn-primary btn-block">
                        Update Email
                    </button> 
                </div>
            </form>
        </Layout>
    )
}

export default UpdateEmail;