//База
import React, { useState, useEffect, useContext } from "react";
import styles from './Basket.module.css'

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { client_buttons } from "../../nav_button";
import ListItems from "../../components/ListItems/ListItems";
import { observer } from "mobx-react-lite";
import { createBasketProduct } from "../../http/basketAPI";
import { Context } from "../../index";
import { getUserInfo } from "../../http/userAPI";
import ModalAlert from "../../components/ModalAlert/ModalAlert";


//Падежи 
import { wordСase } from "../../utils/wordCase";


const Basket = observer(() => {
    
    const [selectedProducts, setSelectedProducts] = useState([]);

    const {user} = useContext(Context);

    // Модалка с уведомлениями
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState(true);

    const handleShowAlertModal = (message, status) => {
        setModalMessage(message); 
        setModalStatus(status);
        setShowModal(true); 
    };

    useEffect(() => {
      const storedProducts = localStorage.getItem('selectedProducts');
      if (storedProducts) {
        setSelectedProducts(JSON.parse(storedProducts));
      }
    }, []);

    const dish_count = selectedProducts.length; // кол-во блюд

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
    
            alert("Успешно!");
        } catch (error) {
            alert(error.response ? error.response.data : "Произошла ошибка");
        }
    }

    const cancelOrder = () => {
        localStorage.removeItem('selectedProducts')
        setSelectedProducts([])
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <NavBar>
                    <NavButton data={client_buttons}/>
                </NavBar>
            </div>
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
                    <ListItems selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
                </div>
                {dish_count > 0 && (
                    <div className={styles.buttons_box}>
                        <div onClick={ordering} className={styles.order_button}>Оформить заказ</div>
                        <div onClick={cancelOrder} className={styles.cancel_button}>Отменить заказ</div>
                    </div>
                )}
            </div>
            <ModalAlert isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} status={modalStatus}/>
        </div>
    );

});

export default Basket;