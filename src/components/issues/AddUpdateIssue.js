import React, { useState, useEffect } from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import './AddUpdateTenant.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createIssue, updateIssue } from "../../actions/issueActions";
import IssueModel from '../../models/IssueModel';
import RoundedBtn from '../rounded-button/RoundedBtn';

const AddUpdateIssue = ({ modal, issueToUpdate, toggle, createIssue, updateIssue }) => {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [password, setPassword] = useState("");
    const [apartment, setApartment] = useState("");

    // useEffect(() => {
    //     toggle();
    // }, [tenant]);
    //console.log(issueToUpdate)
        
    useEffect(() => {
        setTitle(issueToUpdate ? issueToUpdate.name : "");
        setDetails(issueToUpdate ? issueToUpdate.email : "");
        setApartment(issueToUpdate ? issueToUpdate.apartment : "");
    }, [issueToUpdate]);

   const addUpdate = () => {
    if(issueToUpdate) {
        updIssue();
    } else {
        addIssue();
    }
    toggle();
  };

  const addIssue = () => {
    try{         
        const newIssue = new IssueModel( {
            title,
            details,
            password,
            apartment
         } );
         createIssue(newIssue);                        
    } catch (e) {
        console.log(e)
        alert(e.message)
    }      
 };

const updIssue = () => {
    try{         
        const updatedIssue = {
            title,
            details,
            password,
            apartment
        };

        const keys = Object.keys(updatedIssue);
        keys.forEach(key => {        
            if (issueToUpdate[key] === updatedIssue[key] || updatedIssue[key] === undefined || updatedIssue[key] === '') {
            delete updatedIssue[key];            
            }
        })
                
        updateIssue(updatedIssue, issueToUpdate._id);              
    } catch (e) {
        console.log(e)
        alert(e.message)
    }      
 };

  return (
      <div className="add-upd-tenant">
        <MDBContainer>      
            <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}>{issueToUpdate ? "Update Tenant" : "Create Tenant"}</MDBModalHeader>
                <MDBModalBody>
                <MDBRow>
                    <MDBCol md="9">
                        <form>
                        <div className="grey-text">
                            <MDBInput
                            label="Title"
                            icon="envelope-open-text"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"                  
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            />
                            <MDBInput
                            label="Details"
                            icon="envelope"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            value={details}
                            onChange={e => setDetails(e.target.value)}
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
                <RoundedBtn color="primary" onClick={addUpdate} icon="save" caption={issueToUpdate ? "Save changes" : "Create Tenant"}/>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
      </div>
    
  );
};


AddUpdateIssue.propTypes = {
    errors: PropTypes.object.isRequired,
    issue: PropTypes.array.isRequired,
    createIssue: PropTypes.func.isRequired,
    updateIssue: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    errors: state.errors,
    tenant: state.tenant,
  });
  
  export default connect(mapStateToProps, { createIssue, updateIssue })(AddUpdateIssue);
