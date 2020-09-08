import React, { useState, useEffect, useRef } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import RoundedBtn from '../buttons/RoundedBtn';
import Options from '../option/Options';
import DateTimePicker from '../date-time/DateTimePicker';
import './AddUpdateVoting.css';
import { createVoting, updateVoting } from '../../actions/votingActions';
import VotingModel from '../../models/VotingModel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import ValidationError from '../validation-errors/ValidationError';

const AddUpdateVoting = ({ modal, toggle, votingToUpdate, createVoting, updateVoting }) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [voteOptions, setVoteOptions] = useState([]);
    const [dueDate, setDueDate] = useState(dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM"));
    const [validationErrors, setValidationErrors] = useState({});    
    const formRef = useRef(null);

    useEffect(() => {
        if(modal) {
            setValidationErrors({
                title: false,
                details: false,
                voteOptions: false,
                dueDate: false
            });
            
            setTitle(votingToUpdate ? votingToUpdate.title : "");
            setDetails(votingToUpdate ? votingToUpdate.details : "");
            setVoteOptions(votingToUpdate ? votingToUpdate.voteOptions : []);
            setDueDate(votingToUpdate ? votingToUpdate.dueDate : dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM"));
        }        
    }, [modal]);

    const addUpdate = () => {                       
        if(!formRef.current.className.includes("was-validated")) { 
            formRef.current.className += " was-validated";
        }
        
        const errors = validateInput();
        const numberOfErrors = Object.keys(errors).filter(key => errors[key] === true);
              
        if(numberOfErrors.length === 0) {
            if(votingToUpdate) {
                updVoting();
            } else {
                addVoting();
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
            voteOptions: (voteOptions.filter(option => option.value === "").length > 0) || voteOptions.length === 0,
            dueDate: new Date() >= new Date(dueDate)
        }
    }
            
    const addVoting = () => {
        const newVoting = new VotingModel( {
            title,
            details,
            voteOptions,
            dueDate  
        } );                
        createVoting(newVoting);      
    };

    const updVoting = () => {
        const updatedVoting = {
            title,
            details,
            voteOptions,
            dueDate             
        };

        const keys = Object.keys(updatedVoting);
        keys.forEach(key => {        
            if (votingToUpdate[key] === updatedVoting[key] || updatedVoting[key] === undefined || updatedVoting[key] === '') {
                delete updatedVoting[key];            
            }
        })
        
        updateVoting(updatedVoting, votingToUpdate._id);      
    };

    const endVoting = () => {
        updateVoting({ dueDate: dateFormat(new Date(), "UTC:yyyy-mm-dd'T'HH:MM") }, votingToUpdate._id); 
        toggle();    
    }

    return (
        <div className="add-voting">
           <MDBContainer>      
                <MDBModal isOpen={modal} toggle={toggle}>
                    <MDBModalHeader className='blue-gradient white-text' toggle={toggle}>{votingToUpdate ? "Update Voting" : "Create Voting"}</MDBModalHeader>
                    <MDBModalBody>
                    <MDBRow>
                        <MDBCol md="11">
                            <form ref={formRef}
                                className="needs-validation"                       
                                > 
                                <div className="grey-text">
                                    { !votingToUpdate
                                    ? <div>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput
                                                label="Title"
                                                icon="text-height"                                                
                                                type="text"
                                                required
                                                error="wrong"
                                                success="right"                  
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
                                                value={details}
                                                onChange={e => setDetails(e.target.value)}
                                                required
                                                />
                                                { validationErrors.details
                                                ? <ValidationError errorText="Please provide a valid Details."/>                                        
                                                : null}
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <Options onOptionsChanged={(options) => {setVoteOptions(options)}} value={voteOptions} required/>
                                                { validationErrors.voteOptions
                                                ? <ValidationError errorText="Please provide a valid Vote Options."/>                                        
                                                : null}    
                                            </MDBCol>
                                        </MDBRow>                                                                                                            
                                    </div> 
                                    : null}
                                        <MDBRow>
                                            <MDBCol>
                                                <div className="date-time">
                                                    <DateTimePicker onDateTimeChanged={(dateTime) => setDueDate(dateTime)} value={dueDate} required/>
                                                    
                                                    { votingToUpdate 
                                                    ? <RoundedBtn color="danger" onClick={endVoting} icon="calendar-check" caption="End Voting" size="sm"/>
                                                    : null}
                                                </div>
                                                { validationErrors.dueDate
                                                    ? <ValidationError errorText="Please provide a valid Due Date."/>                                        
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
                        {<RoundedBtn color="primary" onClick={addUpdate} icon="save" caption={votingToUpdate ? "Save changes" : "Create Voting"}/>}
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer> 
        </div>
    );
}; 


AddUpdateVoting.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    createVoting: PropTypes.func.isRequired,
    updateVoting: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    votes: state.voting
});

export default connect(mapStateToProps, { createVoting, updateVoting })(AddUpdateVoting);
