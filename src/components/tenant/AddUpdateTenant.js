import React, { useState, useEffect, useRef } from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import './AddUpdateTenant.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTenantUser, updateTenantUser } from "../../actions/tenantActions";
import UserModel from '../../models/UserModel';
import RoundedBtn from '../rounded-button/RoundedBtn';

const AddUpdateTenant = ({ modal, tenantToUpdate, toggle, addTenantUser, updateTenantUser, tenant }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [apartment, setApartment] = useState("");
    const [validationErrors, setValidationErrors] = useState({});    
    const formRef = useRef(null);

    useEffect(() => {
        setValidationErrors({
            name: false,
            email: false,
            password: false,
            apartment: false
        });
    }, [modal]);
    
    useEffect(() => {
        setName(tenantToUpdate ? tenantToUpdate.name : "");
        setEmail(tenantToUpdate ? tenantToUpdate.email : "");
        setApartment(tenantToUpdate ? tenantToUpdate.apartment : "");
    }, [tenantToUpdate]);

    const addUpdate = () => {                       
        if(!validateInput()) {            
            if(!formRef.current.className.includes("was-validated")) { 
                formRef.current.className += " was-validated";
            }
            return;
        }
       
    // if(tenantToUpdate) {
    //     updateTenant();
    // } else {
    //     addTenant();
    // }
    // toggle();
    };

    const validateInput = () => {
        const emailPattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;        
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/g

        setValidationErrors({
            name: name === "",
            email: !emailPattern.test(email),
            password: !passwordPattern.test(password),
            apartment: apartment === ""
        })

        return (name !== "" && apartment !== "" && emailPattern.test(email) && passwordPattern.test(password)); 
    }

    const addTenant = () => {
        const user = new UserModel( {
            name,
            email,
            password,
            apartment
        } );
        addTenantUser(user);    
    };

    const updateTenant = () => {
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
    };

    return (
      <div className="add-upd-tenant">
        <MDBContainer>      
            <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}>{tenantToUpdate ? "Update Tenant" : "Create Tenant"}</MDBModalHeader>
                <MDBModalBody>
                <MDBRow>
                    <MDBCol md="10">
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
                                        className="test"
                                        />                                        
                                        { validationErrors.name
                                        ? <div className={"invalid-error"}>
                                            Please provide a valid Name.
                                        </div>
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
                                        ? <div className="invalid-error">
                                            Please provide a valid Email.
                                        </div>
                                        : null}
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput
                                        label="Password"
                                        icon="lock"
                                        required
                                        type="password"                                
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$"
                                        />
                                        { validationErrors.password
                                        ? <div className="invalid-error">
                                            Password must be between eight to twelve characters, at least one uppercase letter, one lowercase letter and one number.
                                        </div>
                                        : null }
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput
                                        label="Apartment"
                                        icon="building"
                                        required
                                        type="number"                                
                                        value={apartment}
                                        onChange={e => setApartment(e.target.value)}
                                        />
                                        { validationErrors.apartment
                                          ?<div className="invalid-error">
                                            Please provide a valid Apartment number.
                                        </div>
                                        : null}
                                    </MDBCol>
                                </MDBRow>                                                                                                                                                     
                            </div>                
                        </form>
                    </MDBCol>
                    </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>               
                <RoundedBtn color="secondary" onClick={toggle} icon="window-close" caption="Close"/>
                <RoundedBtn color="primary" onClick={addUpdate} icon="save" caption={tenantToUpdate ? "Save changes" : "Create Tenant"}/>
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
