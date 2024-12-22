"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var lines = text.split("\n");
var firstList = [];
var secondList = [];
var checkedNums = [];
var similarityScore = 0;
lines.forEach(function (line) {
    var numbers = line.split("   ");
    firstList.push(parseInt(numbers[0]));
    secondList.push(parseInt(numbers[1]));
});
for (var i = 0; i < firstList.length; i++) {
    if (checkedNums.includes(firstList[i]))
        break;
    var numOfSameInts = 0;
    for (var j = 0; j < secondList.length; j++) {
        if (firstList[i] === secondList[j])
            numOfSameInts++;
    }
    checkedNums.push(firstList[i]);
    similarityScore += firstList[i] * numOfSameInts;
}
console.log(similarityScore);
