export default class FormValidator {
    constructor(form, data) {
        this._form = form;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._btnSubmit = this._form.querySelector(data.submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(data.inputSelector));
    };

    enableValidation() {
        this._toggleButtonState();
        this._inputList.forEach((elementInput) => {
            elementInput.addEventListener('input', (evt) => {
                this._handeleFormInput(evt);
                this._toggleButtonState();
            });
        });
        this._setEventListeners();
    };

    _setEventListeners() {
        this._form.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState();
                this._inputList.forEach((elementInput) => {
                    this._hideInputError(elementInput, this._getformError(elementInput));
                });
            }, 0);
        });
    };

    _showInputError(selectInput, formError) {
        selectInput.classList.add(this._inputErrorClass);
        formError.textContent = selectInput.validationMessage;
    };

    _hideInputError = (selectInput, formError) => {
        selectInput.classList.remove(this._inputErrorClass);
        formError.textContent = '';
    };

    _inputIsValid = (selectInput, formError) => {
        if (!selectInput.validity.valid) {
            this._showInputError(selectInput, formError);
        } else {
            this._hideInputError(selectInput, formError);
        };
    };

    _hasInputValid = () => {
        return this._inputList.some((input) => !input.validity.valid);
    };

    _toggleButtonState = () => {
        if (this._hasInputValid()) {
            this._disabledSubmitBtn();
        } else {
            this._enableSubmitBtn();
        };
    };

    _getformError(input) {
        return this._form.querySelector(`.${input.name}-error`);
    }

    _disabledSubmitBtn = () => {
        this._btnSubmit.classList.add(this._inactiveButtonClass);
        this._btnSubmit.disabled = true;
    };

    _enableSubmitBtn = () => {
        this._btnSubmit.classList.remove(this._inactiveButtonClass);
        this._btnSubmit.disabled = false;
    };

    _handeleFormInput = (evt) => {
        const selectInput = evt.target;
        this._inputIsValid(selectInput, this._getformError(selectInput));
    };
};