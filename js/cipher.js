const epsilon = 10;

const source = document.getElementById('source');
const target = document.getElementById('target');

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

function encode() {
    let text = source.value;
    for (let i = 0; i < cipher.length; i++) {
        text = text.replaceAll(cipher[i][0], prepareHexCode(cipher[i][1]) + ' ')
    }
    target.value = text;
}

let fresh = true;
function clearOnce() {
    if (fresh) {
        source.value = '';
        source.style.color = 'black';
        fresh = false;
    }
}
function resetIfBlank() {
    if (source.value === '') {
        source.style.color = 'grey';
        source.value = 'aeiouy';
        target.style.color = 'grey';
        target.value = 'aeioue';
        // copyButton.style.display = "none";
        // fresh = true;
    }
}

function prepareHexCode(hexArray) {
    let picked = pickRandomFromArray(hexArray);
    switch(picked) {
        //Those hex codes need to be exact. Do not randomize.
        case '#FFFFFF':
        case '#EEED09':
        case '#FFF700':
            return randomizeHexCode(picked, 0);
        //Those hex codes can only be randomized to be darker than the original.
        case '#727472':
            return randomizeHexCode(picked, -1);
        //Those hex codes can only be randomized to be lighter than the original.
        case '#808080':
            return randomizeHexCode(picked, 1);
        //All other hex codes. Randomize within epsilon.
        default:
            return randomizeHexCode(picked, randPosOrNeg());
    }
}

function randPosOrNeg() {
    switch (Math.floor(Math.random() * 2)) {
        case 0:
            return -1;
        case 1:
            return 1;
    }
}

function randomizeHexCode(hexCode, coeff) {
    return decArrToHex(randomizeDecArr(hexToDecArr(hexCode), coeff));
}

function randNumWithinEpsilon(epsilon, coeff) {
    let num = Math.floor(Math.random() * epsilon)
    return num * coeff;
}

function pickRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function hexToDecArr(hex) {
    let r = parseInt(hex.slice(1,3), 16);
    let g = parseInt(hex.slice(3,5), 16);
    let b = parseInt(hex.slice(5), 16);
    return [r, g, b];
}

function decArrToHex(decArr) {
    for (let i = 0; i < decArr.length; i++) {
        decArr[i] = decArr[i].toString(16).toUpperCase().padStart(2, '0');
    }
    return '#'.concat(decArr[0], decArr[1], decArr[2]);
}

/**
 * Randomizes each value in the array of color values.
 * @param decArr Array to be randomized.
 * @param limit Whether or not to limit the epsilon in any way.
 *  -1 makes the result value be only less or equal than source value.
 *   1 makes it only higher or equal.
 *   0 turns off randomization.
 * @returns {*}
 */
function randomizeDecArr(decArr, limit) {
    decArr[0] = Math.abs(decArr[0] + randNumWithinEpsilon(epsilon, limit));
    decArr[1] = Math.abs(decArr[1] + randNumWithinEpsilon(epsilon, limit));
    decArr[2] = Math.abs(decArr[2] + randNumWithinEpsilon(epsilon, limit));
    return decArr;
}