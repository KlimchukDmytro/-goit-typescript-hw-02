import React from "react";
import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  handleLoadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleLoadMore }) => {
  return (
    <button className={s.btn} type="button" onClick={handleLoadMore}>
      Load more ...
    </button>
  );
};

export default LoadMoreBtn;
