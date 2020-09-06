import React, { useState, useEffect, useRef } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol } from "mdbreact";
import './AddUpdateMessage.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMessage, updateMessage } from "../../actions/messageActions";
import MessageModel from '../../models/MessageModel';
import RoundedBtn from '../rounded-button/RoundedBtn';
import DropDownSelect from '../select/DropDownSelect';
import LoadImage from '../load-image/LoadImage';
import ValidationError from "../validation-errors/ValidationError";
import config from '../../config/config.json';

const AddUpdateMessage = ({ modal, messageToUpdate, toggle, createMessage, updateMessage }) => {    
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
            
            setTitle(messageToUpdate ? messageToUpdate.title : "");
            setDetails(messageToUpdate ? messageToUpdate.details : "");
            setPriority(messageToUpdate ? messageToUpdate.priority : "");
        }        
    }, [modal]);
    
   const addUpdate = () => {
        if(!formRef.current.className.includes("was-validated")) { 
            formRef.current.className += " was-validated";
        }
        
        const errors = validateInput();
        console.log(errors)
        const numberOfErrors = Object.keys(errors).filter(key => errors[key] === true);
        console.log(numberOfErrors)
        if(numberOfErrors.length === 0) {
            if(messageToUpdate) {
                updMessage();
            } else {
                addMessage();
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

    const addMessage = () => {
        const newMessage = new MessageModel( {
            title,
            details,
            priority            
        } );
        createMessage(newMessage, image);    
    };

    const updMessage = () => {
        const updatedMessage = {
            title,
            details,
            priority            
        };

        const keys = Object.keys(updatedMessage);
        keys.forEach(key => {        
            if (messageToUpdate[key] === updatedMessage[key] || updatedMessage[key] === undefined || updatedMessage[key] === '') {
                delete updatedMessage[key];            
            }
        })
                
        updateMessage(updatedMessage, messageToUpdate._id, image); 
    };

    const fileCallback = img => setImage(img);

    const imageUrl = messageToUpdate && messageToUpdate.haveImage ? `${config.server_url}/messages/${messageToUpdate._id}/image?${new Date().getTime()}` : "";

    return (
        <div className="add-upd-message">
            <MDBContainer>      
                <MDBModal isOpen={modal} toggle={toggle} size="md">
                    <MDBModalHeader className='blue-gradient white-text' toggle={toggle}>{messageToUpdate ? "Update Message" : "Create Message"}</MDBModalHeader>
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
                                        <DropDownSelect onChange={(priority) => setPriority(priority)} icon="exclamation" label="Priority"
                                        dropDownItems={[
                                            {
                                                value: "important",
                                                name: "important"
                                            },
                                            {
                                                value: "info",
                                                name: "info"
                                            }
                                        ]}
                                        defaultValue={priority}
                                        required
                                        />
                                         { validationErrors.title
                                        ? <ValidationError errorText="Please provide a valid Priority."/>
                                        : null}                                                                             
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <LoadImage fileCallback={fileCallback} imageUrl={imageUrl} />                                     
                                    </MDBCol>
                                </MDBRow>                                                                                                                                                                                                                                        
                                </div> 
                            </form>
                        </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <RoundedBtn color="secondary" onClick={toggle} icon="window-close" caption="Close"/>
                        <RoundedBtn color="primary" onClick={addUpdate} icon="save" caption={messageToUpdate ? "Save changes" : "Create Message"}/>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>        
    );
};


AddUpdateMessage.propTypes = {
    errors: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    createMessage: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    errors: state.errors,
    messages: state.message,
  });
  
  export default connect(mapStateToProps, { createMessage, updateMessage })(AddUpdateMessage);
