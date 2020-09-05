import React, { useState } from 'react';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn, MDBFormInline } from "mdbreact";

const AccordionNav = ({ showPlusIcon, plusIcon="plus", plusClicked, showSortingDirectionIcon, sortingDirectionClicked }) => {
    //const [isOpen, setIsOpen] = useState(false);
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
            <MDBNavbar color="blue-gradient" dark expand="md" className="white-text">
                {/* <MDBNavbarToggler onClick={() => {setIsOpen(!isOpen)}} /> */}
                {/* <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar> */}
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
                                    <MDBIcon icon={plusIcon} size="3x" /> 
                                </MDBBtn>
                            </div>
                        </MDBFormInline>
                    </MDBNavItem>   
                    : null }              
                </MDBNavbarNav>
                {/* </MDBCollapse> */}
            </MDBNavbar>   
        </div>
    );
};

export default AccordionNav;