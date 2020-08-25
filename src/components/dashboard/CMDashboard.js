import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import IssueView from "../issues/IssueView";


const CMDashboard = () => {
  const [collapseID, setCollapseID] = useState(0);

  const toggleCollapse = (newCollapseID) => setCollapseID(collapseID !== newCollapseID ? newCollapseID : "");
    
  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <IssueView isNewIssues={true}/>          
          </MDBCol>
          <MDBCol>
            <IssueView isNewIssues={false}/>
          </MDBCol>
        </MDBRow>
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
