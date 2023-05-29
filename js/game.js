'use strict'

const WALL = '#'
const FOOD = '.'
const POWER_FOOD = 'o'
const CHERRY = '🍒'
const EMPTY = ' '

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gTotalFood
var gIntervalCherry
var gIsVictory = true

function onInit() {
    gGame.isOn = true
    gGame.score = 0
    gTotalFood = 0

    clearInterval(gIntervalCherry)
    gBoard = buildBoard()
    updateScore(1)
    closeModal()

    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard)
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

            } else if (i === 1 && j === 1 || i === 1 && j === 8 ||
                i === 8 && j === 1 || i === 8 && j === 8) {

                board[i][j] = POWER_FOOD
            }
            if (board[i][j] === FOOD) gTotalFood++
        }
    }
    gIntervalCherry = setInterval(placeCherry, 15000)
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const renderedCell = getRenderedItemOf(cell)
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${renderedCell}</td>`
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

function placeCherry() {
    const emptyLocations = getAllEmptyLocations(gBoard)
    const randLocation = emptyLocations[getRandomIntExclusive(0, emptyLocations.length)]

    if (emptyLocations.length !== 0) {
        gBoard[randLocation.i][randLocation.j] = CHERRY
        renderCell(randLocation, CHERRY)
    }
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score

    checkWin()
}

function checkWin() {
    
    gIsVictory = true

    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[0].length; j++) {

            if (gBoard[i][j] === FOOD) {
                gIsVictory = false
                break
            }
        }
    }

    if (gIsVictory) {
        gGame.isOn = false;
        clearInterval(gIntervalGhosts)
        clearInterval(gIntervalCherry)
        displayModal(true)
    }
}

function gameOver() {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, EMPTY)
    displayModal(false)
}

function displayModal(isVictory) {

    const elModal = document.querySelector('.modal')
    const elModalContent = document.querySelector('.modal h1')

    elModal.style.display = 'block'
    elModal.style.borderColor = isVictory ? 'green' : 'red'
    elModalContent.style.color = isVictory ? 'green' : 'red'
    elModalContent.innerText = isVictory ? 'Victory!' : 'Game Over!'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function getDivHTML(className) {
    return `<div class="${className}"></div>`
}