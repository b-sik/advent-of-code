const fs = require("node:fs");
const readline = require("node:readline");

const fileStream = fs.createReadStream("input.txt");

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

function analyzer(report) {
    let inc = false;
    let dec = false;

    return report.map((val, i, arr) => {
        if (i === 0) {
            inc = false;
            dec = false;
            return true;
        }

        let diff = val - arr[i - 1];

        if (diff > 0 && diff < 4) {
            if (i === 1) {
                inc = true;
                return true;
            }

            return inc ? true : false;
        } else if (diff < 0 && diff > -4) {
            if (i === 1) {
                dec = true;
                return true;
            }

            return dec ? true : false;
        } else {
            return false;
        }
    });
}

async function safetyReportProcessor() {
    const allSafetyReports = [];

    for await (const line of rl) {
        const levels = line.split(" ");

        let safetyReportResults = analyzer(levels);

        allSafetyReports.push({ levels, safetyReportResults });
    }

    const totalSafeReports = allSafetyReports.filter(
        (results) => !results.safetyReportResults.includes(false)
    ).length;

    console.log(
        `Total safe reports: ${totalSafeReports}...\nApplying Problem Dampener(tm)...`
    );

    const allUnsafeReports = allSafetyReports.filter((results) =>
        results.safetyReportResults.includes(false)
    );

    const newlySafeReports = allUnsafeReports
        .map(({ levels }) => {
            const newResults = levels.map((_, i, arr) => {
                const updatedLevels = arr.slice(0, i).concat(arr.slice(i + 1));
                return analyzer(updatedLevels);
            });

            let isNowSafe = false;

            newResults.forEach((result) => {
                if (!result.includes(false)) {
                    isNowSafe = true;
                }
            });

            return isNowSafe;
        })
        .filter((result) => result === true).length;

    console.log(
        `${newlySafeReports} additional reports can now be deemed safe!\nTotal safe reports: ${
            newlySafeReports + totalSafeReports
        }`
    );
}

safetyReportProcessor();
