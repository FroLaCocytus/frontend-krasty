//База
import React, {useState} from "react";
import styles from './Staff.module.css'

//Всё для навбара
import NavBar from "../../components/NavBar/NavBar";
import NavButton from "../../components/NavButton/NavButton";
import { accountant_buttons } from "../../nav_button";
import Dropdown from "../../components/Dropdown/Dropdown";
import { observer } from "mobx-react-lite";
import { registrationStaff } from "../../http/userAPI";
import ModalAlert from "../../components/ModalAlert/ModalAlert";


const Staff = observer(() => {
    const options = ["merchandiser", "chef", "junior chef", "cashier", "courier" ];

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    // Модалка с уведомлениями
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState(true);

    const flagOutput = true;

    const checkLogin = (login) => {
      const loginStartsWithLetter = /^[a-z]/;
      const loginAlphanumeric = /^[a-z0-9]+$/;
      const loginLength = /^.{4,20}$/;
  
      if (!loginStartsWithLetter.test(login)) {
          return "Ошибка: логин должен начинаться с маленькой латинской буквы";
      }
      if (!loginAlphanumeric.test(login)) {
          return "Ошибка: логин может содержать только маленькие латинские буквы и цифры";
      }
      if (!loginLength.test(login)) {
          return "Ошибка: длина логина должна быть от 4 до 20 символов";
      }
      return null; 
  };
  
  const checkPassword = (password) => {
      const passwordLength = /^.{6,20}$/;
      const passwordLowercase = /^(?=.*[a-z])/;
      const passwordUppercase = /^(?=.*[A-Z])/;
      const passwordDigit = /^(?=.*\d)/;
  
      if (!passwordLength.test(password)) {
          return "Ошибка: длина пароля должна быть от 6 до 20 символов";
      }
      if (!passwordLowercase.test(password)) {
          return "Ошибка: пароль должен содержать хотя бы одну маленькую букву";
      }
      if (!passwordUppercase.test(password)) {
          return "Ошибка: пароль должен содержать хотя бы одну большую букву";
      }
      if (!passwordDigit.test(password)) {
          return "Ошибка: пароль должен содержать хотя бы одну цифру";
      }
      return null; 
  };

  const checkConfirmPassword = (password, confirmPassword) => {
    if (!(password === confirmPassword)) {
      console.log(password)
      console.log(confirmPassword)
      return "Ошибка: пароли не совпадают";
    }

    return null;
  }

  const checkRole = (role) => {
    if (role === "") {
      return "Ошибка: не выбрана роль";
    }

    return null;
  }

    const register = async () => {

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

      const confirmPasswordError = checkConfirmPassword(password, confirmPassword);
      if (confirmPasswordError) {
          handleShowAlertModal(confirmPasswordError, false);
          return;
      }

      const roleError = checkRole(role);
      if (roleError) {
          handleShowAlertModal(roleError, false);
          return;
      }

        await registrationStaff(login, password, role)
        .then(data => {
          handleShowAlertModal("Пользователь успешно создан", true)
          setLogin("");
          setPassword("");
          setConfirmPassword("");
          setRole("");
        })
        .catch(e => {
          handleShowAlertModal(e.response.data, false)
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
                <NavBar>
                    <NavButton data={accountant_buttons} flagOutput={flagOutput}/>
                </NavBar>
            </div>
            <div className={styles.right_side}>
                <div className={styles.title}>
                    <div className={styles.title_left}>
                        <div className={styles.title_text}>Добавить сотрудника</div>
                    </div>
                </div>
                <div className={styles.form_box}>
                    <form className={styles.form}>
                        <div className={styles.form_input_box_login} >
                        <input 
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            className={styles.form_input} 
                            type="text" 
                            placeholder="Введите логин..." 
                        />
                        </div>
                        <div className={styles.form_input_box_password} >
                        <input 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={styles.form_input} 
                            type="password" 
                            placeholder="Введите пароль..." 
                        />
                        </div>
                        <div className={styles.form_input_box_password} >
                        <input 
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className={styles.form_input} 
                            type="password" 
                            placeholder="Повторите пароль..." 
                        />
                        </div>
                        <div className={styles.dropdown_box}>
                            <Dropdown role={role} setRole={setRole} options={options}/>
                        </div>
                    </form>  
                    <div className={styles.button_box}>
                        <div onClick={register} className={styles.button}>Зарегистрировать</div>
                    </div>
                </div>
            </div>
            <ModalAlert isOpen={showModal} message={modalMessage} onClose={() => setShowModal(false)} status={modalStatus}/>
        </div>
    );

});

export default Staff;