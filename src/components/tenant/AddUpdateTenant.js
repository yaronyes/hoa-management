import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import './AddUpdateTenant.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTenantUser, updateTenantUser } from "../../actions/tenantActions";
import UserModel from '../../models/UserModel';


const AddUpdateTenant = ({ modal, selectedTenant, toggle, addTenantUser, updateTenantUser, tenant }) => {

    console.log(tenant)
    const [name, setName] = useState(selectedTenant ? selectedTenant.name : "");
    const [email, setEmail] = useState(selectedTenant ? selectedTenant.email : "");
    const [password, setPassword] = useState("");
    const [apartment, setApartment] = useState(selectedTenant ? selectedTenant.apartment : "");

    // useEffect(() => {
    //     toggle();
    // }, [tenant]);

   const addUpdate = () => {
    if(selectedTenant) {
        updateTenant();
    } else {
        addTenant();
    }
  };

  const addTenant = () => {
    try{         
        const user = new UserModel( {
            name: "tenant tenant",
            email: "tenant1@test.com",
            password: "Test1234$",
            apartment: 3
         } );
         addTenantUser(user);                        
    } catch (e) {
        console.log(e)
        alert(e.message)
    }      
 };

const updateTenant = () => {
    try{         
        const updatedUser = {
            name,
            email,
            password,
            apartment
        };

        const keys = Object.keys(updatedUser);
        keys.forEach(key => {        
            if (selectedTenant[key] === updatedUser[key] || updatedUser[key] === undefined || updatedUser[key] === '') {
            delete updatedUser[key];            
            }
        })
                
        //const user = new UserModel(updatedUser);
        //console.log(user);
        updateTenantUser(updatedUser, selectedTenant._id);      
        toggle()                          ;
    } catch (e) {
        console.log(e)
        alert(e.message)
    }      
 };

  return (
      <div className="add-upd-tenant">
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
                            icon="building"
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
                <MDBBtn color="primary" onClick={addUpdate}>Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
      </div>
    
  );
};


AddUpdateTenant.propTypes = {
    errors: PropTypes.object.isRequired,
    tenant: PropTypes.array.isRequired,
    addTenantUser: PropTypes.func.isRequired,
    updateTenantUser: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    errors: state.errors,
    tenant: state.tenant,
  });
  
  export default connect(mapStateToProps, { addTenantUser, updateTenantUser })(
    AddUpdateTenant
  );
