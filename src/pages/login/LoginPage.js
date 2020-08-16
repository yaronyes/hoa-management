import React, { useState, useEffect }  from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './LoginPage.css';
import { loginUser } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
import RoundedBtn from '../../components/rounded-button/RoundedBtn';

const LoginPage = ({loginUser, auth}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        if(auth.isAuthenticated) {
            history.push('/')
        }                
    }, [auth])

    return (
    <div className="login">
        <MDBContainer>
            <MDBRow>
                <MDBCol md="5">
                <form>
                    <p className="h5 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                    <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                        success="right" value={email} onChange={e => setEmail(e.target.value)}/>
                    <MDBInput label="Type your password" icon="lock" group type="password" validate value={password} onChange={e => setPassword(e.target.value)}/>
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
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(mapStateToProps, { loginUser })(LoginPage);
