const Qeakaouoeois = require("./instrumentation_api.js");

const mandelbrot = function (size) {
  let sum = 0;
  let byte_acc = 0;
  let bit_num = 0;
  let y = 0;

  while (Qeakaouoeois.genericRecord("113:121:9:6:17:6", Qeakaouoeois.leftOperator("113:121:9:6:17:6", y) < Qeakaouoeois.rightOperator("113:121:9:6:17:6", size))) {
    let ci = Qeakaouoeois.genericRecord("140:162:15:7:37:7", Qeakaouoeois.leftOperator("140:162:15:7:37:7", Qeakaouoeois.genericRecord("141:155:16:7:30:7", Qeakaouoeois.leftOperator("141:155:16:7:30:7", Qeakaouoeois.genericRecord("141:148:16:7:23:7", Qeakaouoeois.leftOperator("141:148:16:7:23:7", 2.0) * Qeakaouoeois.rightOperator("141:148:16:7:23:7", y))) / Qeakaouoeois.rightOperator("141:155:16:7:30:7", size))) - Qeakaouoeois.rightOperator("140:162:15:7:37:7", 1.0));
    let x = 0;

    while (Qeakaouoeois.genericRecord("194:202:13:9:21:9", Qeakaouoeois.leftOperator("194:202:13:9:21:9", x) < Qeakaouoeois.rightOperator("194:202:13:9:21:9", size))) {
      let zr = 0.0;
      let zrzr = 0.0;
      let zi = 0.0;
      let zizi = 0.0;
      let cr = Qeakaouoeois.genericRecord("329:351:19:14:41:14", Qeakaouoeois.leftOperator("329:351:19:14:41:14", Qeakaouoeois.genericRecord("330:344:20:14:34:14", Qeakaouoeois.leftOperator("330:344:20:14:34:14", Qeakaouoeois.genericRecord("330:337:20:14:27:14", Qeakaouoeois.leftOperator("330:337:20:14:27:14", 2.0) * Qeakaouoeois.rightOperator("330:337:20:14:27:14", x))) / Qeakaouoeois.rightOperator("330:344:20:14:34:14", size))) - Qeakaouoeois.rightOperator("329:351:19:14:41:14", 1.5));
      let z = 0;
      let escape = 1;

      while (Qeakaouoeois.genericRecord("417:423:17:17:23:17", Qeakaouoeois.leftOperator("417:423:17:17:23:17", z) < Qeakaouoeois.rightOperator("417:423:17:17:23:17", 50))) {
        let tr = Qeakaouoeois.genericRecord("450:466:23:18:39:18", Qeakaouoeois.leftOperator("450:466:23:18:39:18", Qeakaouoeois.genericRecord("450:461:23:18:34:18", Qeakaouoeois.leftOperator("450:461:23:18:34:18", zrzr) - Qeakaouoeois.rightOperator("450:461:23:18:34:18", zizi))) + Qeakaouoeois.rightOperator("450:466:23:18:39:18", cr));
        let ti = Qeakaouoeois.genericRecord("491:509:23:19:41:19", Qeakaouoeois.leftOperator("491:509:23:19:41:19", Qeakaouoeois.genericRecord("491:504:23:19:36:19", Qeakaouoeois.leftOperator("491:504:23:19:36:19", Qeakaouoeois.genericRecord("491:499:23:19:31:19", Qeakaouoeois.leftOperator("491:499:23:19:31:19", 2.0) * Qeakaouoeois.rightOperator("491:499:23:19:31:19", zr))) * Qeakaouoeois.rightOperator("491:504:23:19:36:19", zi))) + Qeakaouoeois.rightOperator("491:509:23:19:41:19", ci));
        zr = tr;
        zi = ti; // preserve recalculation

        zrzr = Qeakaouoeois.genericRecord("604:609:21:23:26:23", Qeakaouoeois.leftOperator("604:609:21:23:26:23", zr) * Qeakaouoeois.rightOperator("604:609:21:23:26:23", zr));
        zizi = Qeakaouoeois.genericRecord("632:637:21:24:26:24", Qeakaouoeois.leftOperator("632:637:21:24:26:24", zi) * Qeakaouoeois.rightOperator("632:637:21:24:26:24", zi));

        if (Qeakaouoeois.genericRecord("657:674:18:25:35:25", Qeakaouoeois.leftOperator("657:674:18:25:35:25", Qeakaouoeois.genericRecord("657:668:18:25:29:25", Qeakaouoeois.leftOperator("657:668:18:25:29:25", zrzr) + Qeakaouoeois.rightOperator("657:668:18:25:29:25", zizi))) > Qeakaouoeois.rightOperator("657:674:18:25:35:25", 4.0))) {
          escape = 0;
          break;
        }

        z += 1;
      }

      byte_acc = Qeakaouoeois.genericRecord("804:828:21:31:45:31", Qeakaouoeois.leftOperator("804:828:21:31:45:31", Qeakaouoeois.genericRecord("805:818:22:31:35:31", Qeakaouoeois.leftOperator("805:818:22:31:35:31", byte_acc) << Qeakaouoeois.rightOperator("805:818:22:31:35:31", 1))) | Qeakaouoeois.rightOperator("804:828:21:31:45:31", escape));
      bit_num += 1; // Code is very similar for these cases, but using separate blocks
      // ensures we skip the shifting when it's unnecessary, which is most cases.

      if (Qeakaouoeois.genericRecord("1011:1023:14:35:26:35", Qeakaouoeois.leftOperator("1011:1023:14:35:26:35", bit_num) == Qeakaouoeois.rightOperator("1011:1023:14:35:26:35", 8))) {
        sum ^= byte_acc;
        byte_acc = 0;
        bit_num = 0;
      } else if (Qeakaouoeois.genericRecord("1135:1148:21:39:34:39", Qeakaouoeois.leftOperator("1135:1148:21:39:34:39", x) == Qeakaouoeois.rightOperator("1135:1148:21:39:34:39", Qeakaouoeois.genericRecord("1140:1148:26:39:34:39", Qeakaouoeois.leftOperator("1140:1148:26:39:34:39", size) - Qeakaouoeois.rightOperator("1140:1148:26:39:34:39", 1))))) {
        byte_acc <<= Qeakaouoeois.genericRecord("1180:1191:28:40:39:40", Qeakaouoeois.leftOperator("1180:1191:28:40:39:40", 8) - Qeakaouoeois.rightOperator("1180:1191:28:40:39:40", bit_num));
        sum ^= byte_acc;
        byte_acc = 0;
        bit_num = 0;
      }

      x += 1;
    }

    y += 1;
  }

  return sum;
};

if (Qeakaouoeois.genericRecord("1358:1388:3:53:33:53", Qeakaouoeois.leftOperator("1358:1388:3:53:33:53", typeof module) !== Qeakaouoeois.rightOperator("1358:1388:3:53:33:53", 'undefined'))) module.exports = mandelbrot;