const fs = require('node:fs');
const readline = require('node:readline');

async function horizontal() {
    const fileStream = fs.createReadStream('4.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let total = 0;

    for await (const line of rl) {
        total += (line.match(/XMAS/g) || []).length;
        total += (line.match(/SAMX/g) || []).length;
    }

    return total;
}

async function vertical() {
    const fileStream = fs.createReadStream('4.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let verticalLines = {};

    for await (const line of rl) {
        [...line].forEach((letter, i) => {
            if (typeof verticalLines[i] === 'undefined') {
                verticalLines[i] = letter;
            } else {
                verticalLines[i] += letter;
            }
        });
    }

    return Object.values(verticalLines).reduce((acc, line) => {
        let total = (line.match(/XMAS/g) || []).length;
        total += (line.match(/SAMX/g) || []).length;
        return acc + total;
    }, 0);
}

async function diagonal() {
    const fileStream = fs.createReadStream('4.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let horizontalLines = {};

    let lineCount = 0;
    for await (const line of rl) {
        horizontalLines[lineCount] = line;
        lineCount++;
    }

    let totalFound = 0;

    Object.values(horizontalLines).forEach((line, i, arr) => {
        [...line].forEach((letter, j) => {
            if (letter === 'X') {
                if (
                    arr?.[i + 1]?.[j + 1] === 'M' &&
                    arr?.[i + 2]?.[j + 2] === 'A' &&
                    arr?.[i + 3]?.[j + 3] === 'S'
                ) {
                    totalFound++;
                }

                if (
                    arr?.[i + 1]?.[j - 1] === 'M' &&
                    arr?.[i + 2]?.[j - 2] === 'A' &&
                    arr?.[i + 3]?.[j - 3] === 'S'
                ) {
                    totalFound++;
                }
            }

            if (letter === 'S') {
                if (
                    arr?.[i + 1]?.[j + 1] === 'A' &&
                    arr?.[i + 2]?.[j + 2] === 'M' &&
                    arr?.[i + 3]?.[j + 3] === 'X'
                ) {
                    totalFound++;
                }

                if (
                    arr?.[i + 1]?.[j - 1] === 'A' &&
                    arr?.[i + 2]?.[j - 2] === 'M' &&
                    arr?.[i + 3]?.[j - 3] === 'X'
                ) {
                    totalFound++;
                }
            }
        });
    });

    return totalFound;
}

async function question1() {
    const horizontalTotal = await horizontal();
    const verticalTotal = await vertical();
    const diagonalTotal = await diagonal();

    console.log(horizontalTotal + verticalTotal + diagonalTotal);
}

async function question2() {
    const fileStream = fs.createReadStream('4.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let horizontalLines = {};

    let lineCount = 0;
    for await (const line of rl) {
        horizontalLines[lineCount] = line;
        lineCount++;
    }

    let totalFound = 0;

    Object.values(horizontalLines).forEach((line, i, arr) => {
        [...line].forEach((letter, j) => {
            if (letter === 'A') {
                if (
                    arr?.[i - 1]?.[j - 1] === 'M' &&
                    arr?.[i - 1]?.[j + 1] === 'M' &&
                    arr?.[i + 1]?.[j - 1] === 'S' &&
                    arr?.[i + 1]?.[j + 1] === 'S'
                ) {
                    totalFound++;
                } else if (
                    arr?.[i - 1]?.[j - 1] === 'S' &&
                    arr?.[i - 1]?.[j + 1] === 'S' &&
                    arr?.[i + 1]?.[j - 1] === 'M' &&
                    arr?.[i + 1]?.[j + 1] === 'M'
                ) {
                    totalFound++;
                } else if (
                    arr?.[i - 1]?.[j - 1] === 'M' &&
                    arr?.[i - 1]?.[j + 1] === 'S' &&
                    arr?.[i + 1]?.[j - 1] === 'M' &&
                    arr?.[i + 1]?.[j + 1] === 'S'
                ) {
                    totalFound++;
                } else if (
                    arr?.[i - 1]?.[j - 1] === 'S' &&
                    arr?.[i - 1]?.[j + 1] === 'M' &&
                    arr?.[i + 1]?.[j - 1] === 'S' &&
                    arr?.[i + 1]?.[j + 1] === 'M'
                ) {
                    totalFound++;
                }
            }
        });
    });

    console.log(totalFound);
}

question1();
question2();
