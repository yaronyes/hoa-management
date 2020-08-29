import React from 'react';
import { MDBCard, MDBCardImage, MDBCardBody } from 'mdbreact';

const CardContainer = ({ children, headerText }) => {
    return (
        <div className="accordion-container">
            <MDBCard className="justify-content-center"/*className="card-body"*/ style={{ marginTop: "1rem", minHeight: "45vh" }} >                  
                <MDBCardImage
                className='gradient-card-header blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-3 rounded my-card-image'
                tag='div'
                >
                <h2 className="h2-responsive mb-2 font-weight-bold">{headerText}</h2>                
            </MDBCardImage>
            <MDBCardBody>
                {children}
            </MDBCardBody>               
            </MDBCard>
        </div>
    );
};

export default CardContainer;