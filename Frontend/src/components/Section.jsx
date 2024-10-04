import React from 'react';

const Section = ({ title, paragraph1, paragraph2, imageSrc }) => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const fullImageSrc = `${API_URL}${imageSrc}`;

  return (
    <div className="section-container">
      <div className='text-container'>
        <p className='paragraph-container'>{paragraph1}</p>
        <h2>{title}</h2>
        <p>{paragraph2}</p>
        <button className='button-container'>Product Details</button>
      </div>
      <div className="image-container">
        <img src={fullImageSrc} alt={title} />
      </div>
    </div>
  );
};

export default Section;
