import React, { useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "../index";
import { clientRoutes, accountantRoutes, publicRoutes, merchandiserRoutes, cashierRoutes, chefRoutes, juniorChefRoutes, courierRoutes} from "../routes";
import { observer } from "mobx-react-lite";
import { START_ROUTE, MENU_ROUTE, DOCUMENT_ROUTE, WAREHOUSE_ROUTE, CASHIER_ROUTE, DOCUMENT_CHEF_ROUTE, PACKAGING_ROUTE, COURIER_ROUTE } from "../utils/consts"


const AppRouter = observer(() => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && user.role === "client" && clientRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}

            {user.isAuth && user.role === "accountant" && accountantRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}

            {user.isAuth && user.role === "merchandiser" && merchandiserRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}
            {user.isAuth && user.role === "chef" && chefRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}
            {user.isAuth && user.role === "junior chef" && juniorChefRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}
            {user.isAuth && user.role === "cashier" && cashierRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}
            {user.isAuth && user.role === "courier" && courierRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}
            {!user.isAuth && publicRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}
            
            {user.isAuth && user.role === "client" && <Route path="*" element={<Navigate to={MENU_ROUTE} replace />} />}
            {user.isAuth && user.role === "accountant" && <Route path="*" element={<Navigate to={DOCUMENT_ROUTE} replace />} />}
            {user.isAuth && user.role === "merchandiser" && <Route path="*" element={<Navigate to={WAREHOUSE_ROUTE} replace />} />}
            {user.isAuth && user.role === "cashier" && <Route path="*" element={<Navigate to={CASHIER_ROUTE} replace />} />}
            {user.isAuth && user.role === "chef" && <Route path="*" element={<Navigate to={DOCUMENT_CHEF_ROUTE} replace />} />}
            {user.isAuth && user.role === "junior chef" && <Route path="*" element={<Navigate to={PACKAGING_ROUTE} replace />} />}
            {user.isAuth && user.role === "courier" && <Route path="*" element={<Navigate to={COURIER_ROUTE} replace />} />}
            


            {!user.isAuth && <Route path="*" element={<Navigate to={START_ROUTE} replace />} />}
        </Routes>
    );

});

export default AppRouter;

