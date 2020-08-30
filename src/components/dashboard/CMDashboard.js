import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdbreact";
import IssueView from "../issues/IssueView";
import CardContainer from "../container/CardContainer";
import VotingChartView from "../voting/VotingChartView";

const CMDashboard = () => {
  const [collapseID, setCollapseID] = useState(0);

  const toggleCollapse = (newCollapseID) => setCollapseID(collapseID !== newCollapseID ? newCollapseID : "");
    

  return (
    <div>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol className="new-issue-view-header">
            <CardContainer headerText="New Reported Issues">
              <IssueView isNewIssues={true} />
            </CardContainer>
          </MDBCol>          
          <MDBCol className="issue-view-header">
            <CardContainer headerText="Overdue Issues">
              <IssueView isNewIssues={false} />
            </CardContainer>               
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBRow>
              <MDBCol className="active-voting-pr-header">
                <CardContainer headerText="Active Voting Percentage">
                  <MDBRow>
                    <MDBCol lg="4" md="6">
                      <VotingChartView isActiveVoting={true} itemPositionInTheArray={0} />
                    </MDBCol>
                    <MDBCol lg="4" md="6">
                      <VotingChartView isActiveVoting={true} itemPositionInTheArray={1} />
                    </MDBCol>
                    <MDBCol lg="4" md="6">
                      <VotingChartView isActiveVoting={true} itemPositionInTheArray={2} />
                    </MDBCol>
                  </MDBRow>
                </CardContainer>               
              </MDBCol>              
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CMDashboard;
