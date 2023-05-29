'use strict'

const PACMAN = '😀'

var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false,
        img: null
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gTotalFood--
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    } else if (nextCell === GHOST && gPacman.isSuper) {
        var ghost = getGhostByLocation(nextLocation)

        gBoard[nextLocation.i][nextLocation.j] = EMPTY
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

        renderCell(gPacman.location, EMPTY)
        gPacman.location = nextLocation
        renderCell(gPacman.location, gPacman.img)

        if (ghost.currCellContent === FOOD) updateScore(1)

        gGhosts.splice(gGhosts.indexOf(ghost), 1)
        return

    }

    if (nextCell === FOOD) {
        gTotalFood--
        updateScore(1)
    } else if(nextCell === CHERRY) {
        updateScore(10)
    } else if (nextCell === POWER_FOOD && !gPacman.isSuper) {
        initSuperMode()
    }
    

    // const itemToPut = (gPacman.isSuper && nextCell === POWER_FOOD) ? POWER_FOOD : EMPTY
    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, gPacman.img)
}

function initSuperMode() {
    gPacman.isSuper = true

    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = 'gray'
    }

    clearTimeout(gGhostTimeoutID)
    gGhostTimeoutID = setTimeout(() => {
        gPacman.isSuper = false

        if (gGhosts.length === 0) {
            createGhosts(gBoard)
        } else {
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color = gGhosts[i].orgColor
            }
        }
    }, 5000)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code:', eventKeyboard.code)

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacman.img = getPacmanImgHTML('up')
            nextLocation.i--
            break
        case 'ArrowDown':
            gPacman.img = getPacmanImgHTML('down')
            nextLocation.i++
            break
        case 'ArrowRight':
            gPacman.img = getPacmanImgHTML('right')
            nextLocation.j++
            break
        case 'ArrowLeft':
            gPacman.img = getPacmanImgHTML('left')
            nextLocation.j--
            break
        default: return null
    }

    return nextLocation
}

function getPacmanImgHTML(direction) {
    return `<img src="img/pac_${direction}.png"></img>`
}