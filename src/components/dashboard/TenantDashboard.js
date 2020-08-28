import React from 'react';
import MessageView from '../messages/MessageView';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import ActiveVotes from '../voting/ActiveVotes';
import IssueView from '../issues/IssueView';
import VotingChartView from '../voting/VotingChartView';
import AccordionContainer from '../container/AccordionContainer';

const TenantDashboard = () => {

    return (
        <div>
            <MDBContainer fluid>
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow className="new-message-header">
                    <MDBCol style={{ textAlign: "left" }}>
                      <h2>New Messages</h2>
                    </MDBCol>                            
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <AccordionContainer>
                        <MessageView />          
                      </AccordionContainer>                      
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                  <MDBRow className="pending-votes-header">
                    <MDBCol style={{ textAlign: "left" }}>
                      <h2>Pending Votes</h2>
                    </MDBCol>                            
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <AccordionContainer>
                        <ActiveVotes viewOnlyMode={true}/>          
                      </AccordionContainer>                      
                    </MDBCol>
                  </MDBRow>
                </MDBCol>           
              </MDBRow>
              <MDBRow>                
                <MDBCol md="3">
                  <MDBRow className="voting-results-header">
                    <MDBCol style={{ textAlign: "left" }}>
                      <h2>Voting Results</h2>
                    </MDBCol>                            
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <AccordionContainer>
                        <VotingChartView isActiveVoting={false} headerText="Voting Results"/>
                      </AccordionContainer>                      
                    </MDBCol>
                  </MDBRow>
                </MDBCol>   
                <MDBCol md="5">
                  <MDBRow className="new-issues-header">
                    <MDBCol style={{ textAlign: "left" }}>
                      <h2>New Issues</h2>
                    </MDBCol>                            
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <AccordionContainer>
                        <IssueView isNewIssues={true}/>           
                      </AccordionContainer>                      
                    </MDBCol>
                  </MDBRow>
                </MDBCol>   
                <MDBCol md="4">
                  <MDBRow className="new-resolved-issues-header">
                    <MDBCol style={{ textAlign: "left" }}>
                      <h2>New Resolved Issue</h2>
                    </MDBCol>                            
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <AccordionContainer>
                        <IssueView isNewIssues={false}/> 
                      </AccordionContainer>                      
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
        </MDBContainer>
      </div>                       
    );
}

export default TenantDashboard;