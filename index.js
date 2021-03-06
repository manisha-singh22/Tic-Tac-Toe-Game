let boxes = Array.from(document.getElementsByClassName('cell'));
let playText = document.getElementById('playText');
let restartBtn = document.getElementById('restartBtn');

const player1 = 'X';
const player2 = '0';
let spaces = [];
let currentPlayer;

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let style = '';

        if(index < 3) {
            style += 'border-bottom: 1px solid black;';
        }
        if(index % 3 == 0) {
            style += 'border-right: 1px solid black;';
        } 
        if(index % 3 == 2) {
            style += 'border-left: 1px solid black;';
        }
        if(index > 5) {
            style += 'border-top: 1px solid black;';
        }

        box.addEventListener('click', boxClicked);
        box.style = style;
    })
}

const playerHasWon = () => {
    if(spaces[0] == currentPlayer) {
        if(spaces[1] == currentPlayer && spaces[2] == currentPlayer) {
            console.log(`Player ${currentPlayer} has won by top`);
            return true;
        }
        if(spaces[3] == currentPlayer && spaces[6] == currentPlayer) {
            console.log(`Player ${currentPlayer} has won by left`);
            return true;
        }
        if(spaces[4] == currentPlayer && spaces[8] == currentPlayer) {
            console.log(`Player ${currentPlayer} has won by diagonal`);
            return true;
        }
    }

    if(spaces[8] == currentPlayer) {
        if(spaces[7] == currentPlayer && spaces[6] == currentPlayer) {
            console.log(`Player ${currentPlayer} has won by bottom`);
            return true;
        }
        if(spaces[5] == currentPlayer && spaces[2] == currentPlayer) {
            console.log(`Player ${currentPlayer} has won by right`);
            return true;
        }
    }

    if(spaces[4] == currentPlayer) {
        if(spaces[3] == currentPlayer && spaces[5] == currentPlayer) {
            console.log(`Player ${currentPlayer} win by horizontal middle`)
            return true;
        }
        if(spaces[1] == currentPlayer && spaces[7] == currentPlayer) {
            console.log(`Player ${currentPlayer} has won by vertical middle`);
            return true;
        }
        if(spaces[2] == currentPlayer && spaces[6] == currentPlayer) {
            console.log(`Player ${currentPlayer} has won by opposite diagonal`);
            return true;
        }
    }
}

const restart = () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    })

    boxes.forEach(box => {
        box.innerText = '';
    })

    currentPlayer = player1;
    playText.innerText = "Let's Play."
}

restartBtn.addEventListener('click', restart);

const MatchIsTie = () => {
    if((spaces[0] == player1 || spaces[0] == player2) && (spaces[1] == player1 || spaces[1] == player2) && (spaces[2] == player1 || spaces[2] == player2) && (spaces[3] == player1 || spaces[3] == player2) && (spaces[4] == player1 || spaces[4] == player2) && (spaces[5] == player1 || spaces[5] == player2) && (spaces[6] == player1 || spaces[6] == player2) && (spaces[7] == player1 || spaces[7] == player2) && (spaces[8] == player1 || spaces[8] == player2))
        return true;

    return false;
}

const boxClicked = (e) => {
    const id = e.target.id;
    if(!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon()) {
            playText.innerText = `Player ${currentPlayer} has won`;
            return;
        } 
        if(MatchIsTie()) {
            playText.innerText = `Match is a Draw.`;
            return;
        }
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
}

restart();
drawBoard();