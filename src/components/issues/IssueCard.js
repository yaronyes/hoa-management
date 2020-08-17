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

const IssueCard = ({ toggleCollapse, theIssue, isOpen, onUpdateIssue, deleteIssue }) => {
    const img = `https://yyes-hoa-management-server.herokuapp.com/issues/${theIssue._id}/avatar?${new Date().getTime()}`;
    //const [modal, setModel] = useState(false);

    // const toggle = () => {
    //     setModel(!modal);
    // }

    return (
        <div className="issue-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                <CardHeader id={theIssue._id} toggleCollapse={toggleCollapse} headerText={theIssue.title}/>
                <MDBCollapse id={theIssue._id} isOpen={isOpen}>
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
                                    <p><span className="l-title">Details: </span>{theIssue.details}</p>
                                    <p><span className="l-title">Priority: </span>{theIssue.priority}</p>
                                    <p><span className="l-title">Status: </span>{theIssue.status}</p>    
                                    {/* comments */}
                                </MDBCol>                             
                            </MDBRow>
                            <MDBRow>
                                <MDBCol  md="6" className="offset-md-6">
                                    <div className="btn-group-tenant">                                              
                                        <RoundedBtn color="info" onClick={() => onUpdateIssue(theIssue)} icon="user-edit" caption="Update"/>
                                        <RoundedBtn color="danger" onClick={() => deleteIssue(theIssue)} icon="trash" caption="Delete"/>
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
    issue: PropTypes.array.isRequired,
    deleteIssue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    issue: state.issue
});

export default connect(mapStateToProps, { deleteIssue })(IssueCard);