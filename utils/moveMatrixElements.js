import getMatrix from './getMatrix.js'
import createBox  from './createBox.js'
import gameOver from './gameOver.js'


export default function moveMatrixElements(moveDirection) {
    const matrix = getMatrix();
    const oldMatrix = _.cloneDeep(matrix);
    console.log(matrix, 'matrix')
    console.log(oldMatrix, 'oldMatrix')

    if (moveDirection == 'left') {
        for (let index = 1; index < matrix.length; index++){
            matrix.forEach(matrixLine => {
                const box = matrixLine[index]
                if (box) {
                    box.move(moveDirection);
                }
            });
        }

    } else if (moveDirection == 'right') {
        for (let index = matrix.length - 2; index > -1; index--){
            matrix.forEach(matrixLine => {
                const box = matrixLine[index]
                if (box) {
                    box.move(moveDirection);
                }
            });
        }

    } else if (moveDirection == 'up') {
        matrix.forEach((matrixLine) => {
            matrixLine.forEach(box => {
                if (box) {
                    box.move(moveDirection);
                }
            });
        });

    } else if (moveDirection == 'down') {
        for (let index = matrix.length - 2; index > -1 ; index--){
            matrix[index].forEach((box) => {
                if (box) {
                    box.move(moveDirection);
                }
            });
        }
    }
    const isSameMatrix = _.isEqual(oldMatrix, matrix);

    if (!isSameMatrix) {
        createBox();
        const isGameOver = gameOver(matrix);

        if (isGameOver) {
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = 'GAME OVER';
            errorDiv.classList.add('error-div');

            document.getElementById('app').appendChild(errorDiv);
        }
    }

}