import React, { useState } from 'react';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBIcon, MDBBtn, MDBFormInline } from "mdbreact";
import FloatingBtn from '../buttons/FloatingBtn';

const AccordionNav = ({ showPlusIcon, plusIcon="plus", plusClicked, showSortingDirectionIcon, sortingDirectionClicked, floatingMode = false }) => {    
    const [isUp, setIsUp] = useState(true);

    const onSortingDirectionClicked = () => {
        if(sortingDirectionClicked) {
            sortingDirectionClicked(!isUp);
        }

        setIsUp(!isUp)
    }

    const onPlusClicked = () => {        
        if(plusClicked) {
            plusClicked();
        }
    }

    const style = {
        boxShadow: "none",
        margin: 0,
        padding: "0 .5rem",       
    }

    return (
        <div>
            { !floatingMode
            ? <MDBNavbar color="blue-gradient" dark expand="md" className="white-text" style={{ height: "46px" }}>
                <MDBNavbarNav left>
                    { showSortingDirectionIcon
                     ? <MDBNavItem onClick={onSortingDirectionClicked}>                        
                        <MDBFormInline waves>
                            <div className="md-form my-0">
                                <MDBBtn size="sm" style={style} color="transparent">
                                    <MDBIcon icon={isUp ? "angle-up" : "angle-down"} size="3x" />
                                </MDBBtn>
                            </div>
                        </MDBFormInline>
                    </MDBNavItem>                           
                    : null }
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    { showPlusIcon
                      ?  <MDBNavItem onClick={onPlusClicked}>                        
                        <MDBFormInline waves>
                            <div className="md-form my-0">
                                <MDBBtn size="sm" style={style} color="transparent">
                                    <MDBIcon icon={plusIcon} size="2x" /> 
                                </MDBBtn>
                            </div>
                        </MDBFormInline>
                    </MDBNavItem>   
                    : null }              
                </MDBNavbarNav>                
            </MDBNavbar>  
            // <div className={'d-flex ' + (showSortingDirectionIcon && showPlusIcon? 'justify-content-between' : 'justify-content-end')}>
            : <div className={'d-flex justify-content-end'}>
                 { showSortingDirectionIcon 
                ? <FloatingBtn color='blue' icon={isUp ? "angle-up" : "angle-down"} onBtnClicked={onSortingDirectionClicked}/>
                : null }
                { showPlusIcon
                ? <FloatingBtn color='blue' icon={plusIcon} onBtnClicked={onPlusClicked}/>
                : null }
            </div> }
        </div>
    );
};

export default AccordionNav;