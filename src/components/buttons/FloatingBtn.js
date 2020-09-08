import React from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';

const FloatingBtn = ({ color, icon, onBtnClicked }) => {
    return (
        <div>
            <MDBBtn color={color ? color : 'blue'} size='sm' className="floating-btn-ex" onClick={onBtnClicked}>
                <MDBIcon icon="image" />
            </MDBBtn>    
        </div>
    );
};

export default FloatingBtn;