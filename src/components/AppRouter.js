import React, { useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "../index";
import { clientRoutes, accountantRoutes, publicRoutes, merchandiserRoutes, cashierRoutes, chefRoutes} from "../routes";
import { observer } from "mobx-react-lite";

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
            {user.isAuth && user.role === "cashier" && cashierRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}
            {!user.isAuth && publicRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={Element} />
            ))}
            
            {user.isAuth && user.role === "client" && <Route path="*" element={<Navigate to="/menu" replace />} />}
            {user.isAuth && user.role === "accountant" && <Route path="*" element={<Navigate to="/accountant/document" replace />} />}
            {user.isAuth && user.role === "merchandiser" && <Route path="*" element={<Navigate to="/merchandiser/warehouse" replace />} />}
            {user.isAuth && user.role === "cashier" && <Route path="*" element={<Navigate to="/cashier" replace />} />}
            {user.isAuth && user.role === "chef" && <Route path="*" element={<Navigate to="/chef/document" replace />} />}


            {!user.isAuth && <Route path="*" element={<Navigate to="/" replace />} />}
        </Routes>
    );

});

export default AppRouter;

