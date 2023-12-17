import React, { useState, useEffect, useContext } from "react";
import styles from './ListItems.module.css'
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { fetchProducts } from "../../http/productAPI";


const ListItems = observer(({selectedProducts, setSelectedProducts}) => {

    const {product} = useContext(Context)

    useEffect(()=>{
        fetchProducts().then(data => {
            product.setProducts(data)
        }).catch(e => {
            alert(e.response.data)
        })
        
    }, [])

    useEffect(() => {

        const storedProducts = localStorage.getItem('selectedProducts');

        if (storedProducts && product.products.length !== 0) {
            arrayMerging(JSON.parse(storedProducts), product.products)
        }
    }, [product.products]);
  
    
    const arrayMerging = (array1, array2) => {
        const result = array1.map(item1 => {
            const matchedItem = array2.find(item2 => item2.id === item1.id);
            return { ...matchedItem, count: item1.count };
          }).filter(item => item !== undefined);
        
        setSelectedProducts(result);
    }


    const decrementCounter = (id, count) => {
        const selectedProduct = { id, count: count-1 };

        const storedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
        let updatedProducts = [];

        if (count === 1) {
            updatedProducts = storedProducts.filter((product) => product.id !== id);

        } else {
            const index = storedProducts.findIndex(obj => obj.id === id);
            storedProducts[index] = selectedProduct
            updatedProducts = storedProducts
        }
        localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
        arrayMerging(updatedProducts, product.products);

    };

    const incrementCounter = (id, count) => {
        console.log(id)
        const selectedProduct = { id, count: count+1 };
        const storedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
        
        if (count < 15 ) {
            const index = storedProducts.findIndex(obj => obj.id === id);
            storedProducts[index] = selectedProduct
            localStorage.setItem('selectedProducts', JSON.stringify(storedProducts));
            arrayMerging(storedProducts, product.products);
        } 
        
    };


    return (

        <div className={styles.container}>
                {selectedProducts.map(item => (
                <div className={styles.dish_row} key={item.id}>
                    <div className={styles.dish_row_top}>
                        <div className={styles.img_box}>
                            <img className={styles.img} src={process.env.REACT_APP_API_URL + item.img_path} />
                        </div>
                        <div className={styles.text_box}>
                            <div className={styles.text_name}>{item.product_name}</div>
                            <div className={styles.text_description}>{item.product_description}</div>
                        </div>
                    </div>
                    <div className={styles.line_small}></div>

                    <div className={styles.dish_row_bottom}>
                        <div className={styles.text_price}>{item.price} $</div>
                        <div className={styles.box_count}>
                            <div onClick={() => decrementCounter(item.id, item.count)} className={styles.symbol_count}>-</div>
                            <div className={styles.text_count}>{item.count}</div>
                            <div onClick={() => incrementCounter(item.id, item.count)} className={styles.symbol_count}>+</div>
                        </div>
                    </div>
                    <div className={styles.line_big}></div>
                </div>
                ))}
        </div>
    );

});

export default ListItems;