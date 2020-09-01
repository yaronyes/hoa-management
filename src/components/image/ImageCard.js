import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardImage, MDBModal, MDBModalHeader } from 'mdbreact';

const ImageCard = ({ imageUrl, toggle, modal }) => {    
    // useEffect(() => {
    //     if(isOpen) {
    //         toggle();
    //     }        
    // }, [isOpen]);
            
    return (
        <div>
            <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader className='blue-gradient white-text' toggle={toggle}></MDBModalHeader>
                {/* <MDBCard style={{ width: "22rem" }}> */}
                    <MDBCardImage className="img-fluid" src={imageUrl} waves />        
                {/* </MDBCard> */}
            </MDBModal>
        </div>
    );
};

export default ImageCard;