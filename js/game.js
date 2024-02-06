'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '💪'
const CHERRY = '🍒'

// Model
const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var intervalId
var gcherrycount
var gcherryinterval

function onInit() {
    var modal = document.querySelector('.modal')
    modal.style.display = 'none'
    updateScore(0)
    gcherrycount=1
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    gcherryinterval = setInterval(cherryRandom, 15000)

    // moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1]=SUPERFOOD
    board[8][1]=SUPERFOOD
    board[1][8]=SUPERFOOD
    board[8][8]=SUPERFOOD
    


    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
    if(gGame.score===60){
        victorious()
        gameOver()
    }
}


function victorious(){
    var elmodal = document.querySelector('.modal h4')
    elmodal.innerText ='WINNER!'
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    var elmodal = document.querySelector('.modal')
    elmodal.style.display = 'block'
    gGame.isOn = false
    clearInterval(gcherryinterval)
}

function cherryRandom(){
    const emptyPos = getEmptyPos()
    if (!emptyPos) return
    gBoard[emptyPos.i][emptyPos.j] = CHERRY
    renderCell(emptyPos, CHERRY)
    gcherrycount++
    

}