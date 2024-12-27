import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string | null;
  alt_description: string | null;
}

interface ImageGalleryProps {
  results: Image[];
  openModal: (img: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ results, openModal }) => {
  return (
    <div>
      <ul className={s.imgList}>
        {results.map((img) => (
          <li key={img.id} className={s.imgItem} onClick={() => openModal(img)}>
            <ImageCard small={img.urls.small} description={img.description} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
