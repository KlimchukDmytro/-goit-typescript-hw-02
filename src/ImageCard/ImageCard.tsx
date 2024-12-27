import React from "react";
import s from "./ImageCard.module.css";

interface ImageCardProps {
  description: string | null;
  small: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ description, small }) => {
  return <img className={s.img} src={small} alt={description || "image"} />;
};

export default ImageCard;
