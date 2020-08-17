import React from 'react';
import './CardHeader.css';

const CardHeader = ({ id, toggleCollapse, headerText }) => {

    return (
        <div 
        onClick={() => toggleCollapse(id)}
        className='card-header text-uppercase blue lighten-3 z-depth-1'
        role="tab"
        >
            <span className='white-text font-weight-bold'>
                {headerText}
            </span>
        </div>
    );
}

export default CardHeader;