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
prepGame();
// checkForGameOver();
// checkWinner();
// checkForDraw();
// validateForm();
// initiateGame();
// startGame();
// changePlayer();
// timer();
// gameOver();
// executeMove()

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom att fylla i här med antingen X eler O kan ni testa era rättningsfunktioner 
    oGameData.gameField = ['', '', '', '', '', '', '', '', ''];

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
    console.log(`Nu är vi längst ner i checkForGameOver`);
}

//Skapa en array av alla vinnande kombinationer.
//Skapa en flagga för isWinner.
//Loopa igenom alla winningCombos.
//I varje loop kontrollerar ni om alla platser i oGameData.GameField 
//som motsvarar nuvarande combo innehåller playerIn. Om sant, ändra värdet på flaggan.
//Returnera flaggan isWinner
function checkWinner(playerIn, numberOfMoves) {

/*
     // Kontrollera om minst 5 drag har gjorts - ett minimumkrav för att vinna spelet
    if (numberOfMoves < 5) { // En kontroll för att minst 5 klick/drag har gjorts på spelplanen för att ens kunna vinna.
        return false; // Om inte, avbryt exekvering och returnera false
    }
*/

    // Definiera alla vinnande kombinationer i spelet
    let winningCombos = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [4, 5, 6],
        [7, 8, 9],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7]
    ];

    let isWinner = false; // Skapa en variabel för att hålla reda på om spelaren har vunnit eller inte

    for (let i = 0; i < winningCombos.length; i++) { // Loopa igenom alla vinnande kombinationer
        let combo = winningCombos[i]; // Hämta den aktuella kombinationen

        // Hämta spelarens drag på de positioner som definieras av den aktuella kombinationen        
        let a = oGameData.gameField[combo[0] - 1];
        let b = oGameData.gameField[combo[1] - 1];
        let c = oGameData.gameField[combo[2] - 1];
        if (playerIn === a && playerIn === b && playerIn === c) { // Kontrollera om spelarens drag matchar den vinnande kombinationen
            isWinner = true; // Om ja, sätt isWinner till true och avbryt loopen
            break; // Avbryter loopen
        }
    }

    return isWinner; // Returnera om spelaren har vunnit eller inte
    console.log(`Nu är vi längst ner i checkWinner`);
}


// Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    if (oGameData.gameField.includes(``)) {
        return false;
    } else {
        return true;
    }
    console.log(`Nu är vi längst ner i checkForDraw`);
}


// Funktion som förbereder spelet inför start
//
function prepGame() {
    // Här lägger vi till klassen "d-none" på elementet i DOM-en med id:t "gameArea"
    const divRef = document.querySelector(`#gameArea`);
    divRef.classList.add(`d-none`);

    // Lägger en lyssnare på "Starta spelet!"-knappen som lyssnar efter ett klick. När den klickas anropas funktionen "initiateGame()".
    const btnRef = document.querySelector(`#newGame`);
    btnRef.addEventListener(`click`, initiateGame);

    console.log(`Nu är vi längst ner i prepGame`);
    
}



function validateForm() {
    console.log(`Nu är vi längst ner i validateForm`);
}



function initiateGame() {

    // Gömmer formuläret genom att lägga till klassen "d-none".
    const formRef = document.querySelector(`#theForm`);
    formRef.classList.add(`d-none`);

    // Visa spelplanen genom att ta bort klassen "d-none" på elementet med id:t "gameArea".
    const divRef = document.querySelector(`#gameArea`);
    divRef.classList.remove(`d-none`);

    // Ta bort textInnehållet i elementet med id:t "errorMsg".
    const pRef = document.querySelector(`#errorMsg`);
    pRef.textContent = ``;

    // Spara information om båda spelarna i objektet "oGameData" (dvs. användarnamn och färgval för respektive spelare).
    oGameData.nickNamePlayerOne = document.querySelector(`#nick1`).value
    console.log(oGameData.nickNamePlayerOne);

    oGameData.colorPlayerOne = document.querySelector(`#color1`).value
    console.log(oGameData.colorPlayerOne);

    oGameData.nickNamePlayerTwo = document.querySelector(`#nick2`).value
    console.log(oGameData.nickNamePlayerTwo);

    oGameData.colorPlayerTwo = document.querySelector(`#color2`).value
    console.log(oGameData.colorPlayerTwo);

    // Töm spelplanen genom att läsa in alla td-element, loopa igenom dem, och ändra dess text till en tom sträng (inga mellanslag).

    // const tdRef = document.querySelectorAll(`td`);
    // tdRef.forEach(tdEl => {
    //     tdEl.textContent = ``;
    //     tdEl.addEventListener(`click`, executeMove);
    // })



    // Deklarerar de lokala variablerna "playerChar" och "playerName".
    let playerChar = ``;
    let playerName = ``;
    let firstPlayer = Math.random(); // Bestämmer vilken spelare som skall börja genom att slumpa fram ett tal mellan 0 och 1. (0-0,9999999)

    if (firstPlayer < 0.5) { // Om talet är mindre än 0.5 så tilldelar ni: 
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    } else if (firstPlayer >= 0.5) { // Om talet är större än, eller lika med, 0.5 gör ni samma sak som ovan, fast med spelare 2.
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo
    }

    // Ändra texten i h1-elementet som ligger i div-elementet med klassen "jumbotron" till "Aktuell spelare är XXX", där ni ersätter XXX med namnet på den aktuella spelaren.
    const jumbotronRef = document.querySelector(`.jumbotron`);
    jumbotronRef.textContent = `Aktuell spelare är ${oGameData.currentPlayer}`;

    // Lägger till en klicklyssnare på tabellen som innehåller spelplanen. Vid klick skall funktionen "executeMove()" anropas.
    const tdRef = document.querySelectorAll(`td`);
    tdRef.forEach(tdEl => {
        tdEl.textContent = ``;
        tdEl.addEventListener(`click`, executeMove);
    })

    console.log(`Nu är vi längst ner i initiateGame`);
}

function executeMove(clickedBox) {

    const cell = clickedBox.target; // Får tag i den cellen som blir klickad

    const id = cell.getAttribute(`data-id`) // Får tag i data-id attributet ifrån cellen


    if (cell.textContent === ``) { // Hämtar ut attributet "data-id" från den klickade cellen, och använd detta för att sätta 
        oGameData.gameField[id] = oGameData.currentPlayer; // oGameData.gameField på den hämtade positionen till nuvarande spelare 
        cell.textContent = oGameData.currentPlayer; // Här skriver man ut X eller O med hjälp av värdet man skickar av data-id som är en siffra

        changePlayer(clickedBox)
    }


    let gameResultForGameOver = checkForGameOver(); // Kör funktionen checkForGameOver och lagrar resultatet i variabeln gameResultForGameOver

    if (gameResultForGameOver !== 0) { // Om resultatet av checkForGameOver inte är 0 (dvs. spelet är över)
        gameOver(gameResultForGameOver) // Kör funktionen gameOver med resultatet som parameter
    } 
    console.log(`Nu är vi längst ner i executeMove`);
}


function startGame() {
    console.log(`Nu är vi längst ner i startGame`);
}

function changePlayer(clickedBox) {

    const jumbotronRef = document.querySelector(`.jumbotron, h1`);

    const cell = clickedBox.target;

    if (oGameData.currentPlayer === oGameData.playerOne) { // Om nuvarande spelare är lika med spelare 1 då ska vi utföra följande
        cell.textContent = oGameData.playerOne // När vi klickar på en cell (1-9), sätter innehållet i den cellen till vara 'X' alltså spelare 1  Detta representerar spelarens drag på spelplanen.
        cell.style.backgroundColor = oGameData.colorPlayerOne // Ändrar bakgrundsfärgen på den klickade cellen till spelare 1:s färg.
        oGameData.currentPlayer = oGameData.playerTwo // Byter nuvarande spelare till spelare 2 för nästa omgång.
        jumbotronRef.textContent = `Aktuell spelare är ${oGameData.currentPlayer}`; // Uppdaterar texten på skärmen för att visa vem den nuvarande spelaren är.
    }
    else if (oGameData.currentPlayer === oGameData.playerTwo) { // Om den nuvarande spelaren är spelare 2, utför följande
        cell.textContent = oGameData.playerTwo // När vi klickar på en cell (1-9), sätter innehållet i den cellen till vara 'O' alltså spelare 2  Detta representerar spelarens drag på spelplanen.
        cell.style.backgroundColor = oGameData.colorPlayerTwo // Ändrar bakgrundsfärgen på den klickade cellen till spelare 2:s färg.
        oGameData.currentPlayer = oGameData.playerOne // Byter nuvarande spelare till spelare 1 för nästa omgång.
        jumbotronRef.textContent = `Aktuell spelare är ${oGameData.currentPlayer}`; // Uppdaterar texten på skärmen för att visa vem den nuvarande spelaren är.
    }

    console.log(`Nu är vi längst ner i changePlayer`);
}

function timer() {

    console.log(`Nu är vi längst ner i timer`);
}

// När funktionen gameOver anropars
// skickar du in ett av dessa nummer för att berätta för funktionen vad resultatet av spelet var.
// Funktionen använder sedan detta nummer för att bestämma vilket meddelande den ska skapa med hjälp av gameResult.
// Så om du till exempel kör gameOver(1), kommer funktionen att skapa meddelandet "Grattis till vinsten, Spelare 1"

function gameOver(gameResultNmbr) { // Parametern gameResult är ett nummer som skickas in till funktionen gameOver. Det representerar resultatet av spelet.

    // Ta bort klicklyssnaren på tabellen
    const tdRef = document.querySelectorAll(`td`);
    tdRef.forEach(tdEl => {
        tdEl.removeEventListener(`click`, executeMove);
    })


    const formRef = document.querySelector(`#theForm`);
    formRef.classList.remove(`d-none`); // Ta bort klassen "d-none" på formuläret

    // Lägg till klassen "d-none" på spelplanen
    const divRef = document.querySelector(`#gameArea`);
    divRef.classList.add(`d-none`);

    // Kontrollera vilken spelare som vunnit 
    // Gör en Switch-sats istället för en if-sats för att få pröva det också.

    let gameOverMsg = ``; //  Tilldelar gameOverMsg till en tom sträng

    switch (gameResultNmbr) {
        case 1: // Spelare ett har vunnit
            gameOverMsg = `Grattis till vinsten ${oGameData.nickNamePlayerOne}` 
            break;
        case 2: // Spelare två har vunnit
            gameOverMsg = `Grattis till vinsten ${oGameData.nickNamePlayerTwo}` 
            break;
        case 3:
            gameOverMsg = `Spelet är oavgjort, ingen vann denna runda.` // 
            break;
    } console.log(gameOverMsg);


    // Skriv ut ett vinnarmeddelande i jumbotronen, följt av "Spela igen?".
    const jumbotronRef = document.querySelector(`.jumbotron`);
    jumbotronRef.textContent = `Spela igen?`;

    // Anropa funktionen "initGlobalObject()".
    initGlobalObject();

    console.log(`Nu är vi längst ner i gameOver`);
}

