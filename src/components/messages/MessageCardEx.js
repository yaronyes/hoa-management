import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBCollapse } from 'mdbreact';
import './MessageCardEx.css'
import AddAndShowComment from '../comments/AddAndShowComment';
import FloatingBtn from '../buttons/FloatingBtn';

const MessageCardEx = ({ message, onImageDBClicked, onUpdateMessage, deleteMessage, addComment, isCommitteeMember, introIcon, onIntroIconClicked }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const clicked = event => {        
        if(event.target.className.includes("intro-icon") && onIntroIconClicked) {
            event.stopPropagation();
            onIntroIconClicked(message._id);
        } 
    }

    return (
        <MDBCard>
            <MDBCardImage
                className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-3 card-t'
                cascade
                tag='div'
            >
                <MDBIcon className={"priority-icon " + (message.priority === "info" ? 'blue-text' : 'red-text')} icon={message.priority === "info" ? 'info-circle' : 'exclamation-circle'} size="2x" />
                <h3 className='h3-responsive'>{message.title}</h3>
                <p>{new Date(message.createdAt).toLocaleString()}</p>
                { isCommitteeMember
                ?<div className='text-center'>
                    <FloatingBtn color='blue' icon="edit" onBtnClicked={() => onUpdateMessage(message)}/>                
                    {/* <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={() => onUpdateMessage(message)}>
                        <MDBIcon icon="edit" />
                    </MDBBtn> */}
                    <FloatingBtn color='blue' icon='trash-alt' onBtnClicked={() => deleteMessage(message)}/>
                    {/* <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={() => deleteMessage(message)}>
                        <MDBIcon icon='trash-alt' size="lg"/>
                    </MDBBtn>  */}
                </div>
                : null }
                { introIcon !== "none"
                  ? <MDBIcon icon={introIcon} className="intro-icon" onClick={clicked}/>
                  : null}                  
            </MDBCardImage>            
            <MDBCardBody>            
                <h6><strong>Details: </strong><strong className="text-muted">{message.details}</strong></h6>                    
                <h6><strong>Priority: </strong><strong className="text-muted">{message.priority}</strong></h6>  
                <div className={'d-flex ' + (message.haveImage ? 'justify-content-between' : 'justify-content-end')}>
                { message.haveImage
                    ? <FloatingBtn color='blue' icon='image' onBtnClicked={onImageDBClicked}/>
                    // <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={onImageDBClicked}>
                    //     <MDBIcon icon="image" />
                    // </MDBBtn>    
                    : null }
                    <FloatingBtn color='blue' icon='comment' onBtnClicked={() => setIsOpen(!isOpen)}/>
                    {/* <MDBBtn color='blue' size='sm' className="floating-btn-ex ml-auto" onClick={() => setIsOpen(!isOpen)}>
                        <MDBIcon icon='comment' size="lg"/>
                    </MDBBtn>                 */}
                </div>
                <MDBCollapse id="commentCollapse" isOpen={isOpen}>
                    <div className="mt-2">
                        <AddAndShowComment addComment={addComment} showAddComment={!isCommitteeMember} comments={message.comments} /> 
                    </div>
                </MDBCollapse>
            </MDBCardBody>
        </MDBCard>
  );
};

export default MessageCardEx;