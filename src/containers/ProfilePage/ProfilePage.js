import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profilepage.css';
import { Link } from 'react-router-dom';
import Layout from "../../components/Layout/Layout.jsx"
import { handleUpload } from '../../actions/user.actions';

const ProfilePage = () => {
    const auth = useSelector(state => state.auth);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const uploadPic =(e) =>{
        e.preventDefault();
        dispatch(handleUpload(auth.uid, file));
    }

    return (
        <Layout>
            <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                    <div className="card user-card-full">
                        <div className="row m-l-0 m-r-0">
                            <div className="col-sm-4 bg-c-lite-green user-profile">
                                <div className="card-block text-center text-white">
                                    <h6 className="f-w-600">{auth.firstName} {auth.lastName}</h6>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="card-block">
                                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">First Name</p>
                                            <p className="text-muted f-w-400" id="firstname">{auth.firstName}</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Last Name</p>
                                            <p className="text-muted f-w-400" id="lastname">{auth.lastName}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">Email</p>
                                            <h6 className="text-muted f-w-400">{auth.email}</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600">User ID</p>
                                            <h6 className="text-muted f-w-400">{auth.uid}</h6>
                                        </div>
                                        <div>
                                            
                                        </div>
                                            <img src={auth.image} alt="" className="profile-image"/>
                                            <input type="file" id="imageInput" onChange={(e)=> setFile(e.target.files[0])}/>
                                            <button className="btn btn-primary btn-block" onClick={uploadPic}>Upload</button>
                                        </div>
                                    <div className='profilepageButtons'>
                                    <Link to="/updatepassword">
                                        <button className="btn btn-primary btn-block"> 
                                            Update Password
                                        </button>
                                    </Link>
                                    <Link to="/updatemail">
                                        <button className="btn btn-primary btn-block">
                                            Update Email
                                        </button>
                                    </Link>
                                    <Link to="/updatename">
                                        <button className="btn btn-primary btn-block">
                                            Update Name
                                        </button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
</Layout>
        
        
    )
}
export default ProfilePage;

