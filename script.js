const gameBoard = document.getElementById("game-board");

const flexDirectionSelect = document.getElementById("flex-direction");
const justifyContentSelect = document.getElementById("justify-content");
const alignItemsSelect = document.getElementById("align-items");
const flexWrapSelect = document.getElementById("flex-wrap");

const checkButton = document.getElementById("check-button");
const resetButton = document.getElementById("reset-button");
const nextButton = document.getElementById("next-button");

const instruction = document.getElementById("instruction");
const levelCounter = document.getElementById("level-counter");
const message = document.getElementById("message");


const levels = [

    {
        instruction: "Center all planets horizontally.",

        solution: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "nowrap"
        }
    },

    {
        instruction: "Arrange the planets from top to bottom.",

        solution: {
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            flexWrap: "nowrap"
        }
    },

    {
        instruction: "Move the planets to the bottom of the board.",

        solution: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flexWrap: "nowrap"
        }
    },

    {
        instruction: "Place the planets in a row with equal space between them and center them vertically.",

        solution: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap"
        }
    },

    {
        instruction: "Arrange the planets vertically in the center and move them to the right side.",

        solution: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            flexWrap: "nowrap"
        }
    },

    {
        instruction: "Wrap the planets and center them horizontally.",

        solution: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "wrap"
        }
    }

];


let currentLevel = 0;


function updateBoard() {

    gameBoard.style.flexDirection = flexDirectionSelect.value;

    gameBoard.style.justifyContent = justifyContentSelect.value;

    gameBoard.style.alignItems = alignItemsSelect.value;

    gameBoard.style.flexWrap = flexWrapSelect.value;
}


function resetLevel() {

    flexDirectionSelect.value = "row";

    justifyContentSelect.value = "flex-start";

    alignItemsSelect.value = "stretch";

    flexWrapSelect.value = "nowrap";

    message.textContent = "";

    message.className = "message";

    nextButton.disabled = true;

    updateBoard();
}


function loadLevel() {

    levelCounter.textContent =
        `Level ${currentLevel + 1} of ${levels.length}`;

    instruction.textContent =
        levels[currentLevel].instruction;

    resetLevel();
}


function checkAnswer() {

    const solution =
        levels[currentLevel].solution;


    const isCorrect =
        flexDirectionSelect.value === solution.flexDirection &&
        justifyContentSelect.value === solution.justifyContent &&
        alignItemsSelect.value === solution.alignItems &&
        flexWrapSelect.value === solution.flexWrap;


    if (isCorrect) {

        message.textContent =
            "✅ Correct! Great job.";

        message.className =
            "message success";

        nextButton.disabled = false;

    }

    else {

        message.textContent =
            "❌ Not quite. Try again.";

        message.className =
            "message error";

    }
}


function nextLevel() {

    if (currentLevel < levels.length - 1) {

        currentLevel++;

        loadLevel();

    }

    else {

        instruction.textContent =
            "Mission Complete! 🎉";

        message.textContent =
            "You completed all Flexbox levels!";

        message.className =
            "message success";

        nextButton.disabled = true;

    }
}


flexDirectionSelect.addEventListener(
    "change",
    updateBoard
);

justifyContentSelect.addEventListener(
    "change",
    updateBoard
);

alignItemsSelect.addEventListener(
    "change",
    updateBoard
);

flexWrapSelect.addEventListener(
    "change",
    updateBoard
);


checkButton.addEventListener(
    "click",
    checkAnswer
);

resetButton.addEventListener(
    "click",
    resetLevel
);

nextButton.addEventListener(
    "click",
    nextLevel
);


loadLevel();