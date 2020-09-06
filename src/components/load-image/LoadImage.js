import React, {useState} from 'react';
import { MDBIcon, MDBBadge, MDBCol, MDBAlert, MDBRow } from 'mdbreact';
import './LoadImage.css';
import image from '../../assets/image.png';

const LoadImage = ({ fileCallback, imageUrl }) => {
    const [showError, setShowError] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(imageUrl);

    const handleFile = (e) => {    
        const file = e.target.files[0]
        
        if (file != null && file.size > 1000000) {
            return setShowError(true);           
        }else {
            setShowError(false);
        }

        fileCallback(file);
        
        let reader = new FileReader();
        
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        }
    
        reader.readAsDataURL(file);                
    }

    
        const imagePreview = imagePreviewUrl ? <img src={imagePreviewUrl} width="100" alt=""/> :  <img src={image} width="100" alt=""/>

        const alertDialog = showError ? <MDBAlert color="danger">Image size is too large. Please use smaller image</MDBAlert > : null;
        

    return (       
        <div className="load-image">        
            <MDBRow>
                <MDBCol>
                    <label htmlFor="file-input">                 
                        <div className="upload-icon">
                            <h5><MDBBadge color="grey lighten-1" className="load-badge"><MDBIcon icon="file-upload" className="mr-3"/>LOAD IMAGE</MDBBadge></h5>
                        </div>                                                
                    </label>
                    <input id="file-input" type="file" accept="image/*" onChange={handleFile} />                   
                </MDBCol>
                <MDBCol>
                    <div className="imgPreview">
                        {imagePreview}
                    </div>
                </MDBCol>   
            </MDBRow>
            <MDBRow>                
                <div>
                    {alertDialog}
                </div>                      
            </MDBRow>                                                                      
        </div>
    );
}

export default LoadImage;