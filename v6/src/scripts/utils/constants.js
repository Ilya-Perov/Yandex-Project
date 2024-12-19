const config = {
    popupAddCardSelector: '.popup_new-place',
    popupEditProfileSelector: '.popup_edit',
    popupConfirmationSelector: '.popup_confirmation',
    popupImageSelector: '.popup_foolscreen-card',
    popupChangeAvatarSelector: '.popup_change-avatar',
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__item_type_error',
    containerSelector: '.grid-zona',
    btnAddCardSelector: '.profile__add',
    btnEditProfileSelector: '.profile__edit',
    userNameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    templateSelector: '.template',
};

const initialCards = [
    {
        owner: { _id: '54d3db1158b9060f22941cc4' },
        likes: [],
        name: 'Ангарск',
        link: 'https://therapy.irkutsk.ru/photo/7/189g.jpg'
    },
    {
        owner: { _id: '54d3db1158b9060f22941cc4' },
        likes: [],
        name: 'Братск',
        link: 'https://therapy.irkutsk.ru/photo/7/291g.jpg'
    },
    {
        owner: { _id: '54d3db1158b9060f22941cc4' },
        likes: [],
        name: 'Владимир',
        link: 'https://therapy.irkutsk.ru/photo/7/105g.jpg'
    },
    {
        owner: { _id: '54d3db1158b9060f22941cc4' },
        likes: [],
        name: 'Екатеринбург',
        link: 'https://therapy.irkutsk.ru/photo/7/191g.jpg'
    },
    {
        owner: { _id: '54d3db1158b9060f22941cc4' },
        likes: [],
        name: 'Казань',
        link: 'https://therapy.irkutsk.ru/photo/7/275g.jpg'
    },
    {
        owner: { _id: '54d3db1158b9060f22941cc4' },
        likes: [],
        name: 'Москва',
        link: 'https://therapy.irkutsk.ru/photo/7/114g.jpg'
    }
];

export { initialCards, config };