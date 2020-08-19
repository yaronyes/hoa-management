import React from 'react';
import './CardHeader.css';
import { MDBIcon } from 'mdbreact';


const CardHeader = ({ id, toggleCollapse, color, headerText, icon }) => {
    const colorId = color ? color : 'blue lighten-3';

    return (
        <div 
        onClick={() => toggleCollapse(id)}
        className={'card-header text-uppercase z-depth-1 ' + colorId}
        role="tab"
        >
            <span className='white-text font-weight-bold'>
                {headerText}
            </span>
            <MDBIcon icon={icon}/>
        </div>
    );
}

export default CardHeader;