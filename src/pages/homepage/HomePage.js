import React, { useEffect } from 'react';
import { MDBView, MDBMask } from 'mdbreact';
import homePageImage from '../../assets/HOA-photo-2.jpg';

const HomePage = ({ onPageSelected }) => {
    useEffect(() => onPageSelected('homepage'), []);

    return (
        <div className="home-page">
            {/* https://www.prattattorneys.com/wp-content/uploads/2019/01/HOA-photo-2.jpg */}
            <MDBView src={homePageImage}>
                <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                <h2>This Navbar is fixed</h2>
                <h5>It will always stay visible on the top, even when you scroll down</h5>
                <br />
                <p>Full page intro with background image will be always displayed in full screen mode, regardless of device </p>
                </MDBMask>
          </MDBView>
        </div>
    );    
}

export default HomePage;