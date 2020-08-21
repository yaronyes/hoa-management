import React, { useState } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import RoundedBtn from '../rounded-button/RoundedBtn';
import Options from '../option/Options';
import DateTimePicker from '../date-time/DateTimePicker';
import './AddUpdateVoting.css';

const AddUpdateVoting = ({ modal, toggle, votingToUpdate }) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [options, setOptions] = useState([]);

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
                                // group
                                value={details}
                                onChange={e => setDetails(e.target.value)}
                                />                            
                                <Options onOptionsChanged={(options) => {setOptions(options)}}/>    
                                <DateTimePicker />                                                                                                     
                            </div>                
                            </form>
                        </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <RoundedBtn color="secondary" onClick={toggle} icon="window-close" caption="Close"/>
                        <RoundedBtn color="primary" onClick={() => {}} icon="save" caption={votingToUpdate ? "Save changes" : "Create Voting"}/>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer> 
        </div>
    );
}; 

export default AddUpdateVoting;