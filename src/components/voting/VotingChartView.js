import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectVoting from '../../selectors/votingSelector';
import { getVoting } from '../../actions/votingActions';
import ToolTipPieChart from '../charts/ToolTipPieChart';
import { MDBCardBody, MDBCard } from 'mdbreact';
import Spinner from '../spinner/Spinner';

const VotingChartView = ({ loader, votes, auth, getVoting, filteredActiveVoting, filteredDoneVoting, voting, isActiveVoting, itemPositionInTheArray, isPercentage=false }) => {
    const [currentVoting, setCurrentVoting] = useState(voting);

    useEffect(() => {
        if(votes.length === 0) {
            getVoting();
        } else if(!currentVoting) {
            if(isActiveVoting) {
                if(filteredActiveVoting.length > itemPositionInTheArray) {
                    setCurrentVoting(filteredActiveVoting[itemPositionInTheArray]);
                }
            } else {
                if(filteredDoneVoting.length > itemPositionInTheArray) {
                    setCurrentVoting(filteredDoneVoting[itemPositionInTheArray]);
                }
            }
        }                
    }, [votes]);


    if(!currentVoting) {
        return null;
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
            { loader.loadVoting         
            ?  <Spinner />
            : <MDBCard>
                <MDBCardBody>
                      <ToolTipPieChart chartData={getVotingToDisplay()} header={currentVoting ? currentVoting.title : ""} isPercentage={isPercentage} useSmallChart={false}/>                 
                </MDBCardBody>    
            </MDBCard> }
        </div>
    );
};

VotingChartView.propTypes = {
    auth: PropTypes.object.isRequired,
    loader: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    getVoting: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    loader: state.loader,
    errors: state.errors,
    votes: state.voting,
    filteredActiveVoting: selectVoting(state.voting, state.votingFilters, true),
    filteredDoneVoting: selectVoting(state.voting, state.votingFilters, false)
});

export default connect(mapStateToProps, { getVoting })(VotingChartView);