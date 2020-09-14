import React, { useEffect } from 'react';
import { MDBView, MDBMask } from 'mdbreact';
import homePageImage from '../../assets/HOA-photo-2.jpg';
import dashboardImage from '../../assets/dashboard.PNG';
import issuePage2Image from '../../assets/issue-page-2.PNG';
import issuesPageImage from '../../assets/issues-page.PNG';
import messagePageImage from '../../assets/messages-page.PNG';
import messagePage2Image from '../../assets/messages-page-2.PNG';
import tenantPageImage from '../../assets/tenant-page.PNG';
import tenantsDashboardImage from '../../assets/tenants-dashboard.PNG';
import votingPageImage from '../../assets/voting-page.PNG';
import CarouselComp from '../../components/carousel/CarouselComp';
import './HomePage.css';

const HomePage = ({ onPageSelected }) => {
    useEffect(() => onPageSelected('homepage'), []);

    const carouselItems = [
        {
            src: dashboardImage,
            headline: "Committee manager dashboard",
            text: ""
        },
        {
            src: issuePage2Image,
            headline: "Issue page",
            text: ""
        },
        {
            src: issuesPageImage,
            headline: "Issue page",
            text: ""
        },
        {
            src: messagePageImage,
            headline: "Message page",
            text: ""
        },
        {
            src: messagePage2Image,
            headline: "Message page",
            text: ""
        },
        {
            src: tenantPageImage,
            headline: "Tenant page",
            text: ""
        },
        {
            src: tenantsDashboardImage,
            headline: "Tenant dashboard page",
            text: ""
        },
        {
            src: votingPageImage,
            headline: "Voting Page",
            text: ""
        }
    ]

    return (
        <div className="home-page">           
            <MDBView src={homePageImage}>
                <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                <h2>Homeowner Association Management System</h2>
                <h5>We enable management companies and communities to provide faster responses and better service to their clients and owners.</h5>
                <CarouselComp itemsToShow={carouselItems} style={{height:  "600px"}} />
                </MDBMask>                
          </MDBView>          
        </div>
    );    
}

export default HomePage;