import React from 'react';
import MessageView from '../messages/MessageView';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import ActiveVotes from '../voting/ActiveVotes';
import IssueView from '../issues/IssueView';
import VotingChartView from '../voting/VotingChartView';

const TenantDashboard = () => {

    return (
        <div>
            <MDBContainer>
              <MDBRow>
                <MDBCol md="6">
                  <MessageView />          
                </MDBCol>
                <MDBCol md="6">
                  <ActiveVotes viewOnlyMode={true}/>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="3">
                  <VotingChartView isActiveVoting={false} headerText="Voting Results"/>
                </MDBCol>
                <MDBCol md="4">
                  <IssueView isNewIssues={true}/> 
                </MDBCol>
                <MDBCol md="5">
                  <IssueView isNewIssues={false}/> 
                </MDBCol>
              </MDBRow>
        </MDBContainer>
      </div>
                     
  
    );
}

export default TenantDashboard;