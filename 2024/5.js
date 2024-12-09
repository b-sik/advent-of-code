const fs = require('node:fs');
const readline = require('node:readline');

async function question1() {
    const fileStream = fs.createReadStream('5.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let instructions = [];
    let updates = [];

    for await (const line of rl) {
        if (line.includes('|')) {
            instructions.push(line.split('|'));
        } else if (line.includes(',')) {
            updates.push(line.split(','));
        }
    }

    const correctInstructions = updates.filter(
        (update) =>
            update
                .map((num, _, arr) =>
                    instructions.filter(
                        (instruction) =>
                            num === instruction[0] &&
                            arr.includes(instruction[1])
                    )
                )
                .flatMap((instructions) =>
                    instructions.map(
                        (instruction) =>
                            update.indexOf(instruction[0]) <
                            update.indexOf(instruction[1])
                    )
                )
                .filter((result) => result === false).length === 0
    );

    const totalMiddle = correctInstructions.reduce(
        (acc, curr, i) => acc + Number(curr[Math.floor(curr.length / 2)]),
        0
    );

    console.log(totalMiddle)
}

question1();
