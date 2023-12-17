import React from "react";
import styles from './NavBar.module.css'
import { ReactComponent as Logo } from '../../img/logo.svg';
import { observer } from "mobx-react-lite";


const NavBar = observer(({ children }) => {

    return (
        <div className={styles.bar}>
            <div className={styles.logo_box}>
               <Logo className={styles.logo_svg}/>
            </div>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );

});

export default NavBar;