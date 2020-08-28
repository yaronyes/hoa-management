import React from 'react';
import { MDBCard } from 'mdbreact';

const AccordionContainer = ({ children }) => {
    return (
        <div>
            <MDBCard className="card-body" style={{ marginTop: "1rem", minHeight: "45vh" }} >                  
                {children}
            </MDBCard>
        </div>
    );
};

export default AccordionContainer;