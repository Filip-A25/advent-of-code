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

let increasing: boolean;
let numOfSafeReports = 0;

reportsList.forEach((list) => {
  increasing = list[0] < list[1] ? true : false;
  let isSafeReport = true;

  for (let i = 0; i < list.length - 1; i++) {
    const absoluteDiff = Math.abs(list[i] - list[i + 1]);
    const isSafeDiff = absoluteDiff >= 1 && absoluteDiff <= 3;

    if (isSafeDiff) {
      if (increasing && list[i] > list[i + 1]) return (isSafeReport = false);
      if (!increasing && list[i] < list[i + 1]) return (isSafeReport = false);
    } else return;
  }

  isSafeReport && numOfSafeReports++;
});

console.log(numOfSafeReports);
