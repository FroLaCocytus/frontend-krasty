import React, {useContext} from "react";
import styles from './NavButton.module.css'
import { useNavigate  } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Context } from '../../index'


const NavButton = observer((props) => {
    const buttonArray = props.data;
    let flagOutput = false;
    if (props.flagOutput) {
        flagOutput = true
    }

    const {user} = useContext(Context)
    const navigate = useNavigate();
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setLogin({})
        user.setRole({})
        localStorage.removeItem('token')
        localStorage.removeItem('selectedProducts')
        navigate('/')
      }

    return (
        <div className={styles.container}>
            {buttonArray.map((item, index) => (
                <div onClick={() => {navigate(item.route)}} className={styles.button_box} key={index}>
                    <div className={styles.img_box}>
                        <img className={styles.img} src={item.link} alt=""/>
                    </div>
                    <div className={styles.text}>{item.text}</div>
                </div>
            ))}
            {flagOutput && <div onClick={logOut} className={styles.output}>Выйти</div>}
        </div>
    );

});

export default NavButton;