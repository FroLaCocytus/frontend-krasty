import React, {useState, useContext} from "react";
import styles from './ModalAddDoc.module.css'
import { observer } from 'mobx-react-lite';
import { ReactComponent as CrossSVG } from '../../img/cross.svg';
import { updloadDocument } from "../../http/documentAPI";
import { Context } from "../../index";
import { getAllDocuments } from "../../http/documentAPI";

const ModalAddDoc = observer(({setIsModalOpen, handleShowAlertModal, page, setPage, setMaxPage}) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const {documentStore} = useContext(Context)
  const {user} = useContext(Context)

  const options = ["merchandiser", "chef"];
  const [accessRole, setAccessRole] = useState([]);
  const [description, setDescription] = useState("");

// Работа с файлом
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
        handleShowAlertModal("Вы не загрузили файл", false)
        return
    }

    if (description === "") {
        handleShowAlertModal("Вы не написали описание", false)
        return
    }
    await updloadDocument(selectedFile, description, user.role, accessRole)
    .then(data => {
        handleShowAlertModal(`Документ ${data.title} успешно добавлен`,true)
        setSelectedFile(null)
        setDescription("")
        setAccessRole([])
    })
    .catch(e => {
        handleShowAlertModal(e.response.data, false)
    })
    getAllDocuments(page,user.role).then(data => {
        documentStore.setDocuments(data.content)
        setMaxPage(data.totalPages)
    })

  };

// Работа с Ролями
  const deleteRole = (roleIndex) => {
    setAccessRole((prevRoles) => {
      const updatedRoles = [...prevRoles];
      updatedRoles.splice(roleIndex, 1); // Удаляем кнопку по индексу
      return updatedRoles;
    });
  };

  const handleSelect = (option) => {
    console.log(option)
    if (!accessRole.includes(option)) {
        setAccessRole((prevRoles) => [...prevRoles, option]);
      }
  };

  return (
    <div className={styles.modal}>
    <div className={styles.modal_content}>
        <div className={styles.modal_title}>
            <div className={styles.modal_title_box}>
                <div className={styles.modal_title_text}>Добавление документа</div>
                <div className={styles.modal_title_img_box}>
                    <CrossSVG className={styles.modal_title_img} onClick={()=>{setIsModalOpen(false)}}/>
                </div>
            </div>
            <div className={styles.line_big}></div>
        </div>
        <div className={styles.modal_uploader}>
            <div className={styles.custom_file_upload} onClick={() => document.getElementById('file-upload').click()}>
                {selectedFile ? <div>{selectedFile.name}</div> : <div>Выберите файл</div>}
            </div>
            <input 
            id="file-upload" 
            className={styles.modal_input} 
            type="file" 
            onChange={handleFileChange} 
            accept=".doc,.docx,.xls,.xlsx" />
        </div>
        <div className={styles.modal_description}>
            <div className={styles.modal_description_text}>Описание</div>
            <div className={styles.modal_description_input}>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className={styles.modal_description_input_text}></textarea>
            </div>
        </div>
        <div className={styles.modal_access}>
            <div className={styles.modal_access_text}>Доступно</div>
            <div className={styles.modal_access_box}>
                <div className={styles.modal_access_list}>
                    {accessRole.map((item, index)=>(
                        <div key={index} className={styles.modal_access_role}>
                            {item}
                            <CrossSVG className={styles.modal_access_role_img} onClick={() => deleteRole(index)}/>
                        </div>
                    ))}
                </div>
                <div className={styles.modal_access_img_box}>
                    <select className={styles.modal_select} value={""} onChange={(e) => handleSelect(e.target.value)}>
                        <option  hidden value=""></option>
                        {options.map((option) => (
                            <option className={styles.modal_option} key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className={styles.modal_buttons_box}>
            <button className={styles.modal_button} onClick={uploadFile}>Загрузить</button>
        </div>
    </div>
    </div>
  );
});

export default ModalAddDoc;