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

const instruction =
    document.getElementById("instruction");

const levelCounter =
    document.getElementById("level-counter");

const attemptCounter =
    document.getElementById("attempt-counter");


// -----------------------------------
// MODAL ELEMENTS
// -----------------------------------

const resultModal =
    document.getElementById("result-modal");

const modalContent =
    resultModal.querySelector(".modal-content");

const modalIcon =
    document.getElementById("modal-icon");

const modalTitle =
    document.getElementById("modal-title");

const modalMessage =
    document.getElementById("modal-message");

const modalButton =
    document.getElementById("modal-button");


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

    // SHIRA - LEVEL 1

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


    // SHIRA - LEVEL 2

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


    // SHIRA - LEVEL 3

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

let attempts = 0;

let answerWasCorrect = false;


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

        planet.className =
            "planet";

        planet.textContent =
            planetIcons[
                index %
                planetIcons.length
            ];

        gameBoard.appendChild(
            planet
        );
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
// ATTEMPT COUNTER
// -----------------------------------

function updateAttempts() {

    attemptCounter.textContent =
        `Attempts: ${attempts}`;
}


// -----------------------------------
// SHOW MODAL
// -----------------------------------

function showModal(
    type,
    title,
    text,
    buttonText
) {

    modalContent.classList.remove(
        "success-modal",
        "error-modal"
    );


    if (type === "success") {

        modalContent.classList.add(
            "success-modal"
        );

        modalIcon.textContent =
            "🚀";

    }

    else {

        modalContent.classList.add(
            "error-modal"
        );

        modalIcon.textContent =
            "🛸";

    }


    modalTitle.textContent =
        title;

    modalMessage.textContent =
        text;

    modalButton.textContent =
        buttonText;

    resultModal.classList.add(
        "show"
    );

    resultModal.setAttribute(
        "aria-hidden",
        "false"
    );
}


// -----------------------------------
// CLOSE MODAL
// -----------------------------------

function closeModal() {

    resultModal.classList.remove(
        "show"
    );

    resultModal.setAttribute(
        "aria-hidden",
        "true"
    );
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

    attempts = 0;

    answerWasCorrect = false;

    updateAttempts();

    gameBoard.classList.remove(
        "completed",
        "wrong-answer"
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

    attempts++;

    updateAttempts();

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


    gameBoard.classList.remove(
        "completed",
        "wrong-answer"
    );


    if (isCorrect) {

        answerWasCorrect = true;

        gameBoard.classList.add(
            "completed"
        );


        showModal(
            "success",
            "Mission Accomplished! 🎉",
            `Correct! You solved this level in ${attempts} attempt${attempts === 1 ? "" : "s"}.`,
            currentLevel === levels.length - 1
                ? "Finish Mission"
                : "Next Level"
        );

    }

    else {

        answerWasCorrect = false;

        void gameBoard.offsetWidth;

        gameBoard.classList.add(
            "wrong-answer"
        );


        showModal(
            "error",
            "Not Quite Yet",
            "Adjust the Flexbox properties and try again.",
            "Try Again"
        );
    }
}


// -----------------------------------
// MODAL BUTTON
// -----------------------------------

function handleModalButton() {

    closeModal();


    if (!answerWasCorrect) {

        return;
    }


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

        attemptCounter.textContent =
            "All levels completed";

        instruction.textContent =
            "You completed all Flexbox missions! 🎉";

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

modalButton.addEventListener(
    "click",
    handleModalButton
);


// -----------------------------------
// START GAME
// -----------------------------------

loadLevel();