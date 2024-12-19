import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(selector, deleteCard) {
        super(selector)
        this._deleteCard = deleteCard
    };

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteCard(this.card)
        })
        super.setEventListeners()
    }

    open(card) {
        this.card = card
        super.open()
    }
};