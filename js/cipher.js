const epsilon = 10;

/**
 * 'random' - base case, pick a hex code from the array and randomize within given epsilon
 * 'exact' - single hex code, has to be exact, don't randomize
 * 'lowereq' - single hex code, final value has to be less or equal than the template
 * 'highereq' - single hex code, final value has to be higher or equal than the template
 * @type {string[]}
 */



const cipher = [
    ['a', ['#FFBF00']],
    ['b', ['#000000', '#AF6E4D']],
    ['c', ['#00FFFF']],
    ['d', ['#1560BD', '#C19A6B']],
    ['e', ['#50C878']],
    ['f', ['#FF00FF']],
    ['g', ['#808080']],
    ['h', ['#3FFF00']],
    ['i', ['#4B0082', '#F4F0EC']],
    ['j', ['#F8DE7E']],
    ['k', ['#C3B091']],
    ['l', ['#C8A2C8', '#B57EDC']],
    ['m', ['#C32148']],
    ['n', ['#727472']],
    ['o', ['#FF7F00', '#CC7722']],
    ['p', ['#FFC0CB', '#DF00FF']],
    ['q', ['#8E3A59']],
    ['r', ['#FF0000']],
    ['s', ['#87CEEB']],
    ['t', ['#40E0D0', '#008080']],
    ['u', ['#3F00FF']],
    ['v', ['#8601AF', '#CEFF00']],
    ['w', ['#FFFFFF']],
    ['x', ['#EEED09']],
    ['y', ['#FFF700']],
    ['z', ['#39A78E']]
]

const hexExact = ['#FFFFFF', '#EEED09', '#FFF700']
const hexDarkerThan = ['#727472']


function prepareHexCode( hexArray ) {
    switch( hexArray[0] ) {
        case 'random':
            return
    }
}

function randNumWithinEpsilon( epsilon ) {
    let rand = math.floor(math.random() * 2)
    let num = math.floor(math.random() * epsilon)
    if (rand > 1) {
        return num * -1;
    }
    else {
        return num;
    }
}

function hexToDecArr( hex ) {
    let r = parseInt(hex.slice(1,2), 16);
    let g = parseInt(hex.slice(3,4), 16);
    let b = parseInt(hex.slice(5,6), 16);
    return [r, g, b];
}

function decArrToHex ( decArr ) {
    return '#'.concat(decArr[0].toString(16), decArr[1].toString(16), decArr[2].toString(16));
}

function fuckYourShitUp( decArr ) { //todo: change the name for fuck's sake
    decArr[0] = decArr[0] + randNumWithinEpsilon( epsilon );
    decArr[1] = decArr[1] + randNumWithinEpsilon( epsilon );
    decArr[2] = decArr[2] + randNumWithinEpsilon( epsilon );
    return decArr;
}