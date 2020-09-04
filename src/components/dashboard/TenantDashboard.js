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
                <MDBCol lg="3">
                  <CardContainer headerText="Voting Results">
                    <VotingChartView isActiveVoting={false} itemPositionInTheArray={0} />
                  </CardContainer>                  
                </MDBCol>   
                <MDBCol lg="5">
                  <CardContainer headerText="New Issues">
                    <IssueView selectedFilters={{ isOpen: true, isNew: true }}/>           
                  </CardContainer>                  
                </MDBCol>   
                <MDBCol lg="4">
                  <CardContainer headerText="New Resolved Issue">
                    <IssueView selectedFilters={{ isOpen: false, isNew: true }} /> 
                  </CardContainer>                  
                </MDBCol>
              </MDBRow>
        </MDBContainer>
      </div>                       
    );
}

export default TenantDashboard;