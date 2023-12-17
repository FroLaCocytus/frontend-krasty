//База
import React, {useState, useContext, useEffect} from "react";
import styles from './CashierPage.module.css'
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { cashier_buttons } from "../../nav_button";

//HTTP
import { getOrders } from "../../http/orderAPI";

//Падежи 
import { wordСase } from "../../utils/wordCase";
import Order from "../../components/OrderCard/OrderCard";

const CashierPage = observer(() => {

    const [activeOrders, setActiveOrders] = useState([]);
    const {user} = useContext(Context);

    const flagOutput = true;

    
    useEffect(()=>{

        const fetchOrders = async () => {
            try {
                const data = await getOrders(user.role);
                if (data) {
                    setActiveOrders(data);
                } else {
                    console.error("Data undefined.");
                }
            } catch (e) {
                if (e.response && e.response.data) {
                    alert(e.response.data);
                } else {
                    console.error("Error response or data is undefined.");
                }
            }
        };

        const intervalId = setInterval(fetchOrders, 10000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);

    }, [])

    const order_count = activeOrders.length; // кол-во заказов

    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <NavBar>
                    <NavButton data={cashier_buttons} flagOutput={flagOutput}/>
                </NavBar>
            </div>
            <div className={styles.right_side}>
                <div className={styles.title}>
                    <div className={styles.title_left}>
                        <div className={styles.title_text}>Заказы</div>
                        <div className={styles.title_description}>
                            {order_count} {wordСase(order_count, ["заказ", "заказа", "заказов"])}
                        </div>
                    </div>
                </div>

                <div className={styles.list_order}>
                    {activeOrders.map(order => (
                        <Order key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );

});

export default CashierPage;