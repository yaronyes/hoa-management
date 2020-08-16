import React from 'react';
import './RoundedBtn.css';
import { MDBBtn, MDBIcon } from "mdbreact";

const RoundedBtn = ({color, caption, icon, onClick}) => {

    return <MDBBtn rounded color={color} className="btn-rounded" onClick={onClick}>
            <MDBIcon icon={icon} /> {caption}
          </MDBBtn>
}

export default RoundedBtn;