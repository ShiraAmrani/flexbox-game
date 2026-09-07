// -----------------------------------
// DOM ELEMENTS
// -----------------------------------

const gameBoard =
    document.getElementById("game-board");

const flexDirectionSelect =
    document.getElementById("flex-direction");

const justifyContentSelect =
    document.getElementById("justify-content");

const alignItemsSelect =
    document.getElementById("align-items");

const flexWrapSelect =
    document.getElementById("flex-wrap");

const checkButton =
    document.getElementById("check-button");

const resetButton =
    document.getElementById("reset-button");

const nextButton =
    document.getElementById("next-button");

const instruction =
    document.getElementById("instruction");

const levelCounter =
    document.getElementById("level-counter");

const message =
    document.getElementById("message");


// -----------------------------------
// PLANETS
// -----------------------------------

const planetIcons = [
    "🌍",
    "🪐",
    "🌕",
    "🌎",
    "🌑",
    "🌒",
    "🌓",
    "🌔",
    "🌙",
    "☄️"
];


// -----------------------------------
// LEVELS
// -----------------------------------

const levels = [

    // -------------------------------
    // SHIRA - LEVEL 1
    // -------------------------------

    {
        instruction:
            "Center all planets horizontally.",

        itemCount: 3,

        solution: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "nowrap"
        }
    },


    // -------------------------------
    // SHIRA - LEVEL 2
    // -------------------------------

    {
        instruction:
            "Arrange the planets from top to bottom.",

        itemCount: 3,

        solution: {
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            flexWrap: "nowrap"
        }
    },


    // -------------------------------
    // SHIRA - LEVEL 3
    // -------------------------------

    {
        instruction:
            "Keep the planets in a row and move them to the bottom of the board.",

        itemCount: 4,

        solution: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flexWrap: "nowrap"
        }
    },


    // ===================================
    // PARTNER SECTION
    // LEVELS 4-6
    // ===================================


    {
        instruction:
            "Place the planets in a row with equal space between them and center them vertically.",

        itemCount: 4,

        solution: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap"
        }
    },


    {
        instruction:
            "Arrange the planets vertically, center them from top to bottom and move them to the right side.",

        itemCount: 3,

        solution: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            flexWrap: "nowrap"
        }
    },


    {
        instruction:
            "Wrap the planets onto multiple rows and center them horizontally.",

        itemCount: 10,

        solution: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap"
        }
    }

];


// -----------------------------------
// GAME STATE
// -----------------------------------

let currentLevel = 0;


// -----------------------------------
// CREATE PLANETS
// -----------------------------------

function createPlanets(itemCount) {

    gameBoard.innerHTML = "";

    for (
        let index = 0;
        index < itemCount;
        index++
    ) {

        const planet =
            document.createElement("div");

        planet.className = "planet";

        planet.textContent =
            planetIcons[
                index %
                planetIcons.length
            ];

        gameBoard.appendChild(planet);
    }
}


// -----------------------------------
// UPDATE BOARD
// -----------------------------------

function updateBoard() {

    gameBoard.style.flexDirection =
        flexDirectionSelect.value;

    gameBoard.style.justifyContent =
        justifyContentSelect.value;

    gameBoard.style.alignItems =
        alignItemsSelect.value;

    gameBoard.style.flexWrap =
        flexWrapSelect.value;
}


// -----------------------------------
// RESET LEVEL
// -----------------------------------

function resetLevel() {

    flexDirectionSelect.value =
        "row";

    justifyContentSelect.value =
        "flex-start";

    alignItemsSelect.value =
        "stretch";

    flexWrapSelect.value =
        "nowrap";

    message.textContent = "";

    message.className =
        "message";

    nextButton.disabled =
        true;

    gameBoard.classList.remove(
        "completed"
    );

    updateBoard();
}


// -----------------------------------
// LOAD LEVEL
// -----------------------------------

function loadLevel() {

    const level =
        levels[currentLevel];

    levelCounter.textContent =
        `Level ${currentLevel + 1} of ${levels.length}`;

    instruction.textContent =
        level.instruction;

    createPlanets(
        level.itemCount
    );

    resetLevel();
}


// -----------------------------------
// CHECK ANSWER
// -----------------------------------

function checkAnswer() {

    const solution =
        levels[currentLevel].solution;

    const isCorrect =
        flexDirectionSelect.value
            === solution.flexDirection
        &&
        justifyContentSelect.value
            === solution.justifyContent
        &&
        alignItemsSelect.value
            === solution.alignItems
        &&
        flexWrapSelect.value
            === solution.flexWrap;


    if (isCorrect) {

        message.textContent =
            "✅ Correct! Mission accomplished.";

        message.className =
            "message success";

        nextButton.disabled =
            false;

        gameBoard.classList.add(
            "completed"
        );

    }

    else {

        message.textContent =
            "❌ Not quite. Adjust the Flexbox properties and try again.";

        message.className =
            "message error";

        nextButton.disabled =
            true;

        gameBoard.classList.remove(
            "completed"
        );
    }
}


// -----------------------------------
// NEXT LEVEL
// -----------------------------------

function nextLevel() {

    if (
        currentLevel <
        levels.length - 1
    ) {

        currentLevel++;

        loadLevel();

    }

    else {

        levelCounter.textContent =
            "Mission Complete";

        instruction.textContent =
            "You completed all Flexbox missions! 🎉";

        message.textContent =
            "🚀 Excellent work! You mastered the Space Flex Mission.";

        message.className =
            "message success";

        nextButton.disabled =
            true;

        checkButton.disabled =
            true;

        resetButton.disabled =
            true;

        gameBoard.classList.add(
            "completed"
        );
    }
}


// -----------------------------------
// EVENT LISTENERS
// -----------------------------------

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


// -----------------------------------
// START GAME
// -----------------------------------

loadLevel();