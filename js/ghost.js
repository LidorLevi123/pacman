'use strict'

const GHOST = '👻'

var gGhosts
var gIntervalGhosts
var gGhostTimeoutID

function createGhost(board) {
    var ghost = {
        id: makeId(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: ''
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []

    for (var i = 0; i < 4; i++) {
        createGhost(board)
        gGhosts[i].color = getColor(i)
        gGhosts[i].orgColor = getColor(i)
    }
    console.log('gGhosts:', gGhosts)

    clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location:', ghost.location)
    const moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // hitting a pacman? call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver()
        return
    } else if (nextCell === PACMAN && gPacman.isSuper) {
        var ghost = getGhostByLocation(nextLocation)
        renderCell(nextLocation, gPacman.img)
        gGhosts.splice(gGhosts.indexOf(ghost), 1)
        return
    }
    // moving from current location:
    // update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, getRenderedItemOf(ghost.currCellContent))
    
    // Move the ghost to new location:
    // update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    
    // update the DOM
    renderCell(ghost.location, getGhostImgHTML(ghost))

    // if(moveDiff.j === 1) changeGhostDirection(ghost, 'right')
    // else if(moveDiff.j === -1) changeGhostDirection(ghost, 'left')
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostByLocation(location) {

    var ghost = null

    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if(location.i === currGhost.location.i && location.j === currGhost.location.j) {
            ghost = currGhost
        }
    }
    return ghost
}

// function getGhostHTML(ghost) {
//     return `<span>${GHOST}</span>`
// }

function getGhostImgHTML(ghost) {
    return `<img class="${ghost.id}" src="img/ghost_${ghost.color}.png"></img>`
}

function getRenderedItemOf(cell) {
    switch(cell) {
        case FOOD: return getDivHTML('food') 
        case POWER_FOOD: return getDivHTML('power-food')
        case WALL: return getDivHTML('wall')
        case PACMAN: return getPacmanImgHTML('left')
        case GHOST: return getGhostImgHTML(gGhosts[0])
        case CHERRY: return CHERRY
        default: return EMPTY
    }
}

// function changeGhostDirection(ghost, direction) {
//     const elGhostImg = document.querySelector(`.${ghost.id}`)
//     elGhostImg.style.transform = direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)'
// }