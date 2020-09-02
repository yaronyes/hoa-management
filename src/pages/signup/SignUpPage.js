import React, { useState, useEffect, useRef } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "./SignUpPage.css";
import UserModel from '../../models/UserModel';
import { createUser } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import ValidationError from "../../components/validation-errors/ValidationError";

const SignUpPage = ({ createUser, auth, onPageSelected }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buildingCommunityName, setBuildingCommunityName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [validationErrors, setValidationErrors] = useState({});    
    const formRef = useRef(null);
    const history = useHistory();
  
    useEffect(() => {
        if(auth.isAuthenticated) {
            history.push('/');
        }                
    }, [auth]);

    useEffect(() => {
        setValidationErrors({
            name: false,
            email: false,
            password: false,
            buildingCommunityName: false,
            address: false,
            city: false
        });
        
        onPageSelected('signup');
        
    }, []);

    const addUser = () => {
        if(!formRef.current.className.includes("was-validated")) { 
            formRef.current.className += " was-validated";
        }

        const errors = validateInput();
        const numberOfErrors = Object.keys(errors).filter(key => errors[key] === true);
        
        if(numberOfErrors.length === 0) {        
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
        } else {
            setValidationErrors(errors); 
        }       
    };

    const validateInput = () => {
        const emailPattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;        
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/g
   
        return {
            name: name === "",
            email: !emailPattern.test(email),
            password: !passwordPattern.test(password),            
            buildingCommunityName: buildingCommunityName === "",
            address: address === "",
            city: city === ""
        }
    }

    const keyUp = event => {
        if(event.keyCode === 13) {
            addUser();
        }
    }

    return (
        <div className="sign-up">
        <MDBContainer>
            <MDBRow>
            <MDBCol md="6">
                <form ref={formRef}
                className="needs-validation"                       
                >
                    <div className="grey-text">
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                label="Name"
                                icon="user"
                                type="text"
                                required                  
                                value={name}
                                onChange={e => setName(e.target.value)}
                                />
                                { validationErrors.name
                                ? <ValidationError errorText="Please provide a valid Name."/>                                        
                                : null}
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                label="Email"
                                icon="envelope"                            
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />                            
                                { validationErrors.email
                                ? <ValidationError errorText="Please provide a valid Email."/>                                        
                                : null}
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                label="Password"
                                icon="lock"
                                type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                                { validationErrors.password
                                ? <ValidationError errorText="Password must be between eight to twelve characters, at least one uppercase letter, one lowercase letter and one number."/>                                        
                                : null }
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                label="Building/Condominium Community Name"
                                icon="home"
                                type="text"
                                required
                                value={buildingCommunityName}
                                onChange={e => setBuildingCommunityName(e.target.value)}
                                />
                                { validationErrors.buildingCommunityName
                                ? <ValidationError errorText="Please provide a valid Building/Condominium Community Name."/>                                          
                                : null} 
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                            <MDBInput
                                label="Address"
                                icon="location-arrow"
                                required
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                />
                                { validationErrors.address
                                ? <ValidationError errorText="Please provide a valid Address."/>                                          
                                : null}
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                label="City"
                                icon="city"
                                required
                                type="text"                            
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                onKeyUp={keyUp}
                                />
                                { validationErrors.city
                                ? <ValidationError errorText="Please provide a valid City."/>                                          
                                : null}
                                </MDBCol>
                        </MDBRow>
                    <p className="h5 text-center mb-4">Sign up</p>               
                    <div className="text-center">
                        {/* <MDBBtn color="primary" onClick={addUser}>Register</MDBBtn> */}
                        <RoundedBtn color="primary" onClick={addUser} icon="user-plus" caption="Register"/>
                    </div>
                </div>
                </form>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
  );
};


SignUpPage.propTypes = {
    createUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(mapStateToProps, { createUser })(SignUpPage);

