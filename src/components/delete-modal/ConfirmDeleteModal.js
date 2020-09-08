import React from 'react';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import RoundedBtn from '../buttons/RoundedBtn';

const ConfirmDeleteModal = ({ toggle, modal, title, onDeleteConfirm }) => {
    return (
        <div>                
            <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader className='blue-gradient white-text' toggle={toggle}>Deleting '{title}'</MDBModalHeader>
                <MDBModalBody>
                    Are you sure you want to delete {title} ?
                </MDBModalBody>
                <MDBModalFooter>                    
                    <RoundedBtn color="danger" onClick={onDeleteConfirm} icon="trash" caption="Yes" size="sm"/>
                    <RoundedBtn color="info" onClick={toggle} icon="window-close" caption="No" size="sm"/>   
                </MDBModalFooter>
            </MDBModal>
        </div>
    );
};

export default ConfirmDeleteModal;