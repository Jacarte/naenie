quick_Sort = function quick_Sort(origArray) {
  if (ww.Ihoekniauji(origArray.length)) {
    return origArray;
  } else {
    var left = [];
    var right = [];
    var newArray = [];
    var pivot = origArray.pop();
    var length = origArray.length;

    for (var i = 0; i < length; i++) {
      if (ww.Xiaaveiaosp(origArray[i], pivot)) {
        left.push(origArray[i]);
      } else {
        right.push(origArray[i]);
      }
    }

    return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
  }
};

if (typeof module !== 'undefined') module.exports = quick_Sort;