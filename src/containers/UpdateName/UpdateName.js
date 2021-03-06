import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { updateDisplayName } from '../../actions'


const UpdateName = (props) => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    

    const updatename=(e)=>{
        e.preventDefault();
        dispatch(updateDisplayName(auth.uid, firstname, lastname))     
    }

    return(
        <Layout>
            <div className="updateNameContainer">
                <form onSubmit={updatename}>
                    <h3>Update Name</h3>

                    <div className="form-group">
                        <label>First Name</label>
                        <input name="firstname" type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" placeholder="New First name" />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input name="newname" type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" placeholder="New Last name" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Update Name</button> 
                </form>
            </div>
        </Layout>
    )
}

export default UpdateName;