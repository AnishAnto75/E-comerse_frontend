import React from 'react';

const FadedEdgesImage = ({ imageUrl }) => {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      {/* Image */}
      <img
        src={imageUrl}
        alt="Faded Edges Image"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient from-transparent via-transparent to-black opacity-50">jhbkjn</div>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black opacity-50">kjnkkb</div>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black opacity-50">kjknn</div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black opacity-50">njojol</div> */}
    </div>
  );
};

export default FadedEdgesImage;