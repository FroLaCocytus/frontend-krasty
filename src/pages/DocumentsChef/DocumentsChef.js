//База
import React, {useState, useContext, useEffect} from "react";
import styles from './DocumentsChef.module.css'

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { chef_buttons } from "../../nav_button";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { getAllDocumentsByRole } from "../../http/documentAPI";
import ListDocument from "../../components/ListDocument/ListDocument";
import ModalAlert from "../../components/ModalAlert/ModalAlert";

//Свгшки стрелочек
import { ReactComponent as LeftArrow } from '../../img/arrow_left.svg';
import { ReactComponent as RightArrow } from '../../img/arrow_right.svg';

const DocumentsMerchandise = observer(() => {
    const flagOutput = true 
    
    const {documentStore} = useContext(Context)
    const {user} = useContext(Context)
    console.log(user.role)
    // Модалка с уведомлениями
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState(true);

    const [page, setPage] = useState(1);
    const [maxPage , setMaxPage ] = useState(1);

    const handleShowAlertModal = (message, status) => {
        setModalMessage(message); 
        setModalStatus(status);
        setShowModal(true); 
    };

    const handleLeftArrow = () => {
        if (maxPage === 0) return
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };
    
    const handleRightArrow = () => {
        if (maxPage === 0) return
        setPage(prevPage => Math.min(prevPage + 1, maxPage));
    };

    useEffect(()=>{
        getAllDocumentsByRole(page, user.role).then(data => {
            documentStore.setDocuments(data.content)
            setMaxPage(data.totalPages)
        })
        
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <NavBar>
                    <NavButton data={chef_buttons} flagOutput={flagOutput}/>
                </NavBar>
            </div>
            <div className={styles.right_side}>
                <div className={styles.title}>
                    <div className={styles.title_left}>
                        <div className={styles.title_text}>Документы</div>
                    </div>
                    <div className={styles.title_right}>
                    </div>
                </div>
                <div className={styles.data_box}>
                    <div className={styles.table}>
                        <div className={styles.table_top}>
                            <div className={styles.table_top_left}>
                                <div className={styles.table_text_left}>Имя документа</div>
                            </div>
                            <div className={styles.table_top_right}>
                                <div className={styles.table_text_right}>Дата добавления</div>
                            </div>
                        </div>
                        <div className={styles.table_bottom}>
                            <ListDocument handleShowAlertModal={handleShowAlertModal} page={page} setPage={setPage} setMaxPage={setMaxPage}/>
                        </div>
                    </div>
                    <div className={styles.pagination}>
                            <LeftArrow onClick={handleLeftArrow} className={styles.left_arrow}/>
                            <div className={styles.page}>{page}</div>
                            <RightArrow onClick={handleRightArrow} className={styles.right_arrow}/>
                    </div>
                </div>
            </div>
            <ModalAlert isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} status={modalStatus}/>
        </div>
    );

});

export default DocumentsMerchandise;