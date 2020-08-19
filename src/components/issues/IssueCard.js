import React, { useState } from 'react';
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
import './IssueCard.css';
import CardHeader from '../card-header/CardHeader';
import {deleteIssue} from '../../actions/issueActions';
import RoundedBtn from '../rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import config from '../../config/config.json';   

const IssueCard = ({ toggleCollapse, issue, openID, onUpdateIssue, deleteIssue }) => {
    const img = `${config.server_url}/issues/${issue._id}/image?${new Date().getTime()}`;
    //const [modal, setModel] = useState(false);

    // const toggle = () => {
    //     setModel(!modal);
    // }    

    return (
        <div className="issue-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                <CardHeader id={issue._id} toggleCollapse={toggleCollapse} headerText={issue.title}/>
                <MDBCollapse id={issue._id} isOpen={openID === issue._id ? true :  false}>
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
                        <MDBCol md='9' className="data-col">
                            {/* <h2 className='font-weight-bold mb-3 black-text'>
                            Hi! I am the first one.
                            </h2> */}
                            <MDBRow>
                                <MDBCol className="text-col">
                                    <p><span className="l-title">Details: </span>{issue.details}</p>
                                    <p><span className="l-title">Priority: </span>{issue.priority}</p>
                                    <p><span className="l-title">Status: </span>{issue.status}</p>    
                                    {/* comments */}
                                </MDBCol>                             
                            </MDBRow>
                            <MDBRow>
                                <MDBCol  md="6" className="offset-md-6">
                                    <div className="btn-group-tenant">                                              
                                        <RoundedBtn color="info" onClick={() => onUpdateIssue(issue)} icon="user-edit" caption="Update"/>
                                        <RoundedBtn color="danger" onClick={() => deleteIssue(issue)} icon="trash" caption="Delete"/>
                                    </div>    
                                </MDBCol>
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


IssueCard.propTypes = {
    errors: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired,
    deleteIssue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    issues: state.issue
});

export default connect(mapStateToProps, { deleteIssue })(IssueCard);