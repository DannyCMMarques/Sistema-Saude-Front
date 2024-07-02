import { useState, useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, children, size, titulo, onClose }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleCloseModal = () => {
    setModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  let contentClass;
  switch (size) {
    case "small":
      contentClass = styles.modalContentS;
      break;
    case "medium":
      contentClass = styles.modalContentM;
      break;
    case "large":
      contentClass = styles.modalContentL;
      break;
    default:
      contentClass = styles.modalContent;
  }

  return (
    <div
      className={styles.modalContainer}
      style={{ display: modalOpen ? "block" : "none" }}
    >
      <div className={contentClass}>
        <div className="mb-3 d-flex justify-content-between">
          <p className={styles.tituloModal}>{titulo}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
