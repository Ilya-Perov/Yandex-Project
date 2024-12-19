export default class UserInfo {
    constructor( nameSelector, aboutSelector, avatarElement) {
        this._name = document.querySelector(nameSelector)
        this._about = document.querySelector(aboutSelector)
        this._avatarElement = avatarElement

    };

    getId() {
        return this._id
    }

    getUserInfo() {
        return { name: this._name.textContent, about: this._about.textContent }
    }

    setUserInfo(formData) {
        this._name.textContent = formData.name;
        this._about.textContent = formData.about;
        this._id = formData._id;
    }

    setAvatar(urlAvatar) {
        this._avatarElement.style.backgroundImage = `url(${urlAvatar})`
    }
};