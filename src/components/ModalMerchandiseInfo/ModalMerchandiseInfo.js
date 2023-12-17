import React, {useState, useContext, useEffect} from "react";
import styles from './ModalMerchandiseInfo.module.css'
import { observer } from 'mobx-react-lite';
import { ReactComponent as CrossSVG } from '../../img/cross.svg';
import { updateMerchandise, deleteMerchandise } from "../../http/merchandiseAPI";
import { Context } from "../../index";
import { getAllMerchandise } from "../../http/merchandiseAPI";
import ModalAlert from "../ModalAlert/ModalAlert";

const ModalMerchandiseInfo = observer(({setIsModalOpen, selectedItem, handleShowAlertModal, page, setPage, setMaxPage}) => {

  const {merchandise} = useContext(Context)

  const [count, setCount] = useState("");
  const [title, setTitle] = useState("");


  useEffect(()=>{
    setTitle(selectedItem.title)
    setCount(selectedItem.count)
  }, [])

// Работа с товарами
const handlerUpdate = async () => {
    const namePattern = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9 ]{0,24}$/;
    const countPattern = /^[1-9]\d{0,3}$/;

    if (!namePattern.test(title) || !countPattern.test(count)) {
        handleShowAlertModal("Вы ввели некоректные данные", false)
        return
    }
    await updateMerchandise(selectedItem.id, title, count)
    .then(data => {
        console.log(data)
        handleShowAlertModal(`Товар ${data.title} успешно обновлён`,true)
    })
    .catch(e => {
        handleShowAlertModal(e.response.data,false)
    })
    getAllMerchandise(page).then(data => {
        merchandise.setMerchandises(data.content)
        setMaxPage(data.totalPages)
    })

  };

  const handlerDelete = async () => {

    await deleteMerchandise(selectedItem.id)
    .then(data => {
        if(data === 200)handleShowAlertModal(`Товар успешно удалён`,true)
    })
    .catch(e => {
        handleShowAlertModal(e.response.data,false)
    })
    getAllMerchandise(page).then(data => {
        merchandise.setMerchandises(data.content)
        if (data.totalPages<page && data.totalPages !== 0){
            setPage(data.totalPages)
        }
    })
    setIsModalOpen(false)
  };

  return (
    <div className={styles.modal}>
    <div className={styles.modal_content}>
        <div className={styles.modal_title}>
            <div className={styles.modal_title_box}>
                <div className={styles.modal_title_text}>{selectedItem.title}</div>
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
            <button className={styles.modal_button_update} onClick={handlerUpdate}>Обновить</button>
            <button className={styles.modal_button_delete} onClick={handlerDelete}>Удалить</button>
        </div>
    </div>
    </div>
  );
});

export default ModalMerchandiseInfo;