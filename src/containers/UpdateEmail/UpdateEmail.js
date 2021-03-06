import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { updateUserEmail } from '../../actions';


const UpdateEmail = (props) => {
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
                        <input name="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="New Email" />
                    </div>
                    <div className="form-group">
                        <label>New Email</label>
                        <input name="newemail" type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="text" className="form-control" placeholder="New Email" />
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