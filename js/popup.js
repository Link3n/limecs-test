export default class Popup {
    constructor() {
        this.popup = document.getElementById('popup');
        this.wheelResult = document.getElementById('wheel-result');
        this.closePopup = document.getElementById('close-popup');
        this.spinWheel = document.getElementById('spin-wheel');

        this._attachEvent();
    }

    show(text) {
        let self = this;
        this.wheelResult.textContent = text;
        this.popup.classList.add('popup--show');

        document.addEventListener('click', function closeAfterOutsideClick(e) {
            if (!e.target.closest('#popup')) {
                self.hide();
                document.removeEventListener('click', closeAfterOutsideClick);
            }
        });
    }

    hide() {
        this.popup.classList.remove('popup--show');
    }

    _attachEvent() {
        this.closePopup.addEventListener('click', () => {
           this.hide();
        });

        this.spinWheel.addEventListener('click', () => {
            let startWheelButton = document.getElementById('wheel-start');
            let event = document.createEvent('MouseEvents');

            event.initEvent('click', true, false);
            startWheelButton.dispatchEvent(event);
            this.hide();
        })
    }
}
