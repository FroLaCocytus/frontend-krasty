import React, { useContext, useState } from 'react';
import styles from './ListDocument.module.css'
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import ModalDocInfo from "../../components/ModalDocInfo/ModalDocInfo";
import ModalDocInfoRole from "../../components/ModalDocInfoRole/ModalDocInfoRole";


const ListDocument = observer(({handleShowAlertModal, page, setPage, setMaxPage}) => {

    const {documentStore} = useContext(Context)
    const {user} = useContext(Context)

    const arrayDocument = documentStore.documents
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handlerRowClick = (item) => {
        setSelectedItem(item)
        setIsModalInfoOpen(true)
    }

    const convertDateFormat = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
      };

    return (
        <div className={styles.container}>
            {arrayDocument.map(item => (
                <div className={styles.row} key={item.id} onClick={() => {handlerRowClick(item)}}>
                    <div className={styles.info_box}>
                        <div className={styles.row_left}>
                            <div className={styles.row_text_left}>{item.title}</div>
                        </div>
                        <div className={styles.row_right}>
                            <div className={styles.row_text_right}>{convertDateFormat(item.date)}</div>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                </div>
            ))}
            {isModalInfoOpen && (
                user.role === 'accountant' ? (
                    <ModalDocInfo
                        setIsModalOpen={setIsModalInfoOpen} 
                        selectedItem={selectedItem}
                        handleShowAlertModal={handleShowAlertModal} 
                        page={page} 
                        setPage={setPage}
                        setMaxPage={setMaxPage} />
                ) : (
                    <ModalDocInfoRole 
                        setIsModalOpen={setIsModalInfoOpen} 
                        selectedItem={selectedItem}
                        handleShowAlertModal={handleShowAlertModal} 
                        page={page} 
                        setPage={setPage}
                        setMaxPage={setMaxPage} />
                )
            )}
        </div>
        
    );
});

export default ListDocument;