"use strict";

const boardRegions = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let playerTurn = '';

function updateTitle() {
    const playerInput = document.getElementById(playerTurn);
    document.getElementById("playerTurn").innerText = playerInput.value;
}

function initializeGame() {
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']];
    playerTurn = "player1";
    document.querySelector("h2").innerHTML = 'Player turn: <span id="playerTurn"></span>';
    updateTitle();
    boardRegions.forEach((el) => {
        el.classList.remove("win");
        el.innerText = "";
        el.classList.add("cursor-pointer");
        el.addEventListener("click", handleBoardClick)
    });
}

function disableRegion(element) {
    element.classList.remove("cursor-pointer");
    element.removeEventListener("click", handleBoardClick);
}

function handleWin(regions) {
    regions.forEach((region) => {
        document.querySelector('[data-region="' + region + '"]').classList.add("win");
    });
    const currentPlayer = document.getElementById(playerTurn).value;
    document.querySelector("h2").innerHTML = currentPlayer + ' won!'
}

function handleBoardClick(ev) {
    const span = ev.currentTarget;
    const region = span.dataset.region;
    const rowColumnPair = region.split(".");
    const row = rowColumnPair[0];
    const column = rowColumnPair[1];

    if (playerTurn === "player1") {
        span.innerText = "X";
        vBoard[row][column] = "X";
    } else {
        span.innerText = "O";
        vBoard[row][column] = "O";
    }
    console.clear();
    console.table(vBoard);
    disableRegion(span);

    const winRegions = getWinRegions();

    if (winRegions.length > 0) {
        handleWin(winRegions);
    } else if (vBoard.flat().includes("")) {
        playerTurn = playerTurn === "player1" ? "player2" : "player1";
        updateTitle()
    } else {
        document.querySelector("h2").innerHTML = "Draw";
    }
}

function getWinRegions() {
    const winRegions = [];
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions;
}

document.getElementById("start").addEventListener("click", initializeGame);