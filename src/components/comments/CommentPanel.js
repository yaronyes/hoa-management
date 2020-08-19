import React from 'react';
import { MDBCard, MDBCardBody, MDBContainer, MDBIcon, MDBCol } from "mdbreact";
import './CommentPanel.css';

const CommentPanel = ({ text, icon, iconColor }) => {
    
  return (
    <div className="comment-panel">
      <MDBContainer>
        <MDBCard>
          <MDBCardBody>
            <MDBCol md='1' className="icon-col">
              <MDBIcon icon={icon ? icon : 'user-circle'} size="2x" className={iconColor}/>
            </MDBCol>
            <MDBCol md='11' className="text-col">
              <p>{text}</p>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>    
    );
};

export default CommentPanel;