import React from 'react';
import { MDBCard, MDBCardBody, MDBContainer, MDBIcon, MDBCol, MDBRow } from "mdbreact";
import './CommentPanel.css';

const CommentPanel = ({ text, name, icon, iconColor }) => {
    
  return (
    <div className="comment-panel">
      <MDBContainer>
        <MDBCard>
          <MDBCardBody>
          <MDBRow>
            <MDBCol className="user-col">
              <MDBIcon icon={icon ? icon : 'user-circle'} size="2x" className={iconColor}/>
              <p className="mb-0 red-text">{`${name}:`}</p>
            </MDBCol>
            {/* <MDBCol md='1' className="icon-col">
              <MDBIcon icon={icon ? icon : 'user-circle'} size="2x" className={iconColor}/>
            </MDBCol>
            <MDBCol className="name-col mt-1">
              <p className="mb-0 red-text">{`${name}:`}</p>
            </MDBCol>             */}
          </MDBRow>  
          <MDBRow>
            <MDBCol className="text-col">
              <p className="mb-0">{text}</p>
            </MDBCol>
          </MDBRow>  
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>    
    );
};

export default CommentPanel;