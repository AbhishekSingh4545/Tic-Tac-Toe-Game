
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell !== '')) {
        message.textContent = 'It\'s a tie!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
