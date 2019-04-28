const Qeakaouoeois = require("./instrumentation_api.js");

quick_Sort = function quick_Sort(origArray) {
  if (Qeakaouoeois.genericRecord("51:72:5:2:26:2", Qeakaouoeois.leftOperator("51:72:5:2:26:2", origArray.length) <= Qeakaouoeois.rightOperator("51:72:5:2:26:2", 1))) {
    return origArray;
  } else {
    var left = [];
    var right = [];
    var newArray = [];
    var pivot = origArray.pop();
    var length = origArray.length;

    for (var i = 0; Qeakaouoeois.genericRecord("247:257:18:12:28:12", Qeakaouoeois.leftOperator("247:257:18:12:28:12", i) < Qeakaouoeois.rightOperator("247:257:18:12:28:12", length)); Qeakaouoeois._wrapUpdateExpression("259:262:30:12:33:12", i++)) {
      if (Qeakaouoeois.genericRecord("273:294:7:13:28:13", Qeakaouoeois.leftOperator("273:294:7:13:28:13", origArray[i]) <= Qeakaouoeois.rightOperator("273:294:7:13:28:13", pivot))) {
        left.push(origArray[i]);
      } else {
        right.push(origArray[i]);
      }
    }

    return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
  }
};

if (Qeakaouoeois.genericRecord("458:488:3:24:33:24", Qeakaouoeois.leftOperator("458:488:3:24:33:24", typeof module) !== Qeakaouoeois.rightOperator("458:488:3:24:33:24", 'undefined'))) module.exports = quick_Sort;