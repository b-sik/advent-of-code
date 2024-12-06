const fs = require("node:fs");
const readline = require("node:readline");

async function processLineByLine() {
    const fileStream = fs.createReadStream("1.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let allLeft = [];
    let allRight = [];

    for await (const line of rl) {
        const lines = line.split(/\s\s+/g);
        const left = lines[0];
        const right = lines[1];

        allLeft.push(left);
        allRight.push(right);
    }

    allLeft.sort();
    allRight.sort();

    const totalDistance = allLeft.reduce(
        (prev, current, i) => Math.abs(current - allRight[i]) + prev,
        0
    );

    console.log(`Total distance: ${totalDistance}`);

    const totalSimiliarity = allLeft.reduce((prev, current) => {
        const duplicates = allRight
            .map((val) => val === current)
            .filter((val) => val === true);
        return duplicates.length * current + prev;
    }, 0);

    console.log(`Total similarity: ${totalSimiliarity}`);
}

processLineByLine();
