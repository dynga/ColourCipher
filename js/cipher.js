const epsilon = 10;

// const cipher = [
//     ['a', ['#FFBF00']],
//     ['b', ['#000000', '#AF6E4D']],
//     ['c', ['#00FFFF']],
//     ['d', ['#1560BD', '#C19A6B']],
//     ['e', ['#50C878']],
//     ['f', ['#FF00FF']],
//     ['g', ['#808080']],
//     ['h', ['#3FFF00']],
//     ['i', ['#4B0082', '#F4F0EC']],
//     ['j', ['#F8DE7E']],
//     ['k', ['#C3B091']],
//     ['l', ['#C8A2C8', '#B57EDC']],
//     ['m', ['#C32148']],
//     ['n', ['#727472']],
//     ['o', ['#FF7F00', '#CC7722']],
//     ['p', ['#FFC0CB', '#DF00FF']],
//     ['q', ['#8E3A59']],
//     ['r', ['#FF0000']],
//     ['s', ['#87CEEB']],
//     ['t', ['#40E0D0', '#008080']],
//     ['u', ['#3F00FF']],
//     ['v', ['#8601AF', '#CEFF00']],
//     ['w', ['#FFFFFF']],
//     ['x', ['#EEED09']],
//     ['y', ['#FFF700']],
//     ['z', ['#39A78E']]
// ]

function cipher(letter) {
    switch(letter) {
        case 'a':
            return ['#FFBF00'];
        case 'b':
            return ['#000000', '#AF6E4D'];
        case 'c':
            return ['#00FFFF'];
        case 'd':
            return ['#1560BD', '#C19A6B'];
        case 'e':
            return ['#50C878'];
        case 'f':
            return ['#FF00FF'];
        case 'g':
            return ['#808080'];
        case 'h':
            return ['#3FFF00'];
        case 'i':
            return ['#4B0082', '#F4F0EC'];
        case 'j':
            return ['#F8DE7E'];
        case 'k':
            return ['#C3B091'];
        case 'l':
            return ['#C8A2C8', '#B57EDC'];
        case 'm':
            return ['#C32148'];
        case 'n':
            return ['#727472'];
        case 'o':
            return ['#FF7F00', '#CC7722'];
        case 'p':
            return ['#FFC0CB', '#DF00FF'];
        case 'q':
            return ['#8E3A59'];
        case 'r':
            return ['#FF0000'];
        case 's':
            return ['#87CEEB'];
        case 't':
            return ['#40E0D0', '#008080'];
        case 'u':
            return ['#3F00FF'];
        case 'v':
            return ['#8601AF', '#CEFF00'];
        case 'w':
            return ['#FFFFFF'];
        case 'x':
            return ['#EEED09'];
        case 'y':
            return ['#FFF700'];
        case 'z':
            return ['#39A78E'];
        case ' ':
            return [''];
    }
}
function encode() {
    let source = document.getElementById('source');
    let target = document.getElementById('target');
    let text = source.value;
    let result = '';
    for (let i = 0; i < text.length; i += 1) {
        result = result.concat(prepareHexCode(cipher(text[i].toLowerCase())), ' ');
    }
    target.value = result;
}

let fresh = true;
function clearOnce() {
    let source = document.getElementById('source');
    if (fresh) {
        source.value = '';
        source.style.color = 'black';
        fresh = false;
    }
}
function resetIfBlank() {
    let source = document.getElementById('source');
    let target = document.getElementById('target');
    if (source.value === '') {
        source.style.color = 'grey';
        source.value = 'Input text to encode here';
        target.style.color = 'grey';
        target.value = 'Encoded text will appear here';
        // copyButton.style.display = "none";
        fresh = true;
    }
}

function prepareHexCode(hexArray) {
    let picked = pickRandomFromArray(hexArray);
    switch(picked) {
        //Space. Just leave it alone.
        case '':
            return '';
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
    switch (Math.floor(rando() * 2)) {
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
    let num = Math.floor(rando() * epsilon)
    return num * coeff;
}

function pickRandomFromArray(array) {
    // return array[Math.floor(Math.random() * array.length)];
    return array[Math.floor(rando() * array.length)];
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
    decArr[0] = ensureRgbRange(decArr[0] + randNumWithinEpsilon(epsilon, limit));
    decArr[1] = ensureRgbRange(decArr[1] + randNumWithinEpsilon(epsilon, limit));
    decArr[2] = ensureRgbRange(decArr[2] + randNumWithinEpsilon(epsilon, limit));
    return decArr;
}

function ensureRgbRange(value) {
    let result = Math.abs(value);
    if (result > 255) {
        return 255;
    } else {
        return result;
    }
}