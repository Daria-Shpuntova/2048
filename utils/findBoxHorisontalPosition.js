export default function findBoxHorisontalPosition({
    matrix,
    startCondition,
    x,
    y,
    chengeMethod,
    endCondition,
    box
    }) {
    const boxLine = matrix[y];
         if (startCondition(x)) return
         let currentX = x;
         let foundX = x;
         do {
             currentX = chengeMethod(currentX);
             const anotherBox = boxLine[currentX];


             if (anotherBox) {
                if (anotherBox.getValue() === box.getValue()){
                    foundX = currentX;
                    box.mergeBoxValue();
                    anotherBox.kill();
                }
                break;
             } else {
                 foundX = currentX;
             }
         } while (endCondition(currentX));
         box.setBoxPosition({
             x: foundX,
             y
         });

    }
