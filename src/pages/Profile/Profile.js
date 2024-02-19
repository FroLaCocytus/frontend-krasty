//База
import React, { useContext, useState, useEffect } from "react";
import styles from './Profile.module.css'
import { useNavigate  } from 'react-router-dom';

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { client_buttons } from "../../nav_button";
import { Context } from '../../index'
import { observer } from "mobx-react-lite";
import { getUserInfo, updateUserInfo } from "../../http/userAPI";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import { START_ROUTE } from "../../utils/consts"


const Profile = observer(() => {
    
    const navigate = useNavigate();
    const {user} = useContext(Context)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    // Модалка с уведомлениями
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState(true);

    const handleShowAlertModal = (message, status) => {
        setModalMessage(message); 
        setModalStatus(status);
        setShowModal(true); 
    };

    useEffect(()=>{
        getUserInfo()
        .then(data => {
            if (data.name != null) setName(data.name)
            if (data.email != null) setEmail(data.email)
            if (data.phone_number != null) setPhoneNumber(data.phone_number)
            if (data.address != null) setAddress(data.address)
        }).catch(e => {
            handleShowAlertModal(e.response.data, false)
        })
    }, [])

    const checkName = (name) => {
        const nameStartsWithLetter = /^[a-zA-Zа-яА-Я]/;
        const namePattern = /^[a-zA-Zа-яА-Я\s]*$/;
        const nameLength = /^.{1,50}$/; 
    
        if (!nameStartsWithLetter.test(name)) {
            return "Ошибка: имя должно начинаться с буквы";
        }

        if (!namePattern.test(name)) {
            return "Ошибка: имя может содержать только буквы латинского или кириллического алфавита";
        }
        if (!nameLength.test(name)) {
            return "Ошибка: длина имени должна быть от 1 до 50 символов";
        }
        return null;
    };
    
    const checkEmail = (email) => {
        const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/; 
    
        if (!emailFormat.test(email)) {
            return "Ошибка: некорректный формат электронной почты\nПример: example@email.com";
        }
        return null;
    };
    
    const checkPhoneNumber = (phoneNumber) => {
        const phoneNumberFormat = /^(\+7|8)\d{10}$/; 
    
        if (!phoneNumberFormat.test(phoneNumber)) {
            return "Ошибка: некорректный формат телефонного номера. Используйте формат российских номеров:)";
        }
        return null;
    };
    
    const checkAddress = (address) => {
        const addressNotEmpty = address.trim().length > 0; 
    
        if (!addressNotEmpty) {
            return "Ошибка: адрес не может быть пустым";
        }
        return null;
    };

    const confirm = async () => {
        const nameError = checkName(name);
        if (nameError) {
            handleShowAlertModal(nameError, false);
            return;
        }
    
        const emailError = checkEmail(email);
        if (emailError) {
            handleShowAlertModal(emailError, false);
            return;
        }
    
        const phoneNumberError = checkPhoneNumber(phoneNumber);
        if (phoneNumberError) {
            handleShowAlertModal(phoneNumberError, false);
            return;
        }
    
        const addressError = checkAddress(address);
        if (addressError) {
            handleShowAlertModal(addressError, false);
            return;
        }

        updateUserInfo(name, email, phoneNumber, address)
          .then(data => {
              if (data.name != null) setName(data.name)
              if (data.email != null) setEmail(data.email)
              if (data.phone_number != null) setPhoneNumber(data.phone_number)
              if (data.address != null) setAddress(data.address)
              handleShowAlertModal("Информация профиля успешно обновлена", true)
          }).catch(e => {
              handleShowAlertModal(e.response.data, false)
          })
         }

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setLogin({})
        user.setRole({})
        localStorage.removeItem('token')
        localStorage.removeItem('selectedProducts')
        navigate(START_ROUTE)
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
                        <div className={styles.title_text}>Профиль пользователя</div>
                    </div>
                </div>
                <form className={styles.form}>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={styles.form_input}
                        type="text"
                        placeholder="Имя" 
                    />
                    <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.form_input} 
                        type="text" 
                        placeholder="Email" 
                    />
                    <input 
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        className={styles.form_input} 
                        type="text" 
                        placeholder="Телефон" 
                    />
                    <input 
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className={styles.form_input} 
                        type="text" 
                        placeholder="Адрес доставки" 
                    />
                </form>  
                <div className={styles.buttons_box}>
                    <div onClick={confirm} className={styles.confirm_button}>Подтвердить</div>
                    <div onClick={logOut} className={styles.logout_button}>Выйти</div>
                </div>

            </div>
            <ModalAlert isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} status={modalStatus}/>
        </div>
    );

});

export default Profile;