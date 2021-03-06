import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { updateUserPassword } from '../../actions';
import './updatepassword.css';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const updatePassword=(e)=>{
        e.preventDefault();
        dispatch(updateUserPassword(currentPassword, newPassword));
    }

    return(
        <Layout>
            <div className="updatePasswordContainer">
                <form onSubmit={updatePassword}>
                    <h3>Update Password</h3>

                    <div className="form-group">
                        <label>Current Password</label>
                        <input name="currentpassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="form-control" placeholder="Current Password" />
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input name="newpassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" placeholder="New Password" />
                    </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Update Password
                        </button> 
                </form>
            </div>
        </Layout>
    )
}

export default UpdatePassword;