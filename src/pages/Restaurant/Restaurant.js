//База
import React from "react";
import styles from './Restaurant.module.css'

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import imageKrusty from '../../img/krusty.png';
import { client_buttons } from "../../nav_button";

const Restaurant = () => {
    
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
                        <div className={styles.title_text}>О нас</div>
                    </div>
                </div>
                <div className={styles.brief_info}>
                    <div className={styles.brief_info_left}>
                        <div className={styles.brief_info_name}>Красти краб</div>
                        <div className={styles.brief_info_definition}>Лучший ресторан Бикини Боттом</div>
                        <div className={styles.brief_info_number}>+793538286383</div>
                    </div>
                    <div className={styles.brief_info_right}>
                        <img src={imageKrusty}></img>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.text}>Дайте себе позитивный удар вкуса в ресторане "Красти Крабс" – самом зажигательном месте на дне океана!</div>
                    <div className={styles.text}>Эй, морские парни и губки! Готовьтесь к незабываемому приключению в самом крутом месте, которое только можно найти под водой – ресторан "Красти Крабс"! У нас вас ждет нереальный фестиваль вкусов, который даст вам энергию для плавания по всему Бикини Боттому!</div>
                    <div className={styles.text}>А великий шеф Спанч Боб лично стоит за плитой, чтобы гарантировать вам экстраординарный вкус каждого блюда. Он никогда не останавливается в своем творческом подходе, создавая шедевры, которые заставят вас расплакаться от счастья!</div>
                    
                </div>
            </div>
        </div>
    );

};

export default Restaurant;