import React from 'react';
import MessageView from '../messages/MessageView';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const TenantDashboard = () => {

    return (
        <div>
            <MDBContainer>
              <MDBRow>
                <MDBCol>
                  <MessageView />          
                </MDBCol>
                <MDBCol>
                  
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