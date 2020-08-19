import React, { useState } from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
    MDBInput
} from 'mdbreact';
import './MessageCard.css';
import CardHeader from '../card-header/CardHeader';
import { deleteMessage, addCommentForMessage } from '../../actions/messageActions';
import RoundedBtn from '../rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import config from '../../config/config.json';   
import CommentPanel from '../comments/CommentPanel';
import CommentModel from '../../models/CommentModel'

const MessageCard = ({ toggleCollapse, message, openID, onUpdateMessage, deleteMessage, addCommentForMessage }) => {
    const [comment, setComment] = useState("");
    const img = `${config.server_url}/messages/${message._id}/image?${new Date().getTime()}`;

    const updateMessage = () => {
        if(!comment) {
            onUpdateMessage(message)
        } else {
            addCommentForMessage(new CommentModel({ text: comment }), message._id);
            setComment("");
        }        
    }

    const displayComments = message.comments.map(comment => <CommentPanel key={comment._id} text={comment.text}/>)

    return (
        <div className="message-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                <CardHeader id={message._id} toggleCollapse={toggleCollapse} headerText={message.title} 
                icon={message.priority === "info" ? 'info-circle' : 'exclamation-circle'}
                iconColor={message.priority === "info" ? 'blue-text' : 'red-text'}/>
                <MDBCollapse id={message._id} isOpen={openID === message._id ? true :  false}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md='2' className='img-col'>
                            <MDBView className='z-depth-1'>
                            <MDBCardImage
                                className='img-fluid z-depth-1'
                                src={img}
                                alt=''                                
                            />
                            </MDBView>
                        </MDBCol>
                        <MDBCol md='3' className="data-col">
                            {/* <h2 className='font-weight-bold mb-3 black-text'>
                            Hi! I am the first one.
                            </h2> */}
                            <MDBRow>
                                <MDBCol className="text-col">
                                    <p><span className="l-title">Details: </span>{message.details}</p>
                                    <p><span className="l-title">Priority: </span>{message.priority}</p>
                                    <p><span className="l-title">Status: </span>{message.status}</p>                                                                        
                                </MDBCol>                             
                            </MDBRow>                            
                        </MDBCol>
                        <MDBCol md='4' className="main-comments-col">
                            <MDBRow>
                                <MDBCol className="comments-col">
                                    {displayComments}    
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput
                                    type="textarea"
                                    label="Add Comment"
                                    rows="2"
                                    icon="pencil-alt"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    /> 
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md='3' className="btn-col">
                            <MDBRow className="btn-row">
                                <MDBCol>
                                    <div className="btn-group-message">                                              
                                        <RoundedBtn color="info" onClick={updateMessage} icon="pen" caption="Update" size="sm"/>
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
    deleteMessage: PropTypes.func.isRequired,
    addCommentForMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    messages: state.message
});

export default connect(mapStateToProps, { deleteMessage, addCommentForMessage })(MessageCard);