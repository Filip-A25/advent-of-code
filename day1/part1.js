"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var lines = text.split("\n");
var firstList = [];
var secondList = [];
lines.forEach(function (line) {
    var numbers = line.split("   ");
    firstList.push(parseInt(numbers[0]));
    secondList.push(parseInt(numbers[1]));
});
firstList.sort(function (a, b) { return a - b; });
secondList.sort(function (a, b) { return a - b; });
var totalDistance = 0;
for (var i = 0; i < firstList.length; i++) {
    totalDistance +=
        firstList[i] > secondList[i]
            ? firstList[i] - secondList[i]
            : secondList[i] - firstList[i];
}
console.log(totalDistance);
