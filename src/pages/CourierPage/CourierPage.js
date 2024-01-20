//База
import React, { useState, useContext, useEffect } from "react";
import styles from './CourierPage.module.css'

import { observer } from "mobx-react-lite";
import { Context } from "../../index";

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { courier_buttons } from "../../nav_button";

//HTTP
import { getOrders, getOrderCourier, updateOrder } from "../../http/orderAPI";


//Свгшки стрелочек
import { ReactComponent as LeftArrow } from '../../img/arrow_left.svg';
import { ReactComponent as RightArrow } from '../../img/arrow_right.svg';
import ModalAlert from "../../components/ModalAlert/ModalAlert";

//Падежи 
import { wordСase } from "../../utils/wordCase";

const CourierPage = observer(() => {

    const flagOutput = true

    const { order } = useContext(Context)

    const [countOrders, setCountOrders] = useState(0)

    // Модалка с уведомлениями
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState(true);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    // Состояние текущего заказа
    const [currentOrder, setCurrentOrder] = useState(null);

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

    // Функция для получения информации о текущем заказе
    const checkCurrentOrder = async () => {
        try {
            const data = await getOrderCourier();
            if (data.message) {
                return;
            }
            setCurrentOrder({
                id: data.id,
                clientName: data.clientName,
                deliveryAddress: data.deliveryAddress,
                description: data.description,
            });
            console.log(data)

        } catch (e) {
            handleShowAlertModal(e.response.data, false);
        }
    };

    useEffect(() => {
        checkCurrentOrder()
    }, []);

    useEffect(() => {
        getOrders(page, "packaging",5).then(data => {
            order.setOrders(data.orders)
            setCountOrders(data.totalItems)
            setMaxPage(data.totalPages)

        })

    }, [page])

    const handleAcceptOrder = async (orderId, status) => {
        await updateOrder(orderId, status)
            .then(data => {
                if (data === 200) handleShowAlertModal(`Заказ №${orderId} перешёл в статус доставки`, true)
            })
            .catch(e => {
                handleShowAlertModal(e.response.data, false)
            })

        checkCurrentOrder()
    };

    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <NavBar>
                    <NavButton data={courier_buttons} flagOutput={flagOutput} />
                </NavBar>
            </div>
            {currentOrder ? (
                <div className={styles.right_side}>
                    <div className={styles.order_info}>
                        <div className={styles.order_info_content}>
                            <div className={styles.order_header}>
                                <div>Текущий заказ</div>
                            </div>
                            <div className={styles.order_detail}>
                                <div className={styles.detail_label}>Имя клиента:</div>
                                <div className={styles.detail_value}>{currentOrder.clientName}</div>
                            </div>
                            <div className={styles.order_detail}>
                                <div className={styles.detail_label}>Адрес доставки:</div>
                                <div className={styles.detail_value}>{currentOrder.deliveryAddress}</div>
                            </div>
                            <div className={styles.order_detail}>
                                <div className={styles.detail_label}>Описание:</div>
                                <div className={styles.detail_value}>{currentOrder.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.right_side}>

                    <div className={styles.title}>
                        <div className={styles.title_left}>
                            <div className={styles.title_text}>Заказы</div>
                            <div className={styles.title_description}>{countOrders} {wordСase(countOrders, ["заказ", "заказа", "заказов"])}</div>
                        </div>
                        <div className={styles.title_right}>
                            <div className={styles.pagination}>
                                <LeftArrow onClick={handleLeftArrow} className={styles.left_arrow} />
                                <div className={styles.page}>{page}</div>
                                <RightArrow onClick={handleRightArrow} className={styles.right_arrow} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.list_order}>
                        {order.orders.map((orderItem) => (
                            <div key={orderItem.id} className={styles.order_card}>
                                <div className={styles.order_content}>
                                    <div className={styles.order_id}>Заказ №{orderItem.id}</div>
                                    <div className={styles.order_description}>{orderItem.description}</div>
                                </div>
                                <div className={styles.button_box}>
                                    <button
                                        className={styles.accept_button}
                                        onClick={() => handleAcceptOrder(orderItem.id, "delivering")}
                                    >
                                        Забрал заказ
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ModalAlert isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} status={modalStatus} />
        </div>
    );


});

export default CourierPage;