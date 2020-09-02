import React from 'react';
import { MDBCard, MDBCardImage, MDBCardBody } from 'mdbreact';
import ScrollToBottom from 'react-scroll-to-bottom';

const CardContainer = ({ children, headerText }) => {
    const style = { 
        width: '100%', 
        height: '45vh' 
    }

    return (
        <div className="accordion-container">                        
            <MDBCard className="justify-content-center"/*className="card-body"*/ style={{ marginTop: "1rem", minHeight: "45vh" }} >                  
                <MDBCardImage
                className='gradient-card-header blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-2 rounded my-card-image'
                tag='div'
                >
                <h2 className="h2-responsive mb-2 font-weight-bold">{headerText}</h2>                
            </MDBCardImage>
            <div style={style}>
                <ScrollToBottom className="scroll-to-bottom " scrollViewClassName="scrollbar scrollbar-primary">
                    <MDBCardBody>
                        {children}
                    </MDBCardBody>               
                </ScrollToBottom>
            </div>
            </MDBCard>            
        </div>
    );
};

export default CardContainer;