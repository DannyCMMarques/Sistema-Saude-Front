// import { X } from 'lucide-react';
// import styles from './Modal.module.css'
// const Modal2 = ({ isOpen, children,onClose }) => {
//   const handleCloseModal = () => {
//     if (onClose) {
//       onClose();
//     }
//   };


//   return (
//     <div
//       className={styles.modalContainer}
//       style={{ display: isOpen ? "block" : "none" }}
//     >
//       <div
//         className={styles.modalContent}
//       >
//      {children}
//       </div>
//     </div>
//   );
// };

// export default Modal2;


// Modal.js
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
          {/* <X className={styles.closeModal} onClick={handleCloseModal} /> */}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;