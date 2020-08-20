import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const VotingPage = () => {
    return (
        <div className="voting-page">
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBRow>
                            Active Voting
                        </MDBRow>
                        <MDBRow>
                            New Voting
                        </MDBRow>
                        <MDBRow>
                            Voting
                        </MDBRow>
                    </MDBCol>
                    <MDBCol>
                        <MDBRow>
                            Voting Results
                        </MDBRow>
                        <MDBRow>
                            Filter
                        </MDBRow>
                        <MDBRow>
                            Voting
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>           
        </div>
    );
}


export default VotingPage;