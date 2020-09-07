import React from 'react';
import './CardHeader.css';
import { MDBIcon } from 'mdbreact';


const CardHeader = ({ id, toggleCollapse, color, headerText, icon="none", iconColor, introIcon="none", introIconColor, onIntroIconClicked, secondText="", secondTextSmallSize=false, onMainIconClicked}) => {
    const colorId = color ? color : "";//"blue darken-3";//"info-color-dark";//'rgba(96, 125, 139, 0.3) rgba-blue-grey-light';

    const clicked = event => {        
        if(event.target.className.includes("intro-icon") && onIntroIconClicked) {
            event.stopPropagation();
            onIntroIconClicked(id);
        } else if(event.target.className.includes("main-icon") && onMainIconClicked) {
            event.stopPropagation();
            onMainIconClicked(id);
        } else {
            toggleCollapse(id)
        }
    }

    return (
        <div 
        onClick={clicked}
        className={'card-header z-depth-1 ' + colorId}
        role="tab"
        >   <div>
                { introIcon !== "none"
                  ? <MDBIcon icon={introIcon} className={"intro-icon " + introIconColor} onClick={clicked}/>
                  : null}
                <span className='white-text font-weight-bold'>
                    {headerText}
                </span>            
            </div>            
            <div className="right-side">
            { secondText
             ? <span className={'white-text font-weight-bold ml-auto mt-1' + (icon !== 'none' ? ' mr-2' : '') + (secondTextSmallSize ? ' second-text-small' : '')}>
                    {secondText}
            </span>
            : null }
            { icon !== 'none'
              ? <div>
                <MDBIcon icon={icon} className={"main-icon " + iconColor} onClick={clicked} size="lg" />                   
                </div>
             : null }
            </div> 
        </div>
    );
}

export default CardHeader;