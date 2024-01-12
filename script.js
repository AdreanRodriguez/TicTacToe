"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {
    playerOne: "X",
    playerTwo: "O",
    currentPlayer: "",
    nickNamePlayerOne: "",
    nickNamePlayerTwo: "",
    colorPlayerOne: "",
    colorPlayerTwo: "",
    seconds: 5,
    gameField: ['', '', '', '', '', '', '', '', ''],
    timerEnabled: false,
    timerId: null,
    timeRef: document.querySelector("#errorMsg")
};

initGlobalObject();
checkForGameOver();
checkWinner();
checkForDraw();
prepGame();
validateForm();
initiateGame();
startGame();
changePlayer();
timer();
gameOver();

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom att fylla i här med antingen X eler O kan ni testa era rättningsfunktioner 
    oGameData.gameField = ['O', 'O', 'O', '', '', '', '', '', ''];

    /* Testdata för att testa rättningslösning */
    // oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
    // oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
    // oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
    // oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
    // oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //Antalet sekunder för timerfunktionen
    oGameData.seconds = 5;

    //Timerns ID
    oGameData.timerId = null;

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {
    //Kontrollerar om "X" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 1
    if (checkWinner('X')) {
        return 1;
    }
    //Kontrollerar om "O" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 2
    if (checkWinner('O')) {
        return 2;
    }
    //Kontrollerar om spelet är oavgjort, returnerar isåfall 3
    if (checkForDraw()) {
        return 3;
    }
    //Annars returneras 0, och spelet fortlöper
    else {
        return 0;
    }
}

//Skapa en array av alla vinnande kombinationer.
//Skapa en flagga för isWinner.
//Loopa igenom alla winningCombos.
//I varje loop kontrollerar ni om alla platser i oGameData.GameField 
//som motsvarar nuvarande combo innehåller playerIn. Om sant, ändra värdet på flaggan.
//Returnera flaggan isWinner
function checkWinner(playerIn) {
    let winningCombinations = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [4, 5, 6],
        [7, 8, 9],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7]
    ];

    let isWinner = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        let combo = winningCombinations[i];
        let comboIsWinner = true;

        for (let j = 0; j < combo.length; j++) {
            let pos = combo[j];

            if (oGameData.gameField[pos - 1] !== playerIn) {
                comboIsWinner = false;
            }
        }

        if (comboIsWinner) {
            isWinner = true;
        }
    }

    return isWinner;
}
    

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {

}

//Funktion som förbereder spelet inför start
function prepGame() {

}

function validateForm() {

}

function initiateGame() {

}

function startGame() {

}

function changePlayer() {

}

function timer() {

}

function gameOver() {

} 