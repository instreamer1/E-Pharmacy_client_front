import ReactModal from 'react-modal';
import css from './Modal.module.css';
import iconSprite from '../../assets/sprite.svg';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    // 1. Запоминаем текущую позицию скролла
    const scrollY = window.scrollY;
    const body = document.body;

    // 2. Блокируем скролл
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflowY = 'hidden';

    return () => {
      // 3. Восстанавливаем скролл
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflowY = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      closeTimeoutMS={300}
      ariaHideApp={false}>
      <button
        className={css.closeBtn}
        onClick={onClose}
        aria-label='Close modal'>
        <svg className={css.icon}>
          <use href={`${iconSprite}#closeModal`}></use>
        </svg>
      </button>
      <div className={css.modalBody}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
