import * as fs from "fs";

const text = fs.readFileSync("input.txt", "utf-8");
const lines = text.split("\n");

const reportsList: number[][] = [];

lines.forEach((line) => {
  const report: number[] = [];
  const levels = line.split(" ");

  levels.forEach((level) => report.push(parseInt(level)));
  reportsList.push(report);
});

let numOfSafeReports = 0;

function isSafe(report: number[]) {
  let increasing = report[0] < report[1] ? true : false;
  let isSafeReport = true;

  for (let i = 0; i < report.length - 1; i++) {
    const absoluteDiff = Math.abs(report[i] - report[i + 1]);
    const isSafeDiff = absoluteDiff >= 1 && absoluteDiff <= 3;

    if (!isSafeDiff) {
      isSafeReport = false;
      break;
    }

    if (increasing && report[i] > report[i + 1]) {
      isSafeReport = false;
      break;
    }
    if (!increasing && report[i] < report[i + 1]) {
      isSafeReport = false;
      break;
    }

    isSafeReport = true;
  }

  return isSafeReport;
}

reportsList.forEach((report) => {
  if (isSafe(report)) return numOfSafeReports++;

  for (let i = 0; i < report.length; i++) {
    const filteredReport = [...report];
    filteredReport.splice(i, 1);

    if (isSafe(filteredReport)) {
      numOfSafeReports++;
      break;
    }
  }
});

console.log(numOfSafeReports);
