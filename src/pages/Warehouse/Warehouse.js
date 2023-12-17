//База
import React, {useState, useContext, useEffect} from "react";
import styles from './Warehouse.module.css'

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { merchandiser_buttons } from "../../nav_button";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { getAllMerchandise } from "../../http/merchandiseAPI";
import ListMerchandises from "../../components/ListMerchandises/ListMerchandises";
import ModalAddMerchandise from "../../components/ModalAddMerchandise/ModalAddMerchandise";
import ModalAlert from "../../components/ModalAlert/ModalAlert";

//Свгшки стрелочек
import { ReactComponent as LeftArrow } from '../../img/arrow_left.svg';
import { ReactComponent as RightArrow } from '../../img/arrow_right.svg';

const Warehouse = observer(() => {
    const flagOutput = true 
    
    const {merchandise} = useContext(Context)

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        getAllMerchandise(page).then(data => {
            merchandise.setMerchandises(data.content)
            setMaxPage(data.totalPages)
        })
        
    }, [page])

    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <NavBar>
                    <NavButton data={merchandiser_buttons} flagOutput={flagOutput}/>
                </NavBar>
            </div>
            <div className={styles.right_side}>
                <div className={styles.title}>
                    <div className={styles.title_left}>
                        <div className={styles.title_text}>Склад</div>
                    </div>
                    <div className={styles.title_right}>
                        <div onClick={()=>{setIsModalOpen(true)}} className={styles.button_upload}>Добавить товар</div>
                    </div>
                </div>
                <div className={styles.data_box}>
                    <div className={styles.table}>
                        <div className={styles.table_top}>
                            <div className={styles.table_top_left}>
                                <div className={styles.table_text_left}>Название</div>
                            </div>
                            <div className={styles.table_top_right}>
                                <div className={styles.table_text_right}>Количество</div>
                            </div>
                        </div>
                        <div className={styles.table_bottom}>
                            <ListMerchandises handleShowAlertModal={handleShowAlertModal} page={page} setPage={setPage} setMaxPage={setMaxPage}/>
                        </div>
                    </div>
                    <div className={styles.pagination}>
                            <LeftArrow onClick={handleLeftArrow} className={styles.left_arrow}/>
                            <div className={styles.page}>{page}</div>
                            <RightArrow onClick={handleRightArrow} className={styles.right_arrow}/>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ModalAddMerchandise setIsModalOpen={setIsModalOpen} handleShowAlertModal={handleShowAlertModal} page={page} setMaxPage={setMaxPage}/>
            )}
            <ModalAlert isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} status={modalStatus}/>
        </div>
    );

});

export default Warehouse;