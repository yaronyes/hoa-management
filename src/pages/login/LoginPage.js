import React, { useState, useEffect }  from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './LoginPage.css';
import { loginUser, clearErrors } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
import RoundedBtn from '../../components/rounded-button/RoundedBtn';

const LoginPage = ({ loginUser, auth, errors, clearErrors, onPageSelected }) => {
    const [showError, setShowError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => onPageSelected('login'), []);

    useEffect(() => {
        if(auth.isAuthenticated) {
            history.push('/')
        }               
    }, [auth])

    useEffect(() => {        
        if(errors.status === 400) {            
            setShowError(true);
            clearErrors();
        }        
    }, [errors]);

    const keyUp = event => {
        if(event.keyCode === 13) {
            loginUser({ email, password })
        }
    }

    const alertDialog = showError ? <MDBAlert color="danger">Invalid Credentials! Incorrect email or password</MDBAlert > : null;

    return (
    <div className="login">
        <MDBContainer>
            <MDBRow>
                <MDBCol md="5">
                <form>
                    <p className="h5 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                    <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                        success="right" value={email} onChange={e => {setEmail(e.target.value); setShowError(false)}}/>
                    <MDBInput label="Type your password" icon="lock" group type="password" validate value={password}
                     onChange={e => {setPassword(e.target.value); setShowError(false)}}
                     onKeyUp={keyUp}/>
                    </div>
                    <div>
                        {alertDialog}
                    </div>    
                    <div className="text-center">
                    {/* <MDBBtn>Login</MDBBtn> */}
                    <RoundedBtn color="primary" onClick={() => loginUser({ email, password })} icon="sign-in-alt" caption="Login"/>
                    </div>
                </form>                
                </MDBCol>
            </MDBRow>            
        </MDBContainer>
    </div>
    );
};

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    clearError: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
    
export default connect(mapStateToProps, { loginUser, clearErrors })(LoginPage);
