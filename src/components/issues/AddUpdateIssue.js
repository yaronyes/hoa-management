import React, { useState, useEffect } from "react";
import { MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import './AddUpdateIssue.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createIssue, updateIssue } from "../../actions/issueActions";
import IssueModel from '../../models/IssueModel';
import RoundedBtn from '../rounded-button/RoundedBtn';
import DropDownSelect from '../select/DropDownSelect';
import { Grid, TextField } from '@material-ui/core';
//import AccountCircle from '@material-ui/icons/AccountCircle';

const AddUpdateIssue = ({ modal, issueToUpdate, toggle, createIssue, updateIssue }) => {    
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [priority, setPriority] = useState("");

    // useEffect(() => {
    //     toggle();
    // }, [tenant]);
    //console.log(issueToUpdate)
        
    useEffect(() => {
        setTitle(issueToUpdate ? issueToUpdate.title : "");
        setDetails(issueToUpdate ? issueToUpdate.details : "");
        setPriority(issueToUpdate ? issueToUpdate.priority : "");
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
            priority            
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
            priority            
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
                <MDBModalHeader toggle={toggle}>{issueToUpdate ? "Update Issue" : "Create Issue"}</MDBModalHeader>
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
                            <DropDownSelect onChange={(priority) => setPriority(priority)} icon="exclamation" label="priority"/>                                                                                   
                            {/* <OutlinedInput type="file"/> */}
                            <div >
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            {/* <AccountCircle /> */}
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" type="file"/>
          </Grid>
        </Grid>
      </div>
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
                <RoundedBtn color="primary" onClick={addUpdate} icon="save" caption={issueToUpdate ? "Save changes" : "Create Issue"}/>
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
