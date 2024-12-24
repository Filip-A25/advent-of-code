import * as fs from "fs";

let text = fs.readFileSync("input.txt", "utf-8");
let strIndex = 0;
const mulPairs: string[] = [];
let total = 0;
let enabled = true;

while (strIndex !== -1) {
  strIndex = text.indexOf("mul(");
  const rest = text.slice(0, strIndex);

  const doIndex = rest.includes("do()") && rest.lastIndexOf("do()");
  const dontIndex = rest.includes("don't()") && rest.lastIndexOf("don't()");

  if (Boolean(doIndex)) enabled = true;

  if (Boolean(dontIndex)) {
    if (enabled) {
      enabled = dontIndex > doIndex || !Boolean(doIndex) ? false : true;
    }
  }

  if (!enabled) {
    text = text.slice(strIndex + 4);
    continue;
  }

  let charsArr = text.split("");
  let i = strIndex + 4;

  if (isNaN(Number(charsArr[i]))) {
    text = text.slice(i);
    continue;
  }

  let numOfCommas = 0;

  while (true) {
    if (charsArr[i] === ",") {
      numOfCommas++;
    }

    if (
      (isNaN(Number(charsArr[i])) &&
        charsArr[i] !== "," &&
        charsArr[i] !== ")") ||
      numOfCommas > 1
    ) {
      text = text.slice(i);
      break;
    }

    if (
      charsArr[i] === ")" &&
      !Number.isNaN(charsArr[i - 1]) &&
      numOfCommas === 1
    ) {
      const mulStr = charsArr.slice(strIndex, i + 1).join("");

      mulPairs.push(mulStr);
      text = text.slice(i);
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
