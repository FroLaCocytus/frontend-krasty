import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalAlert.module.css'; 

const ModalAlert = ({ isOpen, onClose, message, status }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let showTimeoutId;
    let closeTimeoutId;
  
    if (isOpen) {
      setIsActive(true); 
  
      showTimeoutId = setTimeout(() => {
        setIsActive(false); // Плавно скрываем модальное окно через небольшую задержку
      }, 2800); // время, чтобы анимация закончилась
  
      closeTimeoutId = setTimeout(() => {
        onClose(); // Закрываем модальное окно после анимации
      }, 3000); // Полное время отображения модального окна
    }
  
    return () => {
      clearTimeout(showTimeoutId);
      clearTimeout(closeTimeoutId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${isActive ? styles.active : ''} ${status ? styles.greenBorder : styles.redBorder}`}>
        <div className={styles.message}>{message}</div>
      </div>
    </div>,
    document.body
  );
};

export default ModalAlert;
