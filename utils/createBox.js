import {addBoxToMatrix} from "./getMatrix.js";
import {getEmptyMatrixCoordynates} from "./getMatrix.js";
import generateRange from "./generateRange.js";
import getMatrix from './getMatrix.js'
import {changeMatrixBoxPosition} from './getMatrix.js'
import findBoxHorisontalPosition from './findBoxHorisontalPosition.js'
import findBoxVertikalPosition from './findBoxVertikalPosition.js'

function getValue() {
    return Math.random() > 0.75 ? 4 : 2
}

function geRandom(length) {
    let rend = Math.floor(Math.random() * length);
    return rend
}

function getBoxPosition() {
    const emptyCoordynates = getEmptyMatrixCoordynates();
    const randomCoordinteIndex  = geRandom( emptyCoordynates.length - 1 );
    return emptyCoordynates[randomCoordinteIndex];
}


function createBoxElem() {
    const boxWrapper = document.createElement('div');
    boxWrapper.classList.add('wrap-box');
    return boxWrapper
}

class Box{
    constructor() {
        this.id = generateRange(1, 9999999);
        this.value = getValue();
        this.position = getBoxPosition();
        this.boxElement = createBoxElem();
    }

    setBoxPosition(newPosition) {
        this.position = newPosition;
    }

    getValue() {
        return this.value;
    }

    changeBoxPosition(){
        const boxX = this.position.x * 25;
        const boxY = this.position.y * 25;

        this.boxElement.style.top = boxY + '%';
        this.boxElement.style.left = boxX + '%';
    }

    getPosition() {
        return this.position
    }

    kill() {
        setTimeout(() => {
            this.boxElement.remove();
        }, 100);
    }

    setBoxValue(shouldAddClass = true) {
        this.boxElement.innerHTML = this.value;

        this.boxElement.classList.remove(`number_${this.value / 2}`);
        if (shouldAddClass) {
            this.boxElement.classList.add(`number_${this.value}`);
        }
    }

    mergeBoxValue() {
        this.value = this.value * 2;
        const souldAddClass = this.value <= 2048
        setTimeout(() => {
            this.setBoxValue();
        }, 100)
    }

    move(moveDirection) {
        const matrix = getMatrix();
        const { x, y } = this.getPosition();
        switch (moveDirection) {
            case "left": {
                findBoxHorisontalPosition({
                    box: this,
                    x,
                    y,
                    matrix,
                    startCondition: x => !x,
                    endCondition: currentX => currentX > 0,
                    chengeMethod: currentX => currentX - 1
                });
                break;
            }
            case "right": {
                findBoxHorisontalPosition({
                    box: this,
                    x,
                    y,
                    matrix,
                    startCondition: x => x === 3,
                    endCondition: currentX => currentX < 3,
                    chengeMethod: currentX => currentX + 1
                });
                break;
            }
            case "up": {
                findBoxVertikalPosition({
                    box: this,
                    x,
                    y,
                    matrix,
                    startCondition: (y) => !y,
                    endCondition: currentY => currentY > 0,
                    chengeMethod: currentY => currentY - 1
                });
                break;
            }
            case "down": {
                findBoxVertikalPosition({
                    box: this,
                    x,
                    y,
                    matrix,
                    startCondition: (y) => y === 3,
                    endCondition: currentY => currentY < 3,
                    chengeMethod: currentY => currentY + 1
                });

                break;
            }
            default:
                return;
        }
        this.changeBoxPosition();
        changeMatrixBoxPosition(this);
    }

    setBoxToScreen(){
        const matrixElem = document.getElementById('matrix');
        this.changeBoxPosition();
        this.setBoxValue();
        addBoxToMatrix(this);

        matrixElem.appendChild(this.boxElement);
    }
}

export default function createBox () {
    const newBox = new Box();
    newBox.setBoxToScreen();
    return newBox
}