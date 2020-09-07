import React, { useState, useRef } from 'react';
import { MDBCard, MDBCardImage, MDBCardBody } from 'mdbreact';
import ScrollToBottom from 'react-scroll-to-bottom';
import './CardContainer.css';

const CardContainer = ({ children, headerText }) => {                    
    const [containerSize, setContainerSize] = useState('small');
    const ref = useRef(null);
    
    const onLoadContainer = () => {        
        if(ref.current.clientHeight >= 418) {
            setContainerSize('large');
        }
    }
   
    return (
        <div className="accordion-container">                        
            <MDBCard className="justify-content-center" style={{ marginTop: "1rem"/*, minHeight: '40vh'*/ }} >                  
                <MDBCardImage
                className='gradient-card-header blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-1 rounded my-card-image'
                tag='div'
                >
                <h4 className="h4-responsive mb-2 font-weight-bold">{headerText}</h4>                
                </MDBCardImage>
                <div ref={ref}>
                    <MDBCardBody>
                        <div className={"z-depth-3 " + (containerSize === "large" ? "scroll-container-large" : "scroll-container-small")} onLoad={onLoadContainer}>
                            <ScrollToBottom className={"scroll-to-bottom " + (containerSize === "large" ? "scroll-section-large" : "scroll-section-small")} scrollViewClassName="scrollbar scrollbar-primary">                    
                                {children}                    
                            </ScrollToBottom>                               
                        </div>
                    </MDBCardBody> 
                </div>                
            </MDBCard>            
        </div>
    );
};

export default CardContainer;