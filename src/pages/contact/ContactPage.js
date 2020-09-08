import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBInput, MDBCol, MDBRow, MDBAlert } from 'mdbreact';
import RoundedBtn from '../../components/buttons/RoundedBtn';
import { useHistory } from "react-router-dom";
import { sendContactUs } from '../../utils/utils';

const ContactPage = ({ onPageSelected }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();
    
    useEffect(() => onPageSelected('contact'), []);    

    const onPageSubmitted = async () => {
        const response = await sendContactUs({
            name,
            email,
            subject,
            message
        });

        if(response.status === 200) {
            setShowAlert(true);
        }    
    }

    return (
        <div>
            <MDBContainer className="text-left grey-text">
                <MDBRow>
                    <MDBCol>
                    <h2 className="h1-responsive font-weight-bold text-center my-4">
                      Contact us
                    </h2>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-center">            
                    <MDBCol md="6">
                        <div className="md-form">                    
                            <MDBInput
                            icon="user"
                            label="Your name"
                            iconClass="grey-text"
                            type="text"
                            id="form-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="md-form">
                            <MDBInput
                            icon="envelope"
                            label="Your email"
                            iconClass="grey-text"
                            type="email"
                            id="form-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="md-form">
                            <MDBInput
                            icon="tag"
                            label="Subject"
                            iconClass="grey-text"
                            type="text"
                            id="form-subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className="md-form">
                            <MDBInput
                            icon="pencil-alt"
                            label="Your message"
                            iconClass="grey-text"
                            type="textarea"
                            id="form-text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <RoundedBtn color="primary" icon="envelope" caption="Submit" onClick={onPageSubmitted} />
                        </div>
                    </MDBCol>    
                </MDBRow>
                <MDBRow className="justify-content-center">
                    { showAlert 
                    ? <MDBAlert color="success" >
                        Message successfully sent <RoundedBtn color="primary" icon="thumbs-up" caption="Ok" size="sm" onClick={() => history.push('/')} />
                    </MDBAlert>            
                    : null }
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default ContactPage;