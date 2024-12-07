const fs = require('node:fs');

async function question1() {
    fs.readFile('3.txt', (err, data) => {
        const memory = data.toString().replaceAll(/\n/g, '').trimEnd();

        const numsToMul = memory
            .match(/mul\(\d+,\d+\)/g)
            .map((match) => match.match(/\d+/g));

        const total = numsToMul.reduce(
            (prev, current) => prev + current[0] * current[1],
            0
        );
        console.log(total);
    });
}

async function question2() {
    fs.readFile('3.txt', (err, data) => {
        const memory = data.toString().replaceAll(/\n/g, '').trimEnd();
        const conditionalMem = memory.replaceAll(/don't\(\)(.*?)do\(\)/g, '');

        const numsToMul = conditionalMem
            .match(/mul\(\d+,\d+\)/g)
            .map((match) => match.match(/\d+/g));

        const total = numsToMul.reduce(
            (prev, current) => prev + current[0] * current[1],
            0
        );
        console.log(total);
    });
}

question1();
question2();
