import * as fs from "fs";

const text = fs.readFileSync("input.txt", "utf-8");
const lines = text.split("\n");

const firstList: number[] = [];
const secondList: number[] = [];

let checkedNums: number[] = [];
let similarityScore = 0;

lines.forEach((line) => {
  const numbers = line.split("   ");

  firstList.push(parseInt(numbers[0]));
  secondList.push(parseInt(numbers[1]));
});

for (let i = 0; i < firstList.length; i++) {
  if (checkedNums.includes(firstList[i])) break;

  let numOfSameInts = 0;
  for (let j = 0; j < secondList.length; j++) {
    if (firstList[i] === secondList[j]) numOfSameInts++;
  }

  checkedNums.push(firstList[i]);
  similarityScore += firstList[i] * numOfSameInts;
}

console.log(similarityScore);
