import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const CMDashboard = () => { 
  const [collapseID, setCollapseID] = useState(0);

  const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

  return (
      <div>
          <MDBContainer>
              <MDBRow>
                <MDBCol>
                  New Reported Issues
                </MDBCol>                  
                <MDBCol>
                  Overdue Issues
                </MDBCol>
              </MDBRow>   
              <MDBRow>
                <MDBCol>
                  Active Voting Percentage
                </MDBCol>                  
              </MDBRow>     
          </MDBContainer>
      </div>
  );
}


export default CMDashboard;