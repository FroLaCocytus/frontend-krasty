import React from 'react';
import styles from './OrderStatusBar.module.css';

const OrderStatusBar = ({ status }) => {
  const statuses = ['created', 'accepted', 'packaging', 'delivering'];
  const statusIndex = statuses.indexOf(status);

  // Объект с переводами статусов на русский язык
  const statusTranslations = {
    created: 'Заказ создан',
    accepted: 'Заказ готовится',
    packaging: 'Заказ собирается',
    delivering: 'Заказ в пути'
  };

  const isNextToActive = (index) => index === statusIndex + 1;

  return (
    <div className={styles.orderStatusContainer}>
      {statuses.map((s, index) => (
        <React.Fragment key={s}>
            <div
            className={`${styles.statusLine} ${index <= statusIndex ? styles.active : ''} ${
                index === 0 ? styles.firstLine : ''
            } ${isNextToActive(index) ? styles.loading : ''}`}
            >
            </div>
          
          <div className={`${styles.statusPoint} ${index <= statusIndex ? styles.active : ''}`}>
            <div className={styles.statusText}>{statusTranslations[s]}</div>
          </div>
          
          {index === statuses.length - 1 && (
            <div className={`${styles.statusLine} ${styles.lastLine} ${index <= statusIndex ? styles.active : ''}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderStatusBar;
