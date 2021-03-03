import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './profilepage.css';
import { NavLink, Link } from 'react-router-dom';

const ProfilePage = (props) => {
    const auth = useSelector(state => state.auth);
    const {user, onClick} = props;

    return (
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
                                        <h6 className="text-muted f-w-400">{auth.firstName}</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Last Name</p>
                                        <h6 className="text-muted f-w-400">{auth.lastName}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Email</p>
                                        <h6 className="text-muted f-w-400">{auth.email}</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Date Created</p>
                                        <h6 className="text-muted f-w-400">{auth.createdAt}</h6>
                                    </div>
                                </div>
                                <Link to="/">
                <button>Back</button>
            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


        /* <div style={{margin: '20px 0', color: 'black', fontWeight: 'bold'}}>
            <h1>Profile Page</h1>
            <h1>First Name - {auth.firstName}</h1>
            <h1>Last Name - {auth.lastName}</h1>
            <h1>Email - {auth.email}</h1>
            <Link to="/">
                <button>Back</button>
            </Link>
            {/* {auth.authenticated ? `${auth.firstName} ${auth.lastName}` : ''} */
        

        
    )
}
export default ProfilePage;