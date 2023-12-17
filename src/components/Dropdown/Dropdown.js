import React from 'react';
import styles from './Dropdown.module.css'
import { observer } from 'mobx-react-lite';

const Dropdown = observer(({role, setRole, options}) => {

  const handleSelect = (option) => {
    setRole(option);
    console.log(role)
  };

  return (
    <div className={styles.container}>
      <select className={role ? styles.select_true : styles.select_false} value={role} onChange={(e) => handleSelect(e.target.value)}>
        <option  hidden value="">Роль</option>
        {options.map((option) => (
          <option className={styles.option} key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
});

export default Dropdown;