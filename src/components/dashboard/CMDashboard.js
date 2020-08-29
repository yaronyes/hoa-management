import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdbreact";
import IssueView from "../issues/IssueView";
import AccordionContainer from "../container/AccordionContainer";

const CMDashboard = () => {
  const [collapseID, setCollapseID] = useState(0);

  const toggleCollapse = (newCollapseID) => setCollapseID(collapseID !== newCollapseID ? newCollapseID : "");
    

  return (
    <div>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol>
            <MDBRow className="issue-view-header">
              <MDBCol className="text-left">
                <h2>New Reported Issues</h2>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>                
                <AccordionContainer>
                  <IssueView isNewIssues={true} />
                </AccordionContainer>
              </MDBCol>
            </MDBRow>
          </MDBCol>          
          <MDBCol>
          <MDBRow className="issue-view-header">
              <MDBCol className="text-left">
                <h2>Overdue Issues</h2>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <AccordionContainer>
                  <IssueView isNewIssues={false} />
                </AccordionContainer>                
              </MDBCol>
            </MDBRow>           
          </MDBCol>
        </MDBRow>
        <hr/>
        <MDBRow>
          <MDBCol>
            <MDBRow>
              <MDBCol>Active Voting Percentage</MDBCol>
              <MDBCol></MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CMDashboard;
