import React from 'react';
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
import './VotingCard.css';
import CardHeader from '../card-header/CardHeader';
import RoundedBtn from '../rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolTipPieChart from '../charts/ToolTipPieChart';
import dateFormat from 'dateformat';
//import moment from 'moment'

const VotingCard = ({ toggleCollapse, voting, openID, activeVoting, auth }) => {    

    const updateOrVote = () => {
        if(auth.user.isCommitteeMember) {
            // update end date
        } else {
            // vote
        }
    }
        
    return (
        <div className="voting-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                <CardHeader id={voting._id} toggleCollapse={toggleCollapse} headerText={voting.title}
                /*secondText={!activeVoting ? voting.getVotingResult()[0].voteOptions : ""}*/ />                
                <MDBCollapse id={voting._id} isOpen={openID === voting._id ? true :  false}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md={activeVoting ? "8" : "4"} className="data-col">
                            <MDBRow>
                                <MDBCol>
                                    <p><span className="l-title">Details: </span>{voting.details}</p>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className="date-col">
                                    <p className="p-date"><span className="l-title-date">End Date: </span>{dateFormat(voting.dueDate, "dd/mm HH:MM")}</p>
                                    <RoundedBtn color="info" onClick={updateOrVote} icon="pen" caption={auth.user.isCommitteeMember ? "Update End Date" : "Vote"} size="sm"/>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        {!activeVoting
                        ? <MDBCol md="4">
                            {/* Results                             */}
                            <ToolTipPieChart data={[
                            { title: 'One', value: 10, color: '#E38627' },
                            { title: 'Two', value: 15, color: '#C13C37' },
                            { title: 'Three', value: 20, color: '#6A2135' },
                        ]} header="Results" isPercentage={false}/>
                         </MDBCol> 
                        : null}
                        <MDBCol md="4">                                                                                
                            {/* Voting Percentage */}
                            <ToolTipPieChart data={[
                            { title: 'One', value: 10, color: '#E38627' },
                            { title: 'Two', value: 15, color: '#C13C37' },
                            { title: 'Three', value: 20, color: '#6A2135' },
                        ]} header="Voting Percentage" isPercentage={true}/>                            
                        </MDBCol>                        
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>               
        </div>
    );
};

VotingCard.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    //deleteMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    votes: state.voting
});

export default connect(mapStateToProps, { })(VotingCard);
