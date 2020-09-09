import React, { useState, useEffect, useRef } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import './AddUpdateIssue.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createIssue, updateIssue } from "../../actions/issueActions";
import IssueModel from '../../models/IssueModel';
import RoundedBtn from '../buttons/RoundedBtn';
import DropDownSelect from '../select/DropDownSelect';
import LoadImage from '../load-image/LoadImage';
import ValidationError from "../validation-errors/ValidationError";
import config from '../../config/config.json';

// component for adding/updating issue
// Props:
// modal - boolean - indicate if the modal dialog is open
// toggle - function - function for opening/closing modal
// issueToUpdate - object - IssueModel. if it undefined, we are adding new issue. otherwise, updating
// redux connect props:
// createIssue, updateIssue: redux functions for add/update issue
const AddUpdateIssue = ({ modal, issueToUpdate, toggle, createIssue, updateIssue }) => {    
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [priority, setPriority] = useState("");
    const [image, setImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});    
    const formRef = useRef(null);
    
    useEffect(() => {
        if(modal) {
            setValidationErrors({
                title: false,
                details: false,
                priority: false,
            });
            
        setTitle(issueToUpdate ? issueToUpdate.title : "");
        setDetails(issueToUpdate ? issueToUpdate.details : "");
        setPriority(issueToUpdate ? issueToUpdate.priority : "");        
        }        
    }, [modal]);

    const addUpdate = () => {                       
        if(!formRef.current.className.includes("was-validated")) { 
            formRef.current.className += " was-validated";
        }
        
        const errors = validateInput();
        const numberOfErrors = Object.keys(errors).filter(key => errors[key] === true);
              
        if(numberOfErrors.length === 0) {
            if(issueToUpdate) {
                updIssue();
            } else {
                addIssue();
            }

            toggle();
        } else {
            setValidationErrors(errors);  
        }        
    };

    const validateInput = () => {
        return {
            title: title === "",
            details: details === "",
            priority: priority === ""
        }
    }

    const addIssue = () => {
        try{         
            const newIssue = new IssueModel( {
                title,
                details,
                priority            
            } );
            createIssue(newIssue, image);                        
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
                    
            updateIssue(updatedIssue, issueToUpdate._id, image);              
        } catch (e) {
            console.log(e)
            alert(e.message)
        }      
    };

    const fileCallback = img => setImage(img);
            
    const imageUrl = issueToUpdate && issueToUpdate.haveImage ? `${config.server_url}/issues/${issueToUpdate._id}/image?${new Date().getTime()}` : "";

    return (
        <div className="add-upd-issue">
            <MDBContainer>      
                <MDBModal isOpen={modal} toggle={toggle}>
                    <MDBModalHeader className='blue-gradient white-text' toggle={toggle}>{issueToUpdate ? "Update Issue" : "Create Issue"}</MDBModalHeader>
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
                                            label="Title"
                                            icon="text-height"                            
                                            type="text"
                                            required
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            />
                                            { validationErrors.title
                                            ? <ValidationError errorText="Please provide a valid Title."/>                                        
                                            : null}
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol>
                                            <MDBInput
                                            type="textarea"
                                            label="Details"
                                            rows="2"
                                            icon="pencil-alt"
                                            required
                                            value={details}
                                            onChange={e => setDetails(e.target.value)}
                                            />
                                            { validationErrors.details
                                            ? <ValidationError errorText="Please provide a valid Details."/>                                        
                                            : null}
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol>
                                            <DropDownSelect onChange={(priority) => setPriority(priority)} icon="exclamation" label="Priority" required
                                            dropDownItems={[
                                                {
                                                    value: "urgent",
                                                    name: "urgent"
                                                },
                                                {
                                                    value: "important",
                                                    name: "important"
                                                },
                                                {
                                                    value: "normal",
                                                    name: "normal"
                                                }
                                            ]}
                                            defaultValue={priority}/>
                                            { validationErrors.priority
                                            ? <ValidationError errorText="Please select a valid Priority."/>                                        
                                            : null}  
                                        </MDBCol>
                                    </MDBRow>                           
                                    <MDBRow>
                                        <MDBCol>
                                            <LoadImage fileCallback={fileCallback} imageUrl={imageUrl}/>
                                        </MDBCol>
                                    </MDBRow>                                                        
                                </div>                
                            </form>
                        </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
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
    issues: PropTypes.array.isRequired,
    createIssue: PropTypes.func.isRequired,
    updateIssue: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    errors: state.errors,
    issues: state.issue
  });
  
  export default connect(mapStateToProps, { createIssue, updateIssue })(AddUpdateIssue);
