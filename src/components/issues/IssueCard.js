import React, { useState } from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
    MDBBtn,
    MDBIcon
} from 'mdbreact';
import './TenantCard.css';
// import AddUpdateTenant  from './AddUpdateTenant';
import RoundedBtn from '../rounded-button/RoundedBtn';
import './IssueCard.css';

const IssueCard = ({ toggleCollapse, issue, isOpen, onUpdateIssue }) => {
    //const avatar = `https://yyes-hoa-management-server.herokuapp.com/users/${tenant._id}/avatar?${new Date().getTime()}`;
    //const [modal, setModel] = useState(false);

    // const toggle = () => {
    //     setModel(!modal);
    // }

    return (
        <div className="issue-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>
                <div 
                onClick={() => toggleCollapse(issue._id)}
                className='card-header text-uppercase blue lighten-3 z-depth-1'
                role="tab"
                >
                    <span className='white-text font-weight-bold'>
                       {issue.title}
                    </span>
                </div >
                <MDBCollapse id={issue._id} isOpen={isOpen}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md='3' className='img-col'>
                            <MDBView className='z-depth-1'>
                            {/* <MDBCardImage
                                className='img-fluid z-depth-1'
                                src={avatar}
                                alt=''                                
                            /> */}
                            </MDBView>
                        </MDBCol>
                        <MDBCol md='9' className="data-col">
                            {/* <h2 className='font-weight-bold mb-3 black-text'>
                            Hi! I am the first one.
                            </h2> */}
                            <MDBRow>
                                <MDBCol className="text-col">
                                    <p><span className="l-title">Details: </span>{issue.details}</p>
                                    <p><span className="l-title">Priority: </span>{issue.priority}</p>
                                    <p><span className="l-title">Status: </span>#{issue.status}</p>    
                                    {/* comments */}
                                </MDBCol>                             
                            </MDBRow>
                            <MDBRow>
                                {/* <MDBCol  md="6" className="offset-md-6">
                                    <div className="btn-group-tenant">                                              
                                        <RoundedBtn color="info" onClick={() => onUpdateIssue(issue)} icon="user-edit" caption="Update"/>
                                        <RoundedBtn color="danger" onClick={} icon="trash" caption="Delete"/>
                                    </div>    
                                </MDBCol> */}
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
            {/* <AddUpdateTenant modal={modal} toggle={toggle} selectedTenant={tenant}/> */}
        </div>
    );

};

export default IssueCard;