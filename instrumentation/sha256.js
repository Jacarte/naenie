const Qeakaouoeois = require("./instrumentation_api.js");

const sha256 = function sha256(ascii) {
  function rightRotate(value, amount) {
    return Qeakaouoeois.genericRecord("88:129:9:3:50:3", Qeakaouoeois.leftOperator("88:129:9:3:50:3", Qeakaouoeois.genericRecord("89:103:10:3:24:3", Qeakaouoeois.leftOperator("89:103:10:3:24:3", value) >>> Qeakaouoeois.rightOperator("89:103:10:3:24:3", amount))) | Qeakaouoeois.rightOperator("88:129:9:3:50:3", Qeakaouoeois.genericRecord("108:128:29:3:49:3", Qeakaouoeois.leftOperator("108:128:29:3:49:3", value) << Qeakaouoeois.rightOperator("108:128:29:3:49:3", Qeakaouoeois.genericRecord("116:127:37:3:48:3", Qeakaouoeois.leftOperator("116:127:37:3:48:3", 32) - Qeakaouoeois.rightOperator("116:127:37:3:48:3", amount))))));
  }

  ;
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length';
  var i, j; // Used as a counter across the whole file

  var result = '';
  var words = [];
  var asciiBitLength = Qeakaouoeois.genericRecord("335:358:22:13:45:13", Qeakaouoeois.leftOperator("335:358:22:13:45:13", ascii[lengthProperty]) * Qeakaouoeois.rightOperator("335:358:22:13:45:13", 8)); //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)

  var hash = sha256.h = Qeakaouoeois.genericRecord("651:665:23:18:37:18", Qeakaouoeois.leftOperator("651:665:23:18:37:18", sha256.h) || Qeakaouoeois.rightOperator("651:665:23:18:37:18", [])); // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes

  var k = sha256.k = Qeakaouoeois.genericRecord("787:801:20:20:34:20", Qeakaouoeois.leftOperator("787:801:20:20:34:20", sha256.k) || Qeakaouoeois.rightOperator("787:801:20:20:34:20", []));
  var primeCounter = k[lengthProperty];
  /*/
  var hash = [], k = [];
  var primeCounter = 0;
  //*/

  var isComposite = {};

  for (var candidate = 2; Qeakaouoeois.genericRecord("949:966:25:28:42:28", Qeakaouoeois.leftOperator("949:966:25:28:42:28", primeCounter) < Qeakaouoeois.rightOperator("949:966:25:28:42:28", 64)); Qeakaouoeois._wrapUpdateExpression("968:979:44:28:55:28", candidate++)) {
    if (!isComposite[candidate]) {
      for (i = 0; Qeakaouoeois.genericRecord("1031:1038:15:30:22:30", Qeakaouoeois.leftOperator("1031:1038:15:30:22:30", i) < Qeakaouoeois.rightOperator("1031:1038:15:30:22:30", 313)); i += candidate) {
        isComposite[i] = candidate;
      }

      hash[primeCounter] = Qeakaouoeois.genericRecord("1119:1153:24:33:58:33", Qeakaouoeois.leftOperator("1119:1153:24:33:58:33", Qeakaouoeois.genericRecord("1120:1150:25:33:55:33", Qeakaouoeois.leftOperator("1120:1150:25:33:55:33", mathPow(candidate, .5)) * Qeakaouoeois.rightOperator("1120:1150:25:33:55:33", maxWord))) | Qeakaouoeois.rightOperator("1119:1153:24:33:58:33", 0));
      k[Qeakaouoeois._wrapUpdateExpression("1160:1174:5:34:19:34", primeCounter++)] = Qeakaouoeois.genericRecord("1178:1213:23:34:58:34", Qeakaouoeois.leftOperator("1178:1213:23:34:58:34", Qeakaouoeois.genericRecord("1179:1210:24:34:55:34", Qeakaouoeois.leftOperator("1179:1210:24:34:55:34", mathPow(candidate, Qeakaouoeois.genericRecord("1198:1201:43:34:46:34", Qeakaouoeois.leftOperator("1198:1201:43:34:46:34", 1) / Qeakaouoeois.rightOperator("1198:1201:43:34:46:34", 3)))) * Qeakaouoeois.rightOperator("1179:1210:24:34:55:34", maxWord))) | Qeakaouoeois.rightOperator("1178:1213:23:34:58:34", 0));
    }
  }

  ascii += '\x80'; // Append Ƈ' bit (plus zero padding)

  while (Qeakaouoeois.genericRecord("1286:1315:8:39:37:39", Qeakaouoeois.leftOperator("1286:1315:8:39:37:39", Qeakaouoeois.genericRecord("1286:1310:8:39:32:39", Qeakaouoeois.leftOperator("1286:1310:8:39:32:39", ascii[lengthProperty]) % Qeakaouoeois.rightOperator("1286:1310:8:39:32:39", 64))) - Qeakaouoeois.rightOperator("1286:1315:8:39:37:39", 56))) ascii += '\x00'; // More zero padding


  for (i = 0; Qeakaouoeois.genericRecord("1367:1392:13:40:38:40", Qeakaouoeois.leftOperator("1367:1392:13:40:38:40", i) < Qeakaouoeois.rightOperator("1367:1392:13:40:38:40", ascii[lengthProperty])); Qeakaouoeois._wrapUpdateExpression("1394:1397:40:40:43:40", i++)) {
    j = ascii.charCodeAt(i);
    if (Qeakaouoeois.genericRecord("1434:1438:6:42:10:42", Qeakaouoeois.leftOperator("1434:1438:6:42:10:42", j) >> Qeakaouoeois.rightOperator("1434:1438:6:42:10:42", 8))) return; // ASCII check: only accept characters in range 0-255

    words[Qeakaouoeois.genericRecord("1510:1514:8:43:12:43", Qeakaouoeois.leftOperator("1510:1514:8:43:12:43", i) >> Qeakaouoeois.rightOperator("1510:1514:8:43:12:43", 2))] |= Qeakaouoeois.genericRecord("1519:1537:17:43:35:43", Qeakaouoeois.leftOperator("1519:1537:17:43:35:43", j) << Qeakaouoeois.rightOperator("1519:1537:17:43:35:43", Qeakaouoeois.genericRecord("1524:1537:22:43:35:43", Qeakaouoeois.leftOperator("1524:1537:22:43:35:43", Qeakaouoeois.genericRecord("1525:1534:23:43:32:43", Qeakaouoeois.leftOperator("1525:1534:23:43:32:43", Qeakaouoeois.genericRecord("1526:1531:24:43:29:43", Qeakaouoeois.leftOperator("1526:1531:24:43:29:43", 3) - Qeakaouoeois.rightOperator("1526:1531:24:43:29:43", i))) % Qeakaouoeois.rightOperator("1525:1534:23:43:32:43", 4))) * Qeakaouoeois.rightOperator("1524:1537:22:43:35:43", 8))));
  }

  words[words[lengthProperty]] = Qeakaouoeois.genericRecord("1575:1601:33:45:59:45", Qeakaouoeois.leftOperator("1575:1601:33:45:59:45", Qeakaouoeois.genericRecord("1576:1598:34:45:56:45", Qeakaouoeois.leftOperator("1576:1598:34:45:56:45", asciiBitLength) / Qeakaouoeois.rightOperator("1576:1598:34:45:56:45", maxWord))) | Qeakaouoeois.rightOperator("1575:1601:33:45:59:45", 0));
  words[words[lengthProperty]] = asciiBitLength; // process each chunk

  for (j = 0; Qeakaouoeois.genericRecord("1691:1716:13:49:38:49", Qeakaouoeois.leftOperator("1691:1716:13:49:38:49", j) < Qeakaouoeois.rightOperator("1691:1716:13:49:38:49", words[lengthProperty]));) {
    var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration

    var oldHash = hash; // This is now the undefinedworking hash", often labelled as variables a...g
    // (we have to truncate as well, otherwise extra entries at the end accumulate

    hash = hash.slice(0, 8);

    for (i = 0; Qeakaouoeois.genericRecord("2048:2054:14:56:20:56", Qeakaouoeois.leftOperator("2048:2054:14:56:20:56", i) < Qeakaouoeois.rightOperator("2048:2054:14:56:20:56", 64)); Qeakaouoeois._wrapUpdateExpression("2056:2059:22:56:25:56", i++)) {
      var i2 = Qeakaouoeois.genericRecord("2075:2080:12:57:17:57", Qeakaouoeois.leftOperator("2075:2080:12:57:17:57", i) + Qeakaouoeois.rightOperator("2075:2080:12:57:17:57", j)); // Expand the message into 64 words
      // Used below if 

      var w15 = w[Qeakaouoeois.genericRecord("2157:2163:15:60:21:60", Qeakaouoeois.leftOperator("2157:2163:15:60:21:60", i) - Qeakaouoeois.rightOperator("2157:2163:15:60:21:60", 15))],
          w2 = w[Qeakaouoeois.genericRecord("2173:2178:31:60:36:60", Qeakaouoeois.leftOperator("2173:2178:31:60:36:60", i) - Qeakaouoeois.rightOperator("2173:2178:31:60:36:60", 2))]; // Iterate

      var a = hash[0],
          e = hash[4];
      var temp1 = Qeakaouoeois.genericRecord("2244:2645:15:64:5:75", Qeakaouoeois.leftOperator("2244:2645:15:64:5:75", Qeakaouoeois.genericRecord("2244:2377:15:64:10:67", Qeakaouoeois.leftOperator("2244:2377:15:64:10:67", Qeakaouoeois.genericRecord("2244:2360:15:64:34:66", Qeakaouoeois.leftOperator("2244:2360:15:64:34:66", Qeakaouoeois.genericRecord("2244:2319:15:64:67:65", Qeakaouoeois.leftOperator("2244:2319:15:64:67:65", hash[7]) + Qeakaouoeois.rightOperator("2244:2319:15:64:67:65", Qeakaouoeois.genericRecord("2259:2318:7:65:66:65", Qeakaouoeois.leftOperator("2259:2318:7:65:66:65", Qeakaouoeois.genericRecord("2259:2297:7:65:45:65", Qeakaouoeois.leftOperator("2259:2297:7:65:45:65", rightRotate(e, 6)) ^ Qeakaouoeois.rightOperator("2259:2297:7:65:45:65", rightRotate(e, 11)))) ^ Qeakaouoeois.rightOperator("2259:2318:7:65:66:65", rightRotate(e, 25)))))) + Qeakaouoeois.rightOperator("2244:2360:15:64:34:66", Qeakaouoeois.genericRecord("2333:2359:7:66:33:66", Qeakaouoeois.leftOperator("2333:2359:7:66:33:66", Qeakaouoeois.genericRecord("2334:2343:8:66:17:66", Qeakaouoeois.leftOperator("2334:2343:8:66:17:66", e) & Qeakaouoeois.rightOperator("2334:2343:8:66:17:66", hash[5]))) ^ Qeakaouoeois.rightOperator("2333:2359:7:66:33:66", Qeakaouoeois.genericRecord("2346:2358:20:66:32:66", Qeakaouoeois.leftOperator("2346:2358:20:66:32:66", ~e) & Qeakaouoeois.rightOperator("2346:2358:20:66:32:66", hash[6]))))))) + Qeakaouoeois.rightOperator("2244:2377:15:64:10:67", // ch
      k[i]))) + Qeakaouoeois.rightOperator("2244:2645:15:64:5:75", // Expand the message schedule if needed
      w[i] = Qeakaouoeois.genericRecord("2438:2444:15:69:21:69", Qeakaouoeois.leftOperator("2438:2444:15:69:21:69", i) < Qeakaouoeois.rightOperator("2438:2444:15:69:21:69", 16)) ? w[i] : Qeakaouoeois.genericRecord("2455:2639:32:69:8:74", Qeakaouoeois.leftOperator("2455:2639:32:69:8:74", Qeakaouoeois.genericRecord("2463:2624:6:70:63:73", Qeakaouoeois.leftOperator("2463:2624:6:70:63:73", Qeakaouoeois.genericRecord("2463:2560:6:70:16:72", Qeakaouoeois.leftOperator("2463:2560:6:70:16:72", Qeakaouoeois.genericRecord("2463:2537:6:70:64:71", Qeakaouoeois.leftOperator("2463:2537:6:70:64:71", w[Qeakaouoeois.genericRecord("2465:2471:8:70:14:70", Qeakaouoeois.leftOperator("2465:2471:8:70:14:70", i) - Qeakaouoeois.rightOperator("2465:2471:8:70:14:70", 16))]) + Qeakaouoeois.rightOperator("2463:2537:6:70:64:71", Qeakaouoeois.genericRecord("2482:2536:9:71:63:71", Qeakaouoeois.leftOperator("2482:2536:9:71:63:71", Qeakaouoeois.genericRecord("2482:2524:9:71:51:71", Qeakaouoeois.leftOperator("2482:2524:9:71:51:71", rightRotate(w15, 7)) ^ Qeakaouoeois.rightOperator("2482:2524:9:71:51:71", rightRotate(w15, 18)))) ^ Qeakaouoeois.rightOperator("2482:2536:9:71:63:71", Qeakaouoeois.genericRecord("2528:2535:55:71:62:71", Qeakaouoeois.leftOperator("2528:2535:55:71:62:71", w15) >>> Qeakaouoeois.rightOperator("2528:2535:55:71:62:71", 3))))))) + Qeakaouoeois.rightOperator("2463:2560:6:70:16:72", // s0
      w[Qeakaouoeois.genericRecord("2554:2559:10:72:15:72", Qeakaouoeois.leftOperator("2554:2559:10:72:15:72", i) - Qeakaouoeois.rightOperator("2554:2559:10:72:15:72", 7))]))) + Qeakaouoeois.rightOperator("2463:2624:6:70:63:73", Qeakaouoeois.genericRecord("2570:2623:9:73:62:73", Qeakaouoeois.leftOperator("2570:2623:9:73:62:73", Qeakaouoeois.genericRecord("2570:2611:9:73:50:73", Qeakaouoeois.leftOperator("2570:2611:9:73:50:73", rightRotate(w2, 17)) ^ Qeakaouoeois.rightOperator("2570:2611:9:73:50:73", rightRotate(w2, 19)))) ^ Qeakaouoeois.rightOperator("2570:2623:9:73:62:73", Qeakaouoeois.genericRecord("2615:2622:54:73:61:73", Qeakaouoeois.leftOperator("2615:2622:54:73:61:73", w2) >>> Qeakaouoeois.rightOperator("2615:2622:54:73:61:73", 10))))))) | Qeakaouoeois.rightOperator("2455:2639:32:69:8:74", // s1
      0)))); // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble

      var temp2 = Qeakaouoeois.genericRecord("2772:2889:15:77:49:78", Qeakaouoeois.leftOperator("2772:2889:15:77:49:78", Qeakaouoeois.genericRecord("2773:2832:16:77:75:77", Qeakaouoeois.leftOperator("2773:2832:16:77:75:77", Qeakaouoeois.genericRecord("2773:2811:16:77:54:77", Qeakaouoeois.leftOperator("2773:2811:16:77:54:77", rightRotate(a, 2)) ^ Qeakaouoeois.rightOperator("2773:2811:16:77:54:77", rightRotate(a, 13)))) ^ Qeakaouoeois.rightOperator("2773:2832:16:77:75:77", rightRotate(a, 22)))) + Qeakaouoeois.rightOperator("2772:2889:15:77:49:78", Qeakaouoeois.genericRecord("2847:2888:7:78:48:78", Qeakaouoeois.leftOperator("2847:2888:7:78:48:78", Qeakaouoeois.genericRecord("2847:2870:7:78:30:78", Qeakaouoeois.leftOperator("2847:2870:7:78:30:78", Qeakaouoeois.genericRecord("2848:2857:8:78:17:78", Qeakaouoeois.leftOperator("2848:2857:8:78:17:78", a) & Qeakaouoeois.rightOperator("2848:2857:8:78:17:78", hash[1]))) ^ Qeakaouoeois.rightOperator("2847:2870:7:78:30:78", Qeakaouoeois.genericRecord("2860:2869:20:78:29:78", Qeakaouoeois.leftOperator("2860:2869:20:78:29:78", a) & Qeakaouoeois.rightOperator("2860:2869:20:78:29:78", hash[2]))))) ^ Qeakaouoeois.rightOperator("2847:2888:7:78:48:78", Qeakaouoeois.genericRecord("2872:2887:32:78:47:78", Qeakaouoeois.leftOperator("2872:2887:32:78:47:78", hash[1]) & Qeakaouoeois.rightOperator("2872:2887:32:78:47:78", hash[2])))))); // maj

      hash = [Qeakaouoeois.genericRecord("2913:2930:11:80:28:80", Qeakaouoeois.leftOperator("2913:2930:11:80:28:80", Qeakaouoeois.genericRecord("2914:2927:12:80:25:80", Qeakaouoeois.leftOperator("2914:2927:12:80:25:80", temp1) + Qeakaouoeois.rightOperator("2914:2927:12:80:25:80", temp2))) | Qeakaouoeois.rightOperator("2913:2930:11:80:28:80", 0))].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()

      hash[4] = Qeakaouoeois.genericRecord("3075:3094:13:81:32:81", Qeakaouoeois.leftOperator("3075:3094:13:81:32:81", Qeakaouoeois.genericRecord("3076:3091:14:81:29:81", Qeakaouoeois.leftOperator("3076:3091:14:81:29:81", hash[4]) + Qeakaouoeois.rightOperator("3076:3091:14:81:29:81", temp1))) | Qeakaouoeois.rightOperator("3075:3094:13:81:32:81", 0));
    }

    for (i = 0; Qeakaouoeois.genericRecord("3117:3122:14:84:19:84", Qeakaouoeois.leftOperator("3117:3122:14:84:19:84", i) < Qeakaouoeois.rightOperator("3117:3122:14:84:19:84", 8)); Qeakaouoeois._wrapUpdateExpression("3124:3127:21:84:24:84", i++)) {
      hash[i] = Qeakaouoeois.genericRecord("3144:3168:13:85:37:85", Qeakaouoeois.leftOperator("3144:3168:13:85:37:85", Qeakaouoeois.genericRecord("3145:3165:14:85:34:85", Qeakaouoeois.leftOperator("3145:3165:14:85:34:85", hash[i]) + Qeakaouoeois.rightOperator("3145:3165:14:85:34:85", oldHash[i]))) | Qeakaouoeois.rightOperator("3144:3168:13:85:37:85", 0));
    }
  }

  for (i = 0; Qeakaouoeois.genericRecord("3192:3197:13:89:18:89", Qeakaouoeois.leftOperator("3192:3197:13:89:18:89", i) < Qeakaouoeois.rightOperator("3192:3197:13:89:18:89", 8)); Qeakaouoeois._wrapUpdateExpression("3199:3202:20:89:23:89", i++)) {
    for (j = 3; Qeakaouoeois.genericRecord("3220:3225:14:90:19:90", Qeakaouoeois.leftOperator("3220:3225:14:90:19:90", j) + Qeakaouoeois.rightOperator("3220:3225:14:90:19:90", 1)); Qeakaouoeois._wrapUpdateExpression("3227:3230:21:90:24:90", j--)) {
      var b = Qeakaouoeois.genericRecord("3245:3265:11:91:31:91", Qeakaouoeois.leftOperator("3245:3265:11:91:31:91", Qeakaouoeois.genericRecord("3246:3260:12:91:26:91", Qeakaouoeois.leftOperator("3246:3260:12:91:26:91", hash[i]) >> Qeakaouoeois.rightOperator("3246:3260:12:91:26:91", Qeakaouoeois.genericRecord("3256:3259:22:91:25:91", Qeakaouoeois.leftOperator("3256:3259:22:91:25:91", j) * Qeakaouoeois.rightOperator("3256:3259:22:91:25:91", 8))))) & Qeakaouoeois.rightOperator("3245:3265:11:91:31:91", 255));
      result += Qeakaouoeois.genericRecord("3280:3316:13:92:49:92", Qeakaouoeois.leftOperator("3280:3316:13:92:49:92", Qeakaouoeois.genericRecord("3282:3288:15:92:21:92", Qeakaouoeois.leftOperator("3282:3288:15:92:21:92", b) < Qeakaouoeois.rightOperator("3282:3288:15:92:21:92", 16)) ? 0 : '') + Qeakaouoeois.rightOperator("3280:3316:13:92:49:92", b.toString(16)));
    }
  }

  return result;
};

module.exports = sha256;