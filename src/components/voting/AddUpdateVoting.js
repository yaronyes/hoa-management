import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import RoundedBtn from '../rounded-button/RoundedBtn';
import Options from '../option/Options';
import DateTimePicker from '../date-time/DateTimePicker';
import './AddUpdateVoting.css';
import { createVoting, updateVoting } from '../../actions/votingActions';
import VotingModel from '../../models/VotingModel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

const AddUpdateVoting = ({ modal, toggle, votingToUpdate, createVoting, updateVoting }) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [voteOptions, setVoteOptions] = useState([]);
    const [dueDate, setDueDate] = useState(dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM"));

    useEffect(() => {
        setTitle(votingToUpdate ? votingToUpdate.title : "");
        setDetails(votingToUpdate ? votingToUpdate.details : "");
        setVoteOptions(votingToUpdate ? votingToUpdate.voteOptions : []);
        setDueDate(votingToUpdate ? votingToUpdate.dueDate : dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM"));
    }, [votingToUpdate]);

    const addUpdate = () => {
        if(votingToUpdate) {
            updVoting();
        } else {
            addVoting();
        }
        toggle();
      };
    
        const addVoting = () => {
            try{         
                const newVoting = new VotingModel( {
                    title,
                    details,
                    voteOptions,
                    dueDate  
                } );                
                createVoting(newVoting);                        
            } catch (e) {
                console.log(e)
                alert(e.message)
            }      
        };
    
        const updVoting = () => {
            try{         
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
            } catch (e) {
                console.log(e)
                alert(e.message)
            }      
        };

        const endVoting = () => {
            setDueDate(dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM"));
            updVoting();
        }

    return (
        <div className="add-voting">
           <MDBContainer>      
                <MDBModal isOpen={modal} toggle={toggle}>
                    <MDBModalHeader toggle={toggle}>{votingToUpdate ? "Update Voting" : "Create Voting"}</MDBModalHeader>
                    <MDBModalBody>
                    <MDBRow>
                        <MDBCol md="11">
                            <form>
                            <div className="grey-text">
                                { !votingToUpdate
                                ? <div>
                                    <MDBInput
                                    label="Title"
                                    icon="text-height"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"                  
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    />
                                    <MDBInput
                                    type="textarea"
                                    label="Details"
                                    rows="4"
                                    icon="pencil-alt"
                                    value={details}
                                    onChange={e => setDetails(e.target.value)}
                                    />                            
                                    <Options onOptionsChanged={(options) => {setVoteOptions(options)}} value={voteOptions} />    
                                </div> 
                                : null}
                                <div className="date-time">
                                    <DateTimePicker onDateTimeChanged={(dateTime) => setDueDate(dateTime)} />
                                    { votingToUpdate 
                                    ? <RoundedBtn color="danger" onClick={endVoting} icon="calendar-check" caption="End Voting" size="sm"/>
                                    : null}
                                </div>
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
