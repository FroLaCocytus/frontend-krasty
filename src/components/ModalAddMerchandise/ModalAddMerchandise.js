import React, {useState, useContext} from "react";
import styles from './ModalAddMerchandise.module.css'
import { observer } from 'mobx-react-lite';
import { ReactComponent as CrossSVG } from '../../img/cross.svg';
import { createMerchandise } from "../../http/merchandiseAPI";
import { Context } from "../../index";
import { getAllMerchandise } from "../../http/merchandiseAPI";

const ModalAddMerchandise = observer(({setIsModalOpen, handleShowAlertModal, page, setMaxPage}) => {

    const {merchandise} = useContext(Context)

    const [count, setCount] = useState("");
    const [title, setTitle] = useState("");

    const checkTitle = (title) => {
        const titleStartsWithLetter = /^[a-zA-Zа-яА-Я]/;
        const titleSymbol = /^[a-zA-Zа-яА-Я0-9 ]*$/;
        const titleLength =  /^.{1,25}$/;
    
        if (!titleStartsWithLetter.test(title)) {
            return "Ошибка: название должно начинаться с буквы";
        }
        if (!titleSymbol.test(title)) {
            return "Ошибка: название может включать только буквы, цифры и пробелы";
        }
        if (!titleLength.test(title)) {
            return "Ошибка: длина названия должна быть от 1 до 25 символов";
        }
        return null; 
    };
    
    const checkCount = (count) => {
        const countIsNotEmpty = count.trim().length > 0;
        const countIsNumber = /^[0-9]+$/.test(count);
        const countInRange = /^[1-9]\d{0,4}$/.test(count);
      
        if (!countIsNotEmpty) {
          return "Ошибка:  поле \"количество\" не может быть пустым";
        }
        if (!countIsNumber) {
          return "Ошибка: количество должно быть целым числом";
        }
        if (!countInRange) {
          return "Ошибка: количество должно быть целым числом от 1 до 99999";
        }
        return null;
      };

    // Функция создания товара
    const handlerCreate = async () => {

        const titleError = checkTitle(title);
        if (titleError) {
            handleShowAlertModal(titleError, false);
            return;
        }
    
        const countError = checkCount(count);
        if (countError) {
            handleShowAlertModal(countError, false);
            return;
        }

        await createMerchandise(title, count).then(data => {
            handleShowAlertModal(`Товар ${data.title} успешно добавлен`,true)
            setTitle("")
            setCount("")
        })
        .catch(e => {
            handleShowAlertModal(e.response.data,false)
        })
        getAllMerchandise(page).then(data => {
            merchandise.setMerchandises(data.content)
            setMaxPage(data.totalPages)
        })  
    };

  return (
    <div className={styles.modal}>
    <div className={styles.modal_content}>
        <div className={styles.modal_title}>
            <div className={styles.modal_title_box}>
                <div className={styles.modal_title_text}>Добавление товара</div>
                <div className={styles.modal_title_img_box}>
                    <CrossSVG className={styles.modal_title_img} onClick={()=>{setIsModalOpen(false)}}/>
                </div>
            </div>
            <div className={styles.line_big}></div>
        </div>
        
        <div className={styles.modal_input_box}>
            <div className={styles.modal_box_text}>Название</div>
            <input value={title} onChange={e => setTitle(e.target.value)} className={styles.modal_box_input}></input>
        </div>
        <div className={styles.modal_input_box}>
            <div className={styles.modal_box_text}>Количество</div>
            <input value={count} onChange={e => setCount(e.target.value)} className={styles.modal_box_input}></input>
        </div>

        <div className={styles.modal_buttons_box}>
            <button className={styles.modal_button} onClick={handlerCreate}>Добавить</button>
        </div>
    </div>
    </div>
  );
});

export default ModalAddMerchandise;