"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var lines = text.split("\n");
var reportsList = [];
lines.forEach(function (line) {
    var report = [];
    var levels = line.split(" ");
    levels.forEach(function (level) { return report.push(parseInt(level)); });
    reportsList.push(report);
});
var increasing;
var numOfSafeReports = 0;
reportsList.forEach(function (list) {
    increasing = list[0] < list[1] ? true : false;
    var isSafeReport = true;
    for (var i = 0; i < list.length - 1; i++) {
        var absoluteDiff = Math.abs(list[i] - list[i + 1]);
        var isSafeDiff = absoluteDiff >= 1 && absoluteDiff <= 3;
        if (isSafeDiff) {
            if (increasing && list[i] > list[i + 1])
                return (isSafeReport = false);
            if (!increasing && list[i] < list[i + 1])
                return (isSafeReport = false);
        }
        else
            return;
    }
    isSafeReport && numOfSafeReports++;
});
console.log(numOfSafeReports);
