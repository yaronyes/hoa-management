import React, { useState, useEffect, useRef } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import './AddUpdateTenant.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTenantUser, updateTenantUser } from "../../actions/tenantActions";
import UserModel from '../../models/UserModel';
import RoundedBtn from '../buttons/RoundedBtn';
import ValidationError from "../validation-errors/ValidationError";

// component for adding/updating tenant
// Props:
// modal - boolean - indicate if the modal dialog is open
// toggle - function - function for opening/closing modal
// tenantToUpdate - object - UserModel. if it undefined, we are adding new tenant. otherwise, updating
// redux connect props:
// addTenantUser, updateTenantUser: redux functions for add/update tenant
const AddUpdateTenant = ({ modal, tenantToUpdate, toggle, addTenantUser, updateTenantUser }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [apartment, setApartment] = useState("");
    const [validationErrors, setValidationErrors] = useState({});    
    const formRef = useRef(null);

    useEffect(() => {
        if(modal) {
            setValidationErrors({
                name: false,
                email: false,
                password: false,
                apartment: false
            });
            
            setName(tenantToUpdate ? tenantToUpdate.name : "");
            setEmail(tenantToUpdate ? tenantToUpdate.email : "");
            setApartment(tenantToUpdate ? tenantToUpdate.apartment : "");
            setPassword("");
        }        
    }, [modal]);
       
    const addUpdate = () => {                       
        if(!formRef.current.className.includes("was-validated")) { 
            formRef.current.className += " was-validated";
        }
        
        const errors = validateInput();
        const numberOfErrors = Object.keys(errors).filter(key => errors[key] === true);
              
        if(numberOfErrors.length === 0) {
            if(tenantToUpdate) {
                updateTenant();
            } else {
                addTenant();
            }

            toggle();
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
            password: tenantToUpdate ? false : (!passwordPattern.test(password)),
            apartment: apartment === ""
        }
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
                <MDBModalHeader className='blue-gradient white-text' toggle={toggle}>{tenantToUpdate ? "Update Tenant" : "Create Tenant"}</MDBModalHeader>
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
                                        required
                                        type="password"                                
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$"
                                        />
                                        { validationErrors.password
                                        ? <ValidationError errorText="Password must be between eight to twelve characters, at least one uppercase letter, one lowercase letter and one number."/>                                        
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
                                        ? <ValidationError errorText="Please provide a valid Apartment number."/>                                          
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
