export default class Card {
    constructor(data, templateSelector, openCard, openPopupWithConfirmation, putLike, userId) {
        this._data = data
        this._name = this._data.name;
        this._link = this._data.link;
        this._templateSelector = templateSelector;
        this._openCard = openCard;
        this._openPopupWithConfirmation = openPopupWithConfirmation
        this._putLike = putLike
        this._userId = userId
    };

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._openCard(this._name, this._link);
        });
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._openPopupWithConfirmation(this);
        });
        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
    };

    deleteCard() {
        this._element.closest('.card').remove();
    };

    _toggleLike(evt) {
        evt.target.classList.contains('card__like_active') ? this._putLike(this, "DELETE") : this._putLike(this, "PUT")
    };

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElement;
    };

    _hasLike = (data) => {
        return data.likes.some((like) => like._id === this._userId)
    };

    setLikes(data) {
        this._heart = this._element.querySelector('.card__like')
        this._heart.dataset.like = data.likes.length;
        this._hasLike(data) ?
        this._heart.classList.add('card__like_active') :
        this._heart.classList.contains('card__like_active') ?
        this._heart.classList.remove('card__like_active') : null
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._element.querySelector('.card__name-place').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._showTrash()
        this.setLikes(this._data)
        this._setEventListeners();
        return this._element;
    };

    _showTrash() {
        this._data.owner._id === this._userId ?
        this._element.querySelector('.card__delete').classList.remove('hide') : null
    }
};