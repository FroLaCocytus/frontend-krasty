import React from "react";
import styles from './StartPage.module.css'
import { ReactComponent as Logo } from '../../img/logo.svg';
import { useNavigate  } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts"



const StartPage = () => {
    
    const navigate = useNavigate();

    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    console.log("Ширина экрана: " + screenWidth + " пикселей");
    console.log("Высота экрана: " + screenHeight + " пикселей");
    //ширина 1536 пикселей
    //высота 864 пикселей
    return (
        <div className={styles.container}>
            <Logo className={styles.logo_svg}/>    
            <div className={styles.welcometext}>Добро пожаловать!</div>
            <div className={styles.buttons}>
                <div onClick={() => {navigate(LOGIN_ROUTE)}} className={styles.login_button}>Войти</div>
                <div onClick={() => {navigate(REGISTRATION_ROUTE)}} className={styles.register_button}>Зарегистрироваться</div>
            </div>            
        </div>
    );

};

export default StartPage;