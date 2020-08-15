import React, { useState } from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";

const AddUpdateTenant = ({ modal, tenant, toggle }) => {
  const addTenant = tenant ? false : true;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apartment, setApartment] = useState("");
  //const history = useHistory();


  return (
    <MDBContainer>      
      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
        <MDBRow>
            <MDBCol md="6">
                <form>
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
                    label="Apartment"
                    icon="city"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={apartment}
                    onChange={e => setApartment(e.target.value)}
                    />
                </div>                
                </form>
            </MDBCol>
            </MDBRow>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};


export default AddUpdateTenant;