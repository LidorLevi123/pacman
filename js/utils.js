'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomIntExclusive(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getColor(idx) {
    // var letters = '0123456789ABCDEF'.split('')
    // var color = '#'
    // for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)]
    // }
    // return color

    const colors = ['blue', 'green', 'red', 'yellow']
    return colors[idx]
}

function getAllEmptyLocations(board) {

    var locations = []

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {
            
            if(board[i][j] === EMPTY) locations.push({i, j})
        }
    }

    return locations
}
