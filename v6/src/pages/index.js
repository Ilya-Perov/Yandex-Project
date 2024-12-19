import './index.css';

import { initialCards, config } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';

const btnEditProfile = document.querySelector(config.btnEditProfileSelector);
const btnAddNewPlace = document.querySelector(config.btnAddCardSelector);
const allForms = Array.from(document.querySelectorAll(config.formSelector));
const userName = document.querySelector(config.userNameSelector);
const aboutUser = document.querySelector(config.aboutSelector);
const popupEdit = document.querySelector(config.popupEditProfileSelector);
const nameInput = popupEdit.querySelector('.popup__name');
const aboutInput = popupEdit.querySelector('.popup__about');
const userAvatar = document.querySelector('.profile__avatar');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: 'dce1516f-fc8c-4c0a-bd45-77a3ef4106c8',
    'Content-Type': 'application/json'
  }
});

const renderer = (item) => {
  const card = new Card(item, config.templateSelector, handleCardClick, openPopupWithConfirmation, togleLike, userInfo.getId());
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

const deleteCard = (card) => {
  api.deleteCard(card._data._id)
    .then(() => {
      card.deleteCard()
      popupWithConfirmation.close()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
};

function openPopupEditProfile() {
  nameInput.value = userName.textContent
  aboutInput.value = aboutUser.textContent
  popupEditProfile.open();
}

const cardsList = new Section({ renderer }, config.containerSelector);
const popupWithImage = new PopupWithImage(config.popupImageSelector);
const popupWithConfirmation = new PopupWithConfirmation(config.popupConfirmationSelector, deleteCard);
const userInfo = new UserInfo(config.userNameSelector, config.aboutSelector, userAvatar);

Promise.all([ api.getUserInfo(), api.getInitialCards() ])
  .then((values)=>{
    userInfo.setUserInfo(values[0])
    userInfo.setAvatar(values[0].avatar)
    cardsList.renderItems(values[1])
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link)
};

const openPopupWithConfirmation = (card) => {
  popupWithConfirmation.open(card)
};

const togleLike = (card, set) => {
  api.togleLike(card._data._id, set)
    .then((result) => {
      card.setLikes(result)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
};

const popupAddCard = new PopupWithForm({
  selector: config.popupAddCardSelector,
  handleFormSubmit: (formData) => {
    api.addCard(formData)
      .then((result) => {
        renderer(result);
        popupAddCard.close()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        popupAddCard.renderLoading(false)
      })
  }
});

const popupEditProfile = new PopupWithForm({
  selector: config.popupEditProfileSelector,
  handleFormSubmit: (formData) => {
    api.editUserInfo(formData)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupEditProfile.close()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        popupEditProfile.renderLoading(false)
      })
  }
});

const popupChangeAvatar = new PopupWithForm({
  selector: config.popupChangeAvatarSelector,
  handleFormSubmit: (formData) => {
    api.changeAvatar(formData)
      .then((result) => {
        userInfo.setAvatar(result.avatar)
        popupChangeAvatar.close()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        popupChangeAvatar.renderLoading(false)
      })
  }
});

allForms.forEach((form) => {
  const formValidator = new FormValidator(form, config);
  formValidator.enableValidation();
});

popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupChangeAvatar.setEventListeners();
btnAddNewPlace.addEventListener('click', popupAddCard.open.bind(popupAddCard));
userAvatar.addEventListener('click', popupChangeAvatar.open.bind(popupChangeAvatar));
btnEditProfile.addEventListener('click', openPopupEditProfile);