//База
import React, { useState, useEffect, useContext } from "react";
import styles from './Basket.module.css'

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { client_buttons } from "../../nav_button";
import ListItems from "../../components/ListItems/ListItems";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { getUserInfo } from "../../http/userAPI";
import { createBasketProduct } from "../../http/basketAPI";
import { getBasket } from "../../http/basketAPI";
import { getOneOrder, updateOrder } from "../../http/orderAPI";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import OrderStatusBar from "../../components/OrderStatusBar/OrderStatusBar"


//Падежи 
import { wordСase } from "../../utils/wordCase";


const Basket = observer(() => {

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [basketProduct, setBasketProduct] = useState([])

    const { user } = useContext(Context);

    const dish_count = selectedProducts.length; // кол-во блюд

    // Состояние текущего заказа
    const [currentOrder, setCurrentOrder] = useState(null);

    // Модалка с уведомлениями
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState(true);

    const handleShowAlertModal = (message, status) => {
        setModalMessage(message);
        setModalStatus(status);
        setShowModal(true);
    };

    // Функция для получения информации о текущем заказе
    const checkCurrentOrder = async () => {
        try {
            const data = await getOneOrder();
            if (data.message) {
                return;
            }
            setCurrentOrder({
                id: data.id,
                description: data.description,
                status: data.status
            });
            const basket = await getBasket();
            setBasketProduct(basket.products);

        } catch (e) {
            handleShowAlertModal(e.response.data, false);
        }
    };

    const calculateOrderPrice = () => {
        let total = 0;
        selectedProducts.forEach(product => {
            total += product.price * product.count;
        });
        setOrderPrice(total);
    };

    useEffect(() => {
        checkCurrentOrder()

        const storedProducts = localStorage.getItem('selectedProducts');
        if (storedProducts) {
            setSelectedProducts(JSON.parse(storedProducts));
        }
    }, []);

    useEffect(() => {
        calculateOrderPrice()
    }, [selectedProducts]);


    const ordering = async () => {
        const data = selectedProducts.map(obj => ({ id: obj.id, count: obj.count }));
        try {
            const userInfo = await getUserInfo();
            // Проверяем, заполнен ли профиль пользователя
            if (userInfo.name == null || userInfo.email == null || userInfo.phone_number == null || userInfo.address == null) {
                handleShowAlertModal("Для оформления заказа необходимо заполнить профиль", false);
                return;
            }

            await createBasketProduct(data, user.login);
            localStorage.removeItem('selectedProducts');
            setSelectedProducts([]);

            handleShowAlertModal("Заказ успешно создан!", true);
            checkCurrentOrder()

        } catch (error) {
            handleShowAlertModal(error.response ? error.response.data : "Произошла ошибка", false);
        }
    }

    const cancelOrder = () => {
        localStorage.removeItem('selectedProducts')
        setSelectedProducts([])
        handleShowAlertModal("Заказ успешно удалён!", true);
    }

    const handleCompleteOrder = async (orderId, status) => {
        await updateOrder(orderId, status)
            .then(data => {
                if (data === 200) handleShowAlertModal(`Заказ успешно получен`, true)
                setCurrentOrder(null)
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
                    <NavButton data={client_buttons} />
                </NavBar>
            </div>
            {currentOrder ? (
                // Если текущий заказ есть, отображаем информацию о нем
                <div className={styles.right_side}>
                    <div className={styles.title}>
                        <div className={styles.title_left}>
                            <div className={styles.title_text}>Ваш заказ готовится</div>
                        </div>
                        <div className={styles.button_box}>
                            {currentOrder.status === "delivering" && (
                                <button
                                    className={styles.complete_button}
                                    onClick={() => handleCompleteOrder(currentOrder.id, "completed")}
                                >
                                    Заказ получен
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={styles.status_bar}>
                        <OrderStatusBar status={currentOrder.status} />
                    </div>
                    <div className={styles.order_info}>
                        {basketProduct.map(product => (
                            <div className={styles.product} key={product.name}>
                                <img src={process.env.REACT_APP_API_URL + product.img_path} className={styles.product_image} />
                                <div className={styles.product_details}>
                                    <div className={styles.product_name}>{product.name}</div>
                                    <div className={styles.product_description}>{product.description}</div>
                                    <div className={styles.product_count}>Количество: {product.count}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.right_side}>
                    <div className={styles.title}>
                        <div className={styles.title_left}>
                            <div className={styles.title_text}>Корзина</div>
                            <div className={styles.title_description}>
                                {dish_count} {wordСase(dish_count, ["товар", "товара", "товаров"])}
                            </div>
                        </div>
                    </div>
                    <div className={styles.list}>
                        <ListItems selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
                    </div>
                    {dish_count > 0 && (
                        <div className={styles.buttons_box}>
                            <div onClick={ordering} className={styles.order_button}>Оформить за {orderPrice}$</div>
                            <div onClick={cancelOrder} className={styles.cancel_button}>Отменить заказ</div>
                        </div>
                    )}
                </div>
            )}
            <ModalAlert isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} status={modalStatus} />
        </div>
    );

});

export default Basket;