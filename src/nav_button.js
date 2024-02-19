import imageMenu from './img/menu.png';
import imageProfile from './img/profile.png';
import imageRestaurant from './img/restaurant.png';
import imageBasket from './img/basket.png';
import imageDocument from './img/document.png';
import imageTomato from './img/tomato.png';
import imageBox from './img/box.png';

import { BASKET_ROUTE, MENU_ROUTE, PROFILE_ROUTE, RESTAURANT_ROUTE, DOCUMENT_ROUTE, STAFF_ROUTE, WAREHOUSE_ROUTE,
    CASHIER_ROUTE, DOCUMENT_MERCHANDISE_ROUTE, DOCUMENT_CHEF_ROUTE, PACKAGING_ROUTE, COURIER_ROUTE } from "./utils/consts"

export const client_buttons = [

    {
        text: "Меню",
        link: imageMenu,
        route: MENU_ROUTE
    },
    {
        text: "Профиль",
        link: imageProfile,
        route: PROFILE_ROUTE
    },
    {
        text: "О нас",
        link: imageRestaurant,
        route: RESTAURANT_ROUTE
    },
    {
        text: "Корзина",
        link: imageBasket,
        route: BASKET_ROUTE
    }
]

export const accountant_buttons = [

    {
        text: "Документы",
        link: imageDocument,
        route: DOCUMENT_ROUTE
    },
    {
        text: "Персонал",
        link: imageProfile,
        route: STAFF_ROUTE
    }
]

export const merchandiser_buttons = [

    {
        text: "Склад",
        link: imageTomato,
        route: WAREHOUSE_ROUTE
    },
    {
        text: "Документы",
        link: imageDocument,
        route: DOCUMENT_MERCHANDISE_ROUTE
    }

]

export const cashier_buttons = [

    {
        text: "Заказы",
        link: imageDocument,
        route: CASHIER_ROUTE
    }
]

export const chef_buttons = [

    {
        text: "Документы",
        link: imageDocument,
        route: DOCUMENT_CHEF_ROUTE
    }

]

export const junior_chef_buttons = [

    {
        text: "Сортировка",
        link: imageBox,
        route: PACKAGING_ROUTE
    }

]

export const courier_buttons = [

    {
        text: "Доставка",
        link: imageProfile,
        route: COURIER_ROUTE
    }

]