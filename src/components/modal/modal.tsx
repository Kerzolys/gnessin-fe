import { createPortal } from "react-dom";
import styles from "./modal.module.scss";
import { useEffect } from "react";

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const modalRoot = document.querySelector("#modal-root");

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  },[]);

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        {children}
        <button
          onClick={onClose}
          className={styles.modal__content__closeButton}
        >
          &times;
        </button>
      </div>
    </div>,
    modalRoot!
  );
};
