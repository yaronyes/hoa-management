import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView
  } from 'mdbreact';

const TenantsPage = () => {
    const [collapseID, setCollapseID] = useState('collapse1');
    
    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '')

    return (
        <div className="tenants-page">
            <MDBContainer>
                <MDBRow>
                <MDBContainer className='accordion md-accordion accordion-1'>
          <MDBCard style={{ backgroundColor: 'transparent' }}>
            <div 
              onClick={() => toggleCollapse("collapse1")}
              className='card-header text-uppercase blue lighten-3 z-depth-1'
              role="tab"
            >
              <span className='white-text font-weight-bold'>
                I am the first title of accordion
              </span>
            </div >
            <MDBCollapse id='collapse1' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Hi! I am the first one.
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris
                    </p>
                    <p className='mb-0 '>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </MDBCol>
                  <MDBCol md='4' className='mt-3 pt-2'>
                    <MDBView className='z-depth-1'>
                      <MDBCardImage
                        className='img-fluid z-depth-1'
                        src='https://mdbootstrap.com/img/Photos/Others/nature.jpeg'
                        alt=''
                      />
                    </MDBView>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard style={{ backgroundColor: 'transparent' }}>
            <div 
              onClick={() => toggleCollapse('collapse2')}
              className='text-uppercase blue lighten-3 z-depth-1'
            >
              <span className='white-text font-weight-bold'>
                I am the second title of accordion
              </span>
            </div >
            <MDBCollapse id='collapse2' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Hi! I am the second one.
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris
                    </p>
                    <p className='mb-0 '>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </MDBCol>
                  <MDBCol md='4' className='mt-3 pt-2'>
                    <MDBView className='z-depth-1'>
                      <MDBCardImage
                        className='img-fluid'
                        src='https://mdbootstrap.com/img/Photos/Others/nature.jpeg'
                        alt=''
                      />
                    </MDBView>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard style={{ backgroundColor: 'transparent' }}>
            <div 
              onClick={() => toggleCollapse('collapse3')}
              className='text-uppercase blue lighten-3 z-depth-1'
            >
              <span className='white-text font-weight-bold'>
                I am the third title of accordion
              </span>
            </div >
            <MDBCollapse id='collapse3' isOpen={collapseID}>
              <MDBCardBody>
                <MDBRow className='my-4'>
                  <MDBCol md='8'>
                    <h2 className='font-weight-bold mb-3 black-text'>
                      Hi! I am the third one.
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris
                    </p>
                    <p className='mb-0 '>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </MDBCol>
                  <MDBCol md='4' className='mt-3 pt-2'>
                    <MDBView className='z-depth-1'>
                      <MDBCardImage
                        className='img-fluid'
                        src='https://mdbootstrap.com/img/Photos/Others/nature.jpeg'
                        alt=''
                      />
                    </MDBView>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>
        </MDBContainer>
                </MDBRow>        
                <MDBRow>

                </MDBRow>     
            </MDBContainer>           
        </div>
    );
}


export default TenantsPage;