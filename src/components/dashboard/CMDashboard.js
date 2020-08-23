import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const CMDashboard = () => {
  const [collapseID, setCollapseID] = useState(0);

  const toggleCollapse = (newCollapseID) => setCollapseID(collapseID !== newCollapseID ? newCollapseID : "");
    
  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBRow>
              <MDBCol>New Reported Issues</MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol></MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol>
            <MDBRow>
              <MDBCol>Overdue Issues</MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol></MDBCol>
            </MDBRow>
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
