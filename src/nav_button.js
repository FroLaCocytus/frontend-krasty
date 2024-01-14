import imageMenu from './img/menu.png';
import imageProfile from './img/profile.png';
import imageRestaurant from './img/restaurant.png';
import imageBasket from './img/basket.png';
import imageDocument from './img/document.png';
import imageTomato from './img/tomato.png';
import imageBox from './img/box.png';


export const client_buttons = [

    {
        text: "Меню",
        link: imageMenu,
        route: '/menu'
    },
    {
        text: "Профиль",
        link: imageProfile,
        route: '/profile'
    },
    {
        text: "О нас",
        link: imageRestaurant,
        route: '/restaurant'
    },
    {
        text: "Корзина",
        link: imageBasket,
        route: '/basket'
    }
]

export const accountant_buttons = [

    {
        text: "Документы",
        link: imageDocument,
        route: '/accountant/document'
    },
    {
        text: "Персонал",
        link: imageProfile,
        route: '/accountant/staff'
    }
]

export const merchandiser_buttons = [

    {
        text: "Склад",
        link: imageTomato,
        route: '/merchandiser/warehouse'
    },
    {
        text: "Документы",
        link: imageDocument,
        route: '/merchandiser/document'
    }

]

export const cashier_buttons = [

    {
        text: "Заказы",
        link: imageDocument,
        route: '/cashier'
    }
]

export const chef_buttons = [

    {
        text: "Документы",
        link: imageDocument,
        route: '/chef/document'
    }

]

export const junior_chef_buttons = [

    {
        text: "Сортировка",
        link: imageBox,
        route: '/junior/packaging'
    }

]