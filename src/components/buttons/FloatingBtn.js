import React from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import './FloatingBtn.css';

const FloatingBtn = ({ color, icon, onBtnClicked }) => {
    return (
        <MDBBtn color={color ? color : 'blue'} size='sm' className="floating-btn-ex" onClick={onBtnClicked}>
            <MDBIcon icon={icon} />
        </MDBBtn>   
    );
};

export default FloatingBtn;