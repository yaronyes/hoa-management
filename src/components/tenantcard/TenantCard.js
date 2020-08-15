import React from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
    MDBBtn,
    MDBIcon,
    Fragment
} from 'mdbreact';
import './TenantCard.css';


const TenantCard = ({ toggleCollapse, tenant, isOpen }) => {
    const avatar = `https://yyes-hoa-management-server.herokuapp.com/users/${tenant._id}/avatar?${new Date().getTime()}`;

    return (
        <div className="tenant-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>
                <div 
                onClick={() => toggleCollapse(tenant._id)}
                className='card-header text-uppercase blue lighten-3 z-depth-1'
                role="tab"
                >
                    <span className='white-text font-weight-bold'>
                        {tenant.name}
                    </span>
                </div >
                <MDBCollapse id={tenant._id} isOpen={isOpen}>
                <MDBCardBody>
                    <MDBRow className='my-3'>
                        <MDBCol md='3' className='img-col'>
                            <MDBView className='z-depth-1'>
                            <MDBCardImage
                                className='img-fluid z-depth-1'
                                src={avatar}
                                alt=''                                
                            />
                            </MDBView>
                        </MDBCol>
                        <MDBCol md='9' className="data-col">
                            {/* <h2 className='font-weight-bold mb-3 black-text'>
                            Hi! I am the first one.
                            </h2> */}
                            <MDBRow>
                                <MDBCol className="text-col">
                                    <p><span className="l-title">Name: </span>{tenant.name}</p>
                                    <p><span className="l-title">Email: </span>{tenant.email}</p>
                                    <p><span className="l-title">Apt: </span>#{tenant.apartment}</p>    
                                </MDBCol>                             
                            </MDBRow>
                            <MDBRow>
                                <MDBCol  md="6" className="offset-md-6">
                                    <div className="btn-group-tenant">      
                                        <MDBBtn rounded color="info" className="btn-rounded">
                                            <MDBIcon icon="user-edit" /> Update
                                        </MDBBtn>
                                        <MDBBtn rounded color="danger" className="btn-rounded">
                                            <MDBIcon icon="trash" /> Delete
                                        </MDBBtn>
                                    </div>    
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>
        </div>
    );

};

export default TenantCard;