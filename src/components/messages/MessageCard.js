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
import AddAndShowComment from '../comments/AddAndShowComment';

const MessageCard = ({ toggleCollapse, message, openID, onUpdateMessage, viewOnlyMode=false, deleteMessage, addCommentForMessage, setSeenBy, auth }) => {
    const [open, setOpen] = useState(false);
    const [introIcon, setIntroIcon] = useState("none");
    const img = `${config.server_url}/messages/${message._id}/image?${new Date().getTime()}`;

    useEffect(() => {
        if(!auth.user.isCommitteeMember) {
            setIntroIcon(message.seenBy.includes(auth.user._id) ? "check-square" : "square");
        }  
    }, [auth.user.isCommitteeMember]);

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
        if(!message.seenBy.includes(auth.user._id) && !viewOnlyMode) {
            setOpen(true);
        }      
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
                        <MDBCol lg="6">
                            <MDBRow>
                                <MDBCol md='4' className='img-col'>
                                <MDBView className='z-depth-1'>
                                <MDBCardImage
                                    className='img-fluid z-depth-1'
                                    src={img}
                                    alt=''                                
                                />
                                </MDBView>
                                </MDBCol>
                                <MDBCol /*md='3'*/ className="data-col">                            
                                    <p><span className="l-title">Details: </span>{message.details}</p>
                                    <p><span className="l-title">Priority: </span>{message.priority}</p>
                                    <p><span className="l-title">Status: </span>{message.status}</p>                            
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol lg="6">
                            <MDBRow className="h-100">
                                <MDBCol /*lg='6'*/ className="main-comments-col">
                                    <AddAndShowComment addComment={addComment} showAddComment={!auth.user.isCommitteeMember} comments={message.comments} />                           
                                </MDBCol>
                                { auth.user.isCommitteeMember
                                ? <MDBCol lg='6' className="btn-col h-100">
                                    <RoundedBtn color="info" onClick={() => onUpdateMessage(message)} icon="pen" caption="Update" size="sm"/>
                                    <RoundedBtn color="danger" onClick={() => deleteMessage(message)} icon="trash" caption="Delete" size="sm"/>
                                </MDBCol>                                
                                : null}
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