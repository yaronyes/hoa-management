import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import './AddUpdateTenant.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTenantUser, updateTenantUser } from "../../actions/tenantActions";
import UserModel from '../../models/UserModel';
import RoundedBtn from '../rounded-button/RoundedBtn';

const AddUpdateTenant = ({ modal, tenantToUpdate, toggle, addTenantUser, updateTenantUser, tenant }) => {

    const [name, setName] = useState(tenantToUpdate ? tenantToUpdate.name : "");
    const [email, setEmail] = useState(tenantToUpdate ? tenantToUpdate.email : "");
    const [password, setPassword] = useState("");
    const [apartment, setApartment] = useState(tenantToUpdate ? tenantToUpdate.apartment : "");

    // useEffect(() => {
    //     toggle();
    // }, [tenant]);

   const addUpdate = () => {
    if(tenantToUpdate) {
        updateTenant();
    } else {
        addTenant();
    }
    toggle();
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
            if (tenantToUpdate[key] === updatedUser[key] || updatedUser[key] === undefined || updatedUser[key] === '') {
            delete updatedUser[key];            
            }
        })
                
        updateTenantUser(updatedUser, tenantToUpdate._id);              
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
                {/* <MDBBtn color="secondary" onClick={toggle}>
                    Close
                </MDBBtn> */}
                {/* <MDBBtn color="primary" onClick={addUpdate}>Save changes</MDBBtn> */}
                <RoundedBtn color="secondary" onClick={toggle} icon="window-close" caption="Close"/>
                <RoundedBtn color="primary" onClick={addUpdate} icon="save" caption="Save changes"/>
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
