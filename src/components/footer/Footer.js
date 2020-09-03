import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";

const Footer = ({ selectedPage }) => {
    if(selectedPage === "homepage") {
        return null;
    }

    const style = {
        position: "absolute",
        bottom: 0,
        width: "100%",
        marginTop: "30px"
    }

    return (
        <div className="footer-bar" style={style}>
            <MDBFooter color="blue" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                    <MDBCol>
                        <h5 className="title">Homeowner Association Management System</h5>
                        <p>
                           We enable management companies and communities to provide faster responses and better service to their clients and owners.
                        </p>
                    </MDBCol>
                    {/* <MDBCol md="6">
                        <h5 className="title">Useful Links</h5>
                        <ul>
                        <li className="list-unstyled">
                            <a href="#!">Link 1</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Link 2</a>
                        </li>                       
                        </ul>
                    </MDBCol> */}
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/yaronyes/" target="_blank" rel="noopener noreferrer"> YaronY <MDBIcon fab icon="github" size="2x" className="black-text" inverse={true}/></a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        </div>
    );
};

export default Footer;