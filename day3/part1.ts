import * as fs from "fs";

const text = fs.readFileSync("input.txt", "utf-8");

let total = 0;

let memoryText = text;
let strIndex = 0;
const mulPairs: string[] = [];

function splitText(firstIndex: number, secondIndex: number, lastIndex: number) {
  memoryText =
    memoryText.slice(firstIndex, secondIndex) + memoryText.slice(lastIndex);
}

while (strIndex !== -1) {
  strIndex = memoryText.indexOf("mul(");
  let charsArr = memoryText.split("");

  let i = strIndex + 4;

  if (isNaN(Number(charsArr[i]))) {
    splitText(0, strIndex, strIndex + 4);
    break;
  }

  let numOfCommas = 0;

  while (true) {
    if (charsArr[i] === ",") {
      if (numOfCommas > 0) {
        splitText(0, strIndex, strIndex + 4);
        break;
      }
      numOfCommas++;
    }

    if (
      charsArr[i] === ")" &&
      !Number.isNaN(charsArr[i - 1]) &&
      numOfCommas === 1
    ) {
      const mulStr = charsArr.slice(strIndex, i + 1).join("");

      mulPairs.push(mulStr);
      splitText(0, strIndex, i);
      break;
    }

    if (isNaN(Number(charsArr[i])) && charsArr[i] !== ",") {
      splitText(0, strIndex, i);
      break;
    }

    i++;
  }
}

for (let i = 0; i < mulPairs.length; i++) {
  const firstNumObj: RegExpMatchArray = mulPairs[i].match(/\d+/)!;
  const rest = mulPairs[i].slice(firstNumObj.index! + firstNumObj[0].length);

  const firstNum = parseInt(firstNumObj![0]);
  const secondNum = parseInt(rest.match(/\d+/)![0]);

  total += firstNum * secondNum;
}

console.log(total);
