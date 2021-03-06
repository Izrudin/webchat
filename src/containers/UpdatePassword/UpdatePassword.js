import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { updateUserPassword } from '../../actions'

const UpdatePassword = (props) => {
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const updatePassword=(e)=>{
        e.preventDefault();
        dispatch(updateUserPassword(currentPassword, newPassword));
    }

    return(
        <Layout>
            <div className="updateProfileContainer">
                <form onSubmit={updatePassword}>
                    <h3>Update Password</h3>

                    <div className="form-group">
                        <label>Current Password</label>
                        <input name="currentpassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="form-control" placeholder="Current Password" />
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input name="newpassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" placeholder="New Password" />
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