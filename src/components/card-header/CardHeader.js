import React from 'react';
import './CardHeader.css';
import { MDBIcon } from 'mdbreact';


const CardHeader = ({ id, toggleCollapse, color, headerText, icon="none", iconColor, introIcon="none", introIconColor, onIntroIconClicked, secondText=""}) => {
    const colorId = color ? color : 'blue lighten-3';

    const clicked = event => {        
        if((event.target.className.includes("intro-icon"))) {
            event.stopPropagation();
            onIntroIconClicked(id);
        } else {
            toggleCollapse(id)
        }
    }

    return (
        <div 
        onClick={clicked}
        className={'card-header z-depth-1 ' + colorId} //text-uppercase
        role="tab"
        >   <div>
                { introIcon !== "none"
                  ? <MDBIcon icon={introIcon} className={"intro-icon " + introIconColor} onClick={clicked}/>
                  : null}
                <span className='white-text font-weight-bold'>
                    {headerText}
                </span>            
            </div>            
            { secondText
             ? <span className='white-text font-weight-bold'>
                    {secondText}
            </span>
            : <div>
            <MDBIcon icon={icon} className={iconColor} size="2x"/>                   
            </div>}
        </div>
    );
}

export default CardHeader;