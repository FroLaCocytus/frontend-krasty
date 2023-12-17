//База
import React, { useContext, useEffect } from "react";
import styles from './Menu.module.css'

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { client_buttons } from "../../nav_button";

//Свгшки стрелочек
import { ReactComponent as LeftArrow } from '../../img/arrow_left.svg';
import { ReactComponent as RightArrow } from '../../img/arrow_right.svg';

//Всё для списка блюд
import ListDishes from "../../components/ListDishes/ListDishes";
import { fetchProducts } from "../../http/productAPI";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

//Падежи 
import { wordСase } from "../../utils/wordCase";

const Menu = observer(() => {
    
    const {product} = useContext(Context)

    useEffect(()=>{
        fetchProducts().then(data => {
            product.setProducts(data)
        }).catch(e => {
            alert(e.response.data)
        })
        
    }, [])

    const dish_count = product.products.length; //кол-во блюд
    const page_number = 1;
    
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
                        <div className={styles.title_text}>Меню ресторана</div>
                        <div className={styles.title_description}>{dish_count} {wordСase(dish_count, ["блюдо", "блюда", "блюд"])}</div>
                    </div>
                    <div className={styles.title_right}>
                        <div className={styles.pagination}>
                            <LeftArrow className={styles.left_arrow}/>
                            <div className={styles.page}>{page_number}</div>
                            <RightArrow className={styles.right_arrow}/>
                        </div>
                    </div>
                </div>
                <div className={styles.list}>
                  <ListDishes/>
                </div>
            </div>
        </div>
    );

});

export default Menu;