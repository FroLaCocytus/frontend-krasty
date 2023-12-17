import React, {useState, useContext, useEffect} from "react";
import styles from './ModalDocInfoRole.module.css'
import { observer } from 'mobx-react-lite';
import { ReactComponent as CrossSVG } from '../../img/cross.svg';
import { downloadFile } from "../../http/documentAPI";
import { Context } from "../../index";

const ModalDocInfo = observer(({setIsModalOpen, selectedItem, handleShowAlertModal, page, setPage, setMaxPage}) => {

    const {user} = useContext(Context)

  const [accessRole, setAccessRole] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(()=>{
    setAccessRole(selectedItem.roles.map(role => role.name))
    setDescription(selectedItem.description)
  }, [])


  const downloadDocument = async () => {
    try {
        const blob = await downloadFile(selectedItem.id, user.role);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', selectedItem.title); // Или другое имя файла
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      } catch (error) {
        handleShowAlertModal(error.message);
      }
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
        <div className={styles.modal_description}>
            <div className={styles.modal_description_text}>Описание</div>
            <div className={styles.modal_description_input}>
                <div className={styles.modal_description_input_text}>{description}</div>
            </div>
        </div>
        <div className={styles.modal_buttons_box}>
            <button className={styles.modal_button_update} onClick={downloadDocument}>Загрузить</button>
        </div>
    </div>
    </div>
  );
});

export default ModalDocInfo;