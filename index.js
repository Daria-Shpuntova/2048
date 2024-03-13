import getMatrix from "./utils/getMatrix.js";
import createBox from "./utils/createBox.js";
import createListeners from "./utils/listeners.js";

const app = document.getElementById("app");

function startGame(){
    createListeners();
    createBox();
    createBox();
}

startGame();