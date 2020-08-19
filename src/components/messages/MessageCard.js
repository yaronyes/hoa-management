import React from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
    MDBIcon
} from 'mdbreact';
import './MessageCard.css';
import CardHeader from '../card-header/CardHeader';
import { deleteMessage } from '../../actions/messageActions';
import RoundedBtn from '../rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import config from '../../config/config.json';   

const MessageCard = ({ toggleCollapse, message, openID, onUpdateMessage, deleteMessage }) => {
    const img = `${config.server_url}/messages/${message._id}/image?${new Date().getTime()}`;

    return (
        <div className="message-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                <CardHeader id={message._id} toggleCollapse={toggleCollapse} headerText={message.title} 
                icon={message.priority === "info" ? 'info-circle' : 'exclamation-circle'}
                iconColor={message.priority === "info" ? 'blue-text' : 'red-text'}/>
                <MDBCollapse id={message._id} isOpen={openID === message._id ? true :  false}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md='3' className='img-col'>
                            <MDBView className='z-depth-1'>
                            <MDBCardImage
                                className='img-fluid z-depth-1'
                                src={img}
                                alt=''                                
                            />
                            </MDBView>
                        </MDBCol>
                        <MDBCol md='4' className="data-col">
                            {/* <h2 className='font-weight-bold mb-3 black-text'>
                            Hi! I am the first one.
                            </h2> */}
                            <MDBRow>
                                <MDBCol className="text-col">
                                    <p><span className="l-title">Details: </span>{message.details}</p>
                                    <p><span className="l-title">Priority: </span>{message.priority}</p>
                                    <p><span className="l-title">Status: </span>{message.status}</p>                                    
                                    {/* comments */}
                                </MDBCol>                             
                            </MDBRow>                            
                        </MDBCol>
                        <MDBCol md='3' className="main-comments-col">
                            <MDBRow>
                                <MDBCol className="comments-col">
                                    comments    
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    add comments
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md='3' className="btn-col">
                            <MDBRow className="btn-row">
                                <MDBCol>
                                    <div className="btn-group-message">                                              
                                        <RoundedBtn color="info" onClick={() => onUpdateMessage(message)} icon="pen" caption="Update" size="sm"/>
                                        <RoundedBtn color="danger" onClick={() => deleteMessage(message)} icon="trash" caption="Delete" size="sm"/>
                                    </div>    
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
        </div>
    );
};

MessageCard.propTypes = {
    errors: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    deleteMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    messages: state.message
});

export default connect(mapStateToProps, { deleteMessage })(MessageCard);