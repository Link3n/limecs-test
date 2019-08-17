import Popup from './popup.js';

const fullRotation = 360;
const segmentsCount = 6;
const segmentDegree = fullRotation / segmentsCount;
const minimumCountOfWheelRotation = 2 * fullRotation; //It is necessary not to get instant results

const popup = new Popup();

export default class Wheel {
    constructor() {
        this.wheel = document.getElementById('wheel');
        this.target = null;
        this.lastTargetDegree = null;
        this.lastRotationDegree = null;

        this._attachEvents();
    }

    rotateWheel() {
        let rotationDegree = this._calculateRotation();

        this.wheel.style.transform = `rotate(-${rotationDegree}deg)`;
    }

    _calculateRotation() {
        this.target = Math.floor(Math.random() * (segmentsCount - 1));
        let targetDegree = this.target * segmentDegree;
        let rotationDegree = null;

        if (this.lastRotationDegree) {
            let degreeToEndRotate = this.lastTargetDegree ? fullRotation - this.lastTargetDegree : 0;

            rotationDegree = targetDegree + degreeToEndRotate + minimumCountOfWheelRotation + this.lastRotationDegree
        } else {
            rotationDegree = targetDegree + minimumCountOfWheelRotation;
        }

        this.lastTargetDegree = targetDegree;
        this.lastRotationDegree = rotationDegree;

        return rotationDegree;
    }

    _attachEvents() {
        let startWheelButton = document.getElementById('wheel-start');

        startWheelButton.addEventListener('click', () => {
            this.rotateWheel();
            startWheelButton.classList.add('button--rotating');
        });
        this.wheel.addEventListener('transitionend', () => {
            popup.show(this.target + 1);
            startWheelButton.classList.remove('button--rotating');
        });
    }
}
