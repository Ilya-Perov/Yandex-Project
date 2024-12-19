import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._fullscreenImage = this._popup.querySelector('.popup__card-image');
        this._name = this._popup.querySelector('.popup__card-title');
    }

    open(name, link) {
        this._name.textContent = name;
        this._fullscreenImage.src = link;
        this._fullscreenImage.alt = name;
        super.open();
    };
}
