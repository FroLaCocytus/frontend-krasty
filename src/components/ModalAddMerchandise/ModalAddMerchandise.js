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

    // Функция создания товара
    const handlerCreate = async () => {
        // Регулярные выражения для проверки ввода
        const namePattern = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9 ]{0,24}$/;
        const countPattern = /^[1-9]\d{0,4}$/;

        // Проверка корректности введенных данных
        if (!namePattern.test(title) || !countPattern.test(count)) {
            handleShowAlertModal("Вы ввели некоректные данные", false)
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