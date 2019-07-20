const game = {
    currentPlayer: null,
    field: []
};
const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function tileClicked() {
    const button = this;
    const row = button.dataset.row;
    const column = button.dataset.column;

    if (game.field[row][column] != null) {
        return
    }

    game.field[row][column] = game.currentPlayer;

    button.classList.add(game.currentPlayer ? "p1" : "p2");
    button.innerHTML = getDisplayName(game.currentPlayer);

    newRound()
}

function getDisplayName(playerState) {
    return playerState ? "⭕" : "✔️"
}

function switchPlayer() {
    game.currentPlayer = !game.currentPlayer
}

function renderGameField() {
    const gameArea = document.querySelector("#game");
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            const button = document.createElement("button");
            button.dataset.row = row;
            button.dataset.column = column;
            button.addEventListener("click", tileClicked);
            gameArea.appendChild(button)
        }
    }
}

function initState() {
    for (let row = 0; row < 3; row++) {
        game.field[row] = [];
        for (let column = 0; column < 3; column++) {
            game.field[row][column] = null
        }
    }
}

function determineWinner() {
    let fields = [];
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            fields.push(game.field[row][column])
        }
    }

    let winner = null;
    for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
        const WinCombinationsCombination = WIN_COMBINATIONS[i];
        winner = fields[WinCombinationsCombination[0]];
        for (let j = 1; j < 3; j++) {
            if (winner !== fields[WinCombinationsCombination[j]]) {
                winner = null
            }
        }

        if (winner != null) {
            return winner
        }
    }

    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == null) {
            return undefined;
        }
    }

    return null
}

function newRound() {
    switchPlayer();
    const winner = determineWinner();

    switch (winner) {
        case null:
            document.body.innerHTML = "<h1 class='draw'>draw!</h1>";
            break;

        case true:
        case false:
            document.body.innerHTML = `<h1 class='success'>${getDisplayName(winner)} is the winner!</h1>`
            break;

        default:
            break;
    }
}