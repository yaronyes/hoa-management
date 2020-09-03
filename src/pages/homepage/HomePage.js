import React, { useEffect } from 'react';
import { MDBView, MDBMask } from 'mdbreact';
import homePageImage from '../../assets/HOA-photo-2.jpg';

const HomePage = ({ onPageSelected }) => {
    useEffect(() => onPageSelected('homepage'), []);

    return (
        <div className="home-page">           
            <MDBView src={homePageImage}>
                <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                <h2>Homeowner Association Management System</h2>
                <h5>We enable management companies and communities to provide faster responses and better service to their clients and owners.</h5>
                <br />
                <p></p>
                </MDBMask>
          </MDBView>
        </div>
    );    
}

export default HomePage;