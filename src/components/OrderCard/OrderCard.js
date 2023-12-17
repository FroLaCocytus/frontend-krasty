import React, { useState } from "react";
import styles from './OrderCard.module.css';

const Order = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAcceptOrder = () => {
    // Обработка принятия заказа
  };

  return (
    <div className={isExpanded ? styles.order_expanded : styles.order} onClick={toggleExpand}>
        <div className={styles.number}>Заказ № {order.id}</div>
      {isExpanded && (
        <div className={styles.bottom}>
          <div className={styles.description}>{order.order_description}</div>
          <button onClick={handleAcceptOrder}>Принять заказ</button>
        </div>
      )}
    </div>
  );
};

export default Order;