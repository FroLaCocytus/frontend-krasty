import React, { useState, useEffect, useContext } from "react";
import styles from './ListDishes.module.css'
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { fetchProducts } from "../../http/productAPI";

const ListDishes = observer((props) => {

    const {product} = useContext(Context)
    const dishesArray = product.products;

    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(()=>{
        fetchProducts().then(data => {
            product.setProducts(data)
        })
        
    }, [])

    useEffect(() => {
      const storedProducts = localStorage.getItem('selectedProducts');
      if (storedProducts) {
        setSelectedProducts(JSON.parse(storedProducts));
      }
    }, []);

    const isProductSelected = (id) => {
        return selectedProducts.some((product) => product.id === id);
    };

    
    const addDish = (id) => {
        const selectedProduct = { id, count: 1 };
        let updatedProducts = [];

        if (isProductSelected(id)) {
            updatedProducts = selectedProducts.filter((product) => product.id !== id);
        } else {
            updatedProducts = [...selectedProducts, selectedProduct];
        }

        setSelectedProducts(updatedProducts);
        localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
    };



    return (
        <div className={styles.container}>
            {dishesArray.map(item => (
            <div className={styles.dish_card} key={item.id}>
                <div className={styles.img_box}>
                    <img className={styles.img} src={process.env.REACT_APP_API_URL + item.img_path} />
                </div>
                <div className={styles.name}>{item.product_name}</div>
                <div className={styles.description}>{item.product_description}</div>
                <div className={styles.bottom_card}>
                    <div className={styles.price}>{item.price} $</div>
                    <div className={styles.button_box}>

                        <div
                            onClick={() => addDish(item.id)}
                            className={`${isProductSelected(item.id) ? styles.button_true : styles.button_false}`}
                        >
                            {isProductSelected(item.id) ? 'В корзине' : 'Выбрать'}
                        </div>

                    </div>
                </div>
            </div>
            ))}
        </div>
    );

});

export default ListDishes;