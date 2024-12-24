"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var strIndex = 0;
var mulPairs = [];
var total = 0;
var enabled = true;
while (strIndex !== -1) {
    strIndex = text.indexOf("mul(");
    var rest = text.slice(0, strIndex);
    var doIndex = rest.includes("do()") && rest.lastIndexOf("do()");
    var dontIndex = rest.includes("don't()") && rest.lastIndexOf("don't()");
    if (Boolean(doIndex))
        enabled = true;
    if (Boolean(dontIndex)) {
        if (enabled) {
            enabled = dontIndex > doIndex || !Boolean(doIndex) ? false : true;
        }
    }
    if (!enabled) {
        text = text.slice(strIndex + 4);
        continue;
    }
    var charsArr = text.split("");
    var i = strIndex + 4;
    if (isNaN(Number(charsArr[i]))) {
        text = text.slice(i);
        continue;
    }
    var numOfCommas = 0;
    while (true) {
        if (charsArr[i] === ",") {
            numOfCommas++;
        }
        if ((isNaN(Number(charsArr[i])) &&
            charsArr[i] !== "," &&
            charsArr[i] !== ")") ||
            numOfCommas > 1) {
            text = text.slice(i);
            break;
        }
        if (charsArr[i] === ")" &&
            !Number.isNaN(charsArr[i - 1]) &&
            numOfCommas === 1) {
            var mulStr = charsArr.slice(strIndex, i + 1).join("");
            mulPairs.push(mulStr);
            text = text.slice(i);
            break;
        }
        i++;
    }
}
for (var i = 0; i < mulPairs.length; i++) {
    var firstNumObj = mulPairs[i].match(/\d+/);
    var rest = mulPairs[i].slice(firstNumObj.index + firstNumObj[0].length);
    var firstNum = parseInt(firstNumObj[0]);
    var secondNum = parseInt(rest.match(/\d+/)[0]);
    total += firstNum * secondNum;
}
console.log(total);
