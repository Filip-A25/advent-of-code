"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
var numOfSafeReports = 0;
function isSafe(report) {
    var increasing = report[0] < report[1] ? true : false;
    var isSafeReport = true;
    for (var i = 0; i < report.length - 1; i++) {
        var absoluteDiff = Math.abs(report[i] - report[i + 1]);
        var isSafeDiff = absoluteDiff >= 1 && absoluteDiff <= 3;
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
reportsList.forEach(function (report) {
    if (isSafe(report))
        return numOfSafeReports++;
    for (var i = 0; i < report.length; i++) {
        var filteredReport = __spreadArray([], report, true);
        filteredReport.splice(i, 1);
        if (isSafe(filteredReport)) {
            numOfSafeReports++;
            break;
        }
    }
});
console.log(numOfSafeReports);
