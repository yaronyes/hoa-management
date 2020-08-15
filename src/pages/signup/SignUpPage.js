import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "./SignUpPage.css";
import UserModel from '../../models/UserModel';
import { createUser } from '../../actions/authActions';
import { useHistory } from "react-router-dom";

const SignUoPage = ({ createUser, auth }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buildingCommunityName, setBuildingCommunityName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const history = useHistory();
  
    useEffect(() => {
        history.push('/')
    }, [auth])

    const addUser = () => {
        try{         
            const user = new UserModel( {
                name,
	            email,
                password,
                committee: {
                    buildingCommunityName,
                    address,
                    city
                }                
             } );
            createUser(user);                        
        } catch (e) {
            console.log(e)
            alert(e.message)
        }      
    };

    return (
        <div className="sign-up">
        <MDBContainer>
            <MDBRow>
            <MDBCol md="6">
                <form>
                <p className="h5 text-center mb-4">Sign up</p>
                <div className="grey-text">
                    <MDBInput
                    label="Name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"                  
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <MDBInput
                    label="Email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <MDBInput
                    label="Password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <MDBInput
                    label="Building/Condominium Community Name"
                    icon="home"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={buildingCommunityName}
                    onChange={e => setBuildingCommunityName(e.target.value)}
                    />
                    <MDBInput
                    label="Address"
                    icon="location-arrow"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    />
                    <MDBInput
                    label="City"
                    icon="city"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <MDBBtn color="primary" onClick={addUser}>Register</MDBBtn>
                </div>
                </form>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
  );
};


SignUoPage.propTypes = {
    createUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(mapStateToProps, { createUser })(SignUoPage);

