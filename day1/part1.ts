import * as fs from "fs";

const text = fs.readFileSync("input.txt", "utf-8");
const lines = text.split("\n");

const firstList: number[] = [];
const secondList: number[] = [];

lines.forEach((line: string) => {
  const numbers = line.split("   ");

  firstList.push(parseInt(numbers[0]));
  secondList.push(parseInt(numbers[1]));
});

firstList.sort((a, b) => a - b);
secondList.sort((a, b) => a - b);

let totalDistance = 0;

for (let i = 0; i < firstList.length; i++) {
  totalDistance +=
    firstList[i] > secondList[i]
      ? firstList[i] - secondList[i]
      : secondList[i] - firstList[i];
}

console.log(totalDistance);
