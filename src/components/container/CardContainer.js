import React from 'react';
import { MDBCard, MDBCardImage, MDBCardBody } from 'mdbreact';
import ScrollToBottom from 'react-scroll-to-bottom';

const CardContainer = ({ children, headerText }) => {
    const style = { 
        width: '100%', 
        height: '40vh' 
    }

    return (
        <div className="accordion-container">                        
            <MDBCard className="justify-content-center"/*className="card-body"*/ style={{ marginTop: "1rem", minHeight: "40vh" }} >                  
                <MDBCardImage
                className='gradient-card-header blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-1 rounded my-card-image'
                tag='div'
                >
                <h4 className="h4-responsive mb-2 font-weight-bold">{headerText}</h4>                
            </MDBCardImage>
            <MDBCardBody>
            <div style={style} className="z-depth-3">
                <ScrollToBottom className="scroll-to-bottom " scrollViewClassName="scrollbar scrollbar-primary">
                    
                        {children}                    
                </ScrollToBottom>                
            </div>
            </MDBCardBody>               
            </MDBCard>            
        </div>
    );
};

export default CardContainer;