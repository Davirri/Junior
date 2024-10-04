import React, { useState } from 'react';

const SubMenu = ({ items }) => {
  const [hoveredImage, setHoveredImage] = useState('');
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleMouseOver = (imageSrc) => {
    const fullImageSrc = `${API_URL}${imageSrc}`;
    setHoveredImage(fullImageSrc);
  };

  const handleMouseOut = () => {
    setHoveredImage('');
  };

  return (
    <div className="menu-sub">
      <ul>
        {items.map((item) => (
          <li
            key={item.name}
            onMouseOver={() => handleMouseOver(item.imageSrc)}
            onMouseOut={handleMouseOut}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className={`image-preview ${hoveredImage ? 'fade-in' : 'fade-out'}`}>
        {hoveredImage && (
          <img src={hoveredImage} alt="Preview" />
        )}
      </div>
    </div>
  );
};

export default SubMenu;
