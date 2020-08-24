import React, { useState, useEffect } from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
} from 'mdbreact';
import './MessageCard.css';
import CardHeader from '../card-header/CardHeader';
import { deleteMessage, addCommentForMessage, setSeenBy } from '../../actions/messageActions';
import RoundedBtn from '../rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import config from '../../config/config.json';   
import CommentModel from '../../models/CommentModel'
import AddAnShowComment from '../comments/AddAnShowComment';

const MessageCard = ({ toggleCollapse, message, openID, onUpdateMessage, deleteMessage, addCommentForMessage, setSeenBy, auth }) => {
    const [open, setOpen] = useState(false);
    const img = `${config.server_url}/messages/${message._id}/image?${new Date().getTime()}`;

    useEffect(() => {
        if(open && !message.seenBy.includes(auth.user._id)) {
            setSeenBy(message._id);
        }
        
    }, [open]);
    
    const addComment = (text) => {
        if(text) {
            addCommentForMessage(new CommentModel({ text }), message._id);
        }
    }

    const introIconClicked = (id) => {
        setSeenBy(id);
    }

    const onToggleCollapse = (id) => {
        toggleCollapse(id);
        if(!message.seenBy.includes(auth.user._id)) {
            setOpen(true);
        }      
    }

    let introIcon = "none";    
    if(!auth.user.isCommitteeMember) {
        introIcon = message.seenBy.includes(auth.user._id) ? "check-square" : "square";
    }  

    return (
        <div className="message-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                <CardHeader id={message._id} toggleCollapse={onToggleCollapse} headerText={message.title} 
                icon={message.priority === "info" ? 'info-circle' : 'exclamation-circle'}
                iconColor={message.priority === "info" ? 'blue-text' : 'red-text'}
                introIcon={introIcon}
                // introIconColor={introIconColor}
                onIntroIconClicked={introIconClicked}
                />
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
                            <MDBRow>
                                <MDBCol className="text-col">
                                    <p><span className="l-title">Details: </span>{message.details}</p>
                                    <p><span className="l-title">Priority: </span>{message.priority}</p>
                                    <p><span className="l-title">Status: </span>{message.status}</p>                                                                        
                                </MDBCol>                             
                            </MDBRow>                            
                        </MDBCol>
                        <MDBCol md='4' className="main-comments-col">
                            <AddAnShowComment addComment={addComment} showAddComment={!auth.user.isCommitteeMember} comments={message.comments} />                           
                        </MDBCol>
                        <MDBCol md='3' className="btn-col">
                            <MDBRow className="btn-row">
                                <MDBCol>
                                { auth.user.isCommitteeMember
                                 ? <div className="btn-group-message">                                               
                                        <RoundedBtn color="info" onClick={() => onUpdateMessage(message)} icon="pen" caption="Update" size="sm"/>
                                        <RoundedBtn color="danger" onClick={() => deleteMessage(message)} icon="trash" caption="Delete" size="sm"/>
                                    </div> 
                                 : null}   
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
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    addCommentForMessage: PropTypes.func.isRequired,
    setSeenBy: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    messages: state.message
});

export default connect(mapStateToProps, { deleteMessage, addCommentForMessage, setSeenBy })(MessageCard);