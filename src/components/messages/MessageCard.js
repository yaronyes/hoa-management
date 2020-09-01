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
    const [img, setImg] = useState("message.png");    

    useEffect(() => {        
        if(message.haveImage) {
            setImg(`${config.server_url}/messages/${message._id}/image?${new Date().getTime()}`);
        }
    }, [message]);

    useEffect(() => {
        if(!auth.user.isCommitteeMember) {
            setIntroIcon(message.seenBy.includes(auth.user._id) ? "check-square" : "square");
        }  
    });

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
                            <MDBCol lg="7">
                                <MDBRow>
                                    <MDBCol md='4' className='img-col'>
                                    <MDBView>
                                    <MDBCardImage
                                        className='img-fluid'
                                        src={img}
                                        alt=''                                
                                    />
                                    </MDBView>
                                    </MDBCol>
                                    <MDBCol /*md='3'*/ className="data-col">                            
                                        <h5><strong>Details: </strong><strong className="text-muted">{message.details}</strong></h5>
                                        <h5><strong>Priority: </strong><strong className="text-muted">{message.priority}</strong></h5>                                        
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol lg="5">
                                <MDBRow className="h-100">
                                    <MDBCol className="main-comments-col">
                                        <AddAndShowComment addComment={addComment} showAddComment={!auth.user.isCommitteeMember} comments={message.comments} />                           
                                    </MDBCol>
                                    {/* { auth.user.isCommitteeMember
                                    ? <MDBCol lg='5' className="btn-col">
                                        <RoundedBtn color="info" onClick={() => onUpdateMessage(message)} icon="pen" caption="Update" size="sm"/>
                                        <RoundedBtn color="danger" onClick={() => deleteMessage(message)} icon="trash" caption="Delete" size="sm"/>
                                    </MDBCol>                                
                                    : null} */}
                                </MDBRow>
                            </MDBCol> 
                        </MDBRow>
                        <MDBRow>
                            { auth.user.isCommitteeMember
                            ? <MDBCol className="btn-col">
                                <RoundedBtn color="info" onClick={() => onUpdateMessage(message)} icon="pen" caption="Update" size="sm"/>
                                <RoundedBtn color="danger" onClick={() => deleteMessage(message)} icon="trash" caption="Delete" size="sm"/>
                            </MDBCol>                                
                            : null}
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