import React from 'react';
import { Carousel } from 'react-bootstrap';
import Placeholder from '../assets/images/placeholder.jpg'; // Adjust the import path

const ResponsiveGalleryCarousel = ({ galleryArray }) => {
    // Sanitize the gallery array to replace invalid or empty images with the placeholder
    const sanitizedGallery = (galleryArray || []).map((image) =>
        image && image.trim().length > 0 ? image : Placeholder
    );

    // Determine number of images per slide based on screen size
    const getImagesPerSlide = () => {
        return window.innerWidth >= 768 ? 3 : 1;
    };

    // Generate carousel items dynamically
    const generateCarouselItems = () => {
        const imagesPerSlide = getImagesPerSlide();
        const items = [];

        // Calculate total number of slides needed
        const totalSlides = Math.ceil(sanitizedGallery.length / imagesPerSlide);

        for (let i = 0; i < totalSlides; i++) {
            const startIndex = i * imagesPerSlide;
            const endIndex = startIndex + imagesPerSlide;
            const slideImages = sanitizedGallery.slice(startIndex, endIndex);

            // Handle case when there's only one item on a slide (responsive)
            if (slideImages.length === 1) {
                items.push(
                    <Carousel.Item key={i} interval={3000}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-12">
                                <img
                                    src={slideImages[0]}
                                    alt={`Gallery image ${startIndex + 1}`}
                                    className="w-100"
                                />
                            </div>
                        </div>
                    </Carousel.Item>
                );
            } else {
                items.push(
                    <Carousel.Item key={i} interval={3000}>
                        <div className="row d-flex justify-content-around">
                            {slideImages.map((image, subIndex) => (
                                <div
                                    key={subIndex}
                                    className={`col-${12 / imagesPerSlide}`}
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery image ${startIndex + subIndex + 1}`}
                                        className="w-100"
                                    />
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                );
            }
        }

        return items;
    };

    return (
        <Carousel
            controls={false}
            touch={true}
            indicators={false}
            responsive={true}
        >
            {generateCarouselItems()}
        </Carousel>
    );
};

export default ResponsiveGalleryCarousel;
