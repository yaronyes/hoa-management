import React from 'react';
import MessageView from '../messages/MessageView';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import ActiveVotes from '../voting/ActiveVotes';

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
                <MDBCol>
                  <MDBRow>
                    <MDBCol>TenantDashboard</MDBCol>
                    <MDBCol></MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
        </MDBContainer>
      </div>
                     
  
    );
}

export default TenantDashboard;