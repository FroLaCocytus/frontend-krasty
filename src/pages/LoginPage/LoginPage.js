import React, { useContext, useState } from "react";
import styles from './LoginPage.module.css'
import { ReactComponent as Logo } from '../../img/logo.svg';

import { useNavigate  } from 'react-router-dom';
import { Context } from "../../index";
import { loginAPI } from "../../http/userAPI";
import { observer } from "mobx-react-lite";
import ModalAlert from "../../components/ModalAlert/ModalAlert";

import { MENU_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts"


const LoginPage = observer(() => {

    const navigate = useNavigate();
    const {user} = useContext(Context);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    
    // Модалка с уведомлениями
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState(true);

    const checkLogin = (login) => {
        const loginStartsWithLetter = /^[a-z]/;
        const loginAlphanumeric = /^[a-z0-9]+$/;
        const loginLength = /^.{4,20}$/;
    
        if (!loginStartsWithLetter.test(login)) {
            return "Ошибка: логин должен начинаться с маленькой латинской буквы.";
        }
        if (!loginAlphanumeric.test(login)) {
            return "Ошибка: логин может содержать только маленькие латинские буквы и цифры.";
        }
        if (!loginLength.test(login)) {
            return "Ошибка: длина логина должна быть от 4 до 20 символов.";
        }
        return null; 
    };
    
    const checkPassword = (password) => {
        const passwordLength = /^.{6,20}$/;
        const passwordLowercase = /^(?=.*[a-z])/;
        const passwordUppercase = /^(?=.*[A-Z])/;
        const passwordDigit = /^(?=.*\d)/;
    
        if (!passwordLength.test(password)) {
            return "Ошибка: длина пароля должна быть от 6 до 20 символов.";
        }
        if (!passwordLowercase.test(password)) {
            return "Ошибка: пароль должен содержать хотя бы одну маленькую букву.";
        }
        if (!passwordUppercase.test(password)) {
            return "Ошибка: пароль должен содержать хотя бы одну большую букву.";
        }
        if (!passwordDigit.test(password)) {
            return "Ошибка: пароль должен содержать хотя бы одну цифру.";
        }
        return null; 
    };

    const signin = async () => {

        const loginError = checkLogin(login);
        if (loginError) {
            handleShowAlertModal(loginError, false);
            return;
        }

        const passwordError = checkPassword(password);
        if (passwordError) {
            handleShowAlertModal(passwordError, false);
            return;
        }

        await loginAPI(login, password)
        .then(data => {
            user.setUser(true)
            user.setIsAuth(true)
            user.setLogin(data.login)
            user.setRole(data.role)
            navigate(MENU_ROUTE)
        })
        .catch(e => {
            handleShowAlertModal(e.response.data)
        })
        
    }

    const handleShowAlertModal = (message, status) => {
        setModalMessage(message); 
        setModalStatus(status);
        setShowModal(true); 
    };

    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <Logo className={styles.logo_svg}/>    
            </div>
            <div className={styles.right_side}>
                <form className={styles.form}>
                    <div className={styles.form_text}>Аутентификация</div>
                    <div className={styles.form_input_box_login} >
                        <input 
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            className={styles.form_input} 
                            type="text" 
                            placeholder="Логин..." 
                        />
                    </div>
                    <div className={styles.form_input_box_password} >
                        <input 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={styles.form_input} 
                            type="password" 
                            placeholder="Пароль..." 
                        />
                    </div>
                    <div className={styles.form_small_text}>
                        <div>Первый раз? </div>
                        <div onClick={() => {navigate(REGISTRATION_ROUTE)}} className={styles.form_small_text_registration}>Зарегистрируйтесь</div>
                    </div>
                </form>  
                <div onClick={signin} className={styles.form_button}>Войти</div>

            </div>
            <ModalAlert isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} status={modalStatus}/>
        </div>
    );

});

export default LoginPage;
