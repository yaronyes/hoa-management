import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useStore } from 'react-redux';
import selectVoting from '../../selectors/votingSelector';
import { getVoting } from '../../actions/votingActions';
import ToolTipPieChart from '../charts/ToolTipPieChart';
import { MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBCard } from 'mdbreact';

const VotingChartView = ({ votes, auth, getVoting, filteredActiveVoting, filteredDoneVoting, voting, isActiveVoting/*, headerText*/ }) => {
    const [currentVoting, setCurrentVoting] = useState(voting);

    useEffect(() => {
        if(votes.length === 0) {
            getVoting();
        } else if(!currentVoting) {
            setCurrentVoting(isActiveVoting ? filteredActiveVoting[0] : filteredDoneVoting[0]);
        }                
    }, [votes]);


    if(!currentVoting) {
        return <div style={{width: '100%'}}>
                  <img src="dont_know.png" className="img-fluid" alt=""/>
              </div>
    }

    const getVotingToDisplay = () => {
        let votingForDisplay = [];
        if(currentVoting) {
            if(isActiveVoting) {
                votingForDisplay =  [...currentVoting.votesForDisplay, { 
                    title: "None Voted",
                    value: (auth.user.tenants.length !== 0) ? auth.user.tenants.length - currentVoting.votes.length : 1,
                    color: 'red'}].filter(item => item.value !== 0);
            } else {
                [...currentVoting.votesForDisplay].filter(item => item.value !== 0);
            }
        }

        return votingForDisplay;
    }
  
    return (
        <div>            
            {/* <MDBRow className="voting-results-header">
                        <MDBCol style={{ textAlign: "left" }}>
                            <h2>{headerText}</h2>
                        </MDBCol>                            
                    </MDBRow> */}
            <MDBCard>
                <MDBCardBody>
                      <ToolTipPieChart data={getVotingToDisplay()} header={currentVoting.title} isPercentage={false}/>                 
                </MDBCardBody>    
            </MDBCard>
        </div>
    );
};

VotingChartView.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    filteredVoting: PropTypes.array.isRequired,
    getVoting: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    votes: state.voting,
    filteredActiveVoting: selectVoting(state.voting, state.votingFilters, true),
    filteredDoneVoting: selectVoting(state.voting, state.votingFilters, false)
});

export default connect(mapStateToProps, { getVoting })(VotingChartView);