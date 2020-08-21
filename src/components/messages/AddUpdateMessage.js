import React, { useState, useEffect } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBInput, MDBCol  } from "mdbreact";
import './AddUpdateMessage.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMessage, updateMessage } from "../../actions/messageActions";
import MessageModel from '../../models/MessageModel';
import RoundedBtn from '../rounded-button/RoundedBtn';
import DropDownSelect from '../select/DropDownSelect';
import LoadImage from '../load-image/LoadImage';

const AddUpdateMessage = ({ modal, messageToUpdate, toggle, createMessage, updateMessage }) => {    
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [priority, setPriority] = useState("");
    const [image, setImage] = useState();
    
    useEffect(() => {
        setTitle(messageToUpdate ? messageToUpdate.title : "");
        setDetails(messageToUpdate ? messageToUpdate.details : "");
        setPriority(messageToUpdate ? messageToUpdate.priority : "");
    }, [messageToUpdate]);

   const addUpdate = () => {
    if(messageToUpdate) {
        updMessage();
    } else {
        addMessage();
    }
    toggle();
  };

    const addMessage = () => {
        try{         
            const newMessage = new MessageModel( {
                title,
                details,
                priority            
            } );
            createMessage(newMessage, image);                        
        } catch (e) {
            console.log(e)
            alert(e.message)
        }      
    };

    const updMessage = () => {
        try{         
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
                    
            updateMessage(updatedMessage, messageToUpdate._id);              
        } catch (e) {
            console.log(e)
            alert(e.message)
        }      
    };

    const fileCallback = img => setImage(img);
            

  return (
      <div className="add-upd-tenant">
        <MDBContainer>      
            <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}>{messageToUpdate ? "Update Message" : "Create Message"}</MDBModalHeader>
                <MDBModalBody>
                <MDBRow>
                    <MDBCol md="9">
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
                            <DropDownSelect onChange={(priority) => setPriority(priority)} icon="exclamation" label="priority"
                            dropDownItems={[
                                {
                                    value: "important",
                                    name: "important"
                                },
                                {
                                    value: "info",
                                    name: "info"
                                }
                            ]}/>  
                            <LoadImage fileCallback={fileCallback}/>                                                                                                            
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
