import React from 'react';
import MessageView from '../messages/MessageView';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import ActiveVotes from '../voting/ActiveVotes';
import IssueView from '../issues/IssueView';
import VotingChartView from '../voting/VotingChartView';
import CardContainer from '../container/CardContainer';

const TenantDashboard = () => {

    return (
        <div className="tenant-dashboard">
            <MDBContainer fluid>
              <MDBRow>
                <MDBCol>
                  <CardContainer headerText="New Messages">
                      <MessageView />          
                  </CardContainer>                   
                </MDBCol>
                <MDBCol>
                  <CardContainer headerText="Pending Votes">
                      <ActiveVotes viewOnlyMode={true}/>          
                  </CardContainer>                                        
                </MDBCol>           
              </MDBRow>
              <MDBRow>                
                <MDBCol md="3">
                  <CardContainer headerText="Voting Results">
                    <VotingChartView isActiveVoting={false} />
                  </CardContainer>                  
                </MDBCol>   
                <MDBCol md="5">
                  <CardContainer headerText="New Issues">
                    <IssueView isNewIssues={true}/>           
                  </CardContainer>
                  {/* <MDBRow className="new-issues-header">
                    <MDBCol style={{ textAlign: "left" }}>
                      <h2>New Issues</h2>
                    </MDBCol>                            
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <CardContainer headerText="New Issues">
                        <IssueView isNewIssues={true}/>           
                      </CardContainer>                      
                    </MDBCol>
                  </MDBRow> */}
                </MDBCol>   
                <MDBCol md="4">
                  <CardContainer headerText="New Resolved Issue">
                    <IssueView isNewIssues={false} /> 
                  </CardContainer>
                  {/* <MDBRow className="new-resolved-issues-header">
                    <MDBCol style={{ textAlign: "left" }}>
                      <h2>New Resolved Issue</h2>
                    </MDBCol>                            
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <CardContainer>
                        <IssueView isNewIssues={false}/> 
                      </CardContainer>                      
                    </MDBCol>
                  </MDBRow> */}
                </MDBCol>
              </MDBRow>
        </MDBContainer>
      </div>                       
    );
}

export default TenantDashboard;