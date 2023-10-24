const cellElements = document.querySelectorAll('[data-cell]')
const X_CLASS = 'x'
const O_CLASS = 'o'
board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const WINNING_COMBINATIONS = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let oTurn

startGame()

const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

const restartButton = document.getElementById('restart-button')

restartButton.addEventListener('click', startGame)

function startGame(){
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
    })
    oTurn = false
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
    
}

function handleClick(e){
    const cell = e.target
    //oTurn is predefined as false so X goes first
    const currentClass = oTurn ? O_CLASS : X_CLASS
    //place mark
    placeMark(cell, currentClass)
    //check for win
    if (checkWin(currentClass)){
        endGame(false)
    }
    //check for draw
    else if (isDraw()){
        endGame(true)
    }
    else{
        //switch turns
        oTurn = !oTurn;
        //start with the hover
        setBoardHoverClass()
    }
}


function endGame(draw){
    if (draw){ 
        winningMessageTextElement.innerText = "It's a Draw"
    }
    else{
        winningMessageTextElement.innerText = `${oTurn ? "O" : "X"} Wins`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (oTurn){
        board.classList.add(O_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combinations =>{
        return combinations.every( index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
