import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  img: {
    alt_description: string;
    urls: {
      regular: string;
    };
    likes: number;
    description: string;
    user: {
      name: string;
      location?: string;
      total_photos: number;
      portfolio_url?: string;
    };
  };
}

const ImageModal = ({ isOpen, closeModal, img }: ImageModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName={s.background}
      className={s.modal}
    >
      <h2 className={s.header}>{img.alt_description}</h2>
      <div className={s.image}>
        <img
          className={s.img}
          src={img.urls.regular}
          alt={img.alt_description}
        />
      </div>
      <div className={s.text}>
        <p>Likes: {img.likes}</p>
        <p>{img.description}</p>
        <p>Author: {img.user.name}</p>
        {img.user.location && <p>Location: {img.user.location}</p>}
        <p>Total photos: {img.user.total_photos}</p>
        {img.user.portfolio_url && (
          <a
            href={img.user.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio
          </a>
        )}
      </div>
      <button onClick={closeModal} className={s.btn}>
        Close
      </button>
    </Modal>
  );
};

export default ImageModal;
