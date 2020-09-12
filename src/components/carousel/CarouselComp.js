import React from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";

const CarouselComp = ({ itemsToShow }) => {

    const carouselItemsToDisplay = itemsToShow.map((item, index) => 
        <MDBCarouselItem key={index} itemId={index + 1}>
            <MDBView>
                <img
                className="d-block w-100 h-50"
                src={item.src}
                alt=""
                />
            <MDBMask overlay="black-light" />
            </MDBView>
            <MDBCarouselCaption>
                <h3 className="h3-responsive">{item.headline}</h3>
                <p>{item.text}</p>
            </MDBCarouselCaption>
        </MDBCarouselItem>
    );

    return (
        <MDBContainer>
            <MDBCarousel style={{height:  "450px"}}
            activeItem={1}
            length={carouselItemsToDisplay.length}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
            >
            <MDBCarouselInner>
                {carouselItemsToDisplay}
            </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
};

export default CarouselComp;