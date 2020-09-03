import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = ({ selectedPage }) => {
    if(selectedPage === "homepage") {
        return null;
    }

    return (
        <div className="footer-bar">
            <MDBFooter color="blue" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">Homeowner Association Management System</h5>
                        <p>
                            HOA software enable management companies and communities to provide faster responses and better service to their clients and owners.
                        </p>
                    </MDBCol>
                    <MDBCol md="6">
                        <h5 className="title">Useful Links</h5>
                        <ul>
                        <li className="list-unstyled">
                            <a href="#!">Link 1</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Link 2</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Link 3</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Link 4</a>
                        </li>
                        </ul>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="#"> YaronY </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        </div>
    );
};

export default Footer;