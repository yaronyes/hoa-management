import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBCollapse } from 'mdbreact';
import './IssueCardEx.css'
import AddAndShowComment from '../comments/AddAndShowComment';
import FloatingBtn from '../buttons/FloatingBtn';


const IssueCardEx = ({ issue, onImageDBClicked, onUpdateIssue, deleteIssue, addComment, closeIssue, isCommitteeMember, allowedToUpdateIssue }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (        
        <MDBCard>
            <MDBCardImage
                className='blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-3 card-t'
                cascade
                tag='div'
            >
                <MDBIcon className={"priority-icon " + (issue.status === 'open' ? 'red-text' : 'green-text')} icon={issue.status === 'open' ? 'exclamation-circle' : 'check-circle'} size="2x" />
                <h2 className='h2-responsive'>{issue.title}</h2>
                <p>{new Date(issue.createdAt).toLocaleString()}</p>
                <div className='text-center'>                    
                    { allowedToUpdateIssue
                    ? <div style={{ display: "inline-block" }}> 
                       { issue.status === 'open'    
                        ? <div style={{ display: "inline-block" }}> 
                            <FloatingBtn color='blue' icon='edit' onBtnClicked={() => onUpdateIssue(issue)}/>
                            {/* <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={() => onUpdateIssue(issue)}>
                                <MDBIcon icon="edit" />
                            </MDBBtn>                     */}
                            <FloatingBtn color='blue' icon='times-circle' onBtnClicked={closeIssue}/>
                            {/* <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={closeIssue}>
                                <MDBIcon icon="times-circle" />
                            </MDBBtn> */}
                        </div>
                        : null}
                    <FloatingBtn color='blue' icon='trash-alt' onBtnClicked={() => deleteIssue(issue)}/>
                    {/* <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={() => deleteIssue(issue)}>
                        <MDBIcon icon='trash-alt' size="lg"/>
                    </MDBBtn>                 */}
                    </div>
                    : null }
                </div>
            </MDBCardImage>            
        <MDBCardBody>            
            <h6><strong>Details: </strong><strong className="text-muted">{issue.details}</strong></h6>
            <h6><strong>Priority: </strong><strong className="text-muted">{issue.priority}</strong></h6>
            <h6><strong>Status: </strong><strong className="text-muted">{issue.status}</strong></h6>  
            <div className={'d-flex ' + (issue.haveImage ? 'justify-content-between' : 'justify-content-end')}>
                { issue.haveImage
                ? <FloatingBtn color='blue' icon='image' onBtnClicked={onImageDBClicked}/>
                // <MDBBtn color='blue' size='sm' className="floating-btn-ex" onClick={onImageDBClicked}>
                //         <MDBIcon icon="image" />
                // </MDBBtn>
                : null }
                <FloatingBtn color='blue' icon='comment' onBtnClicked={() => setIsOpen(!isOpen)} className="ml-auto" />
                {/* <MDBBtn color='blue' size='sm' className="floating-btn-ex ml-auto" onClick={() => setIsOpen(!isOpen)}>
                    <MDBIcon icon='comment' size="lg"/>
                </MDBBtn>                 */}
            </div>
            <MDBCollapse id="commentCollapse" isOpen={isOpen}>
                <div className="mt-2">
                    <AddAndShowComment addComment={addComment} showAddComment={isCommitteeMember && issue.status === 'open'} comments={issue.comments} /> 
                </div>
            </MDBCollapse>
        </MDBCardBody>
    </MDBCard>
    );
};

export default IssueCardEx;