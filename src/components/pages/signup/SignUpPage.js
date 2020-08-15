import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import "./SignUpPage.css";

const SignUoPage = () => {
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
                />
                <MDBInput
                  label="Email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Password"
                  icon="lock"
                  group
                  type="password"
                  validate
                />
                <MDBInput
                  label="Building/Condominium Community Name"
                  icon="home"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                 <MDBInput
                  label="Address"
                  icon="location-arrow"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                 <MDBInput
                  label="City"
                  icon="city"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
              </div>
              <div className="text-center">
                <MDBBtn color="primary">Register</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default SignUoPage;
