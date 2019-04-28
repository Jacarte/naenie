const mandelbrot = function (size) {
  let sum = 0;
  let byte_acc = 0;
  let bit_num = 0;
  let y = 0;

  while (y < size) {
    let ci = ww.Aaieiahixu(y, size);
    let x = 0;

    while (x < size) {
      let zr = 0.0;
      let zrzr = 0.0;
      let zi = 0.0;
      let zizi = 0.0;
      let cr = ww.Svuienoquswe(x, size);
      let z = 0;
      let escape = 1;

      while (z < 50) {
        let tr = ww.Fiuioomephi(zrzr, zizi, cr);
        let ti = ww.Rasluailaup(zr, zi, ci);
        zr = tr;
        zi = ti; // preserve recalculation

        zrzr = zr * zr;
        zizi = zi * zi;

        if (ww.Ifeeuaukeo(zrzr, zizi)) {
          escape = 0;
          break;
        }

        z += 1;
      }

      byte_acc = ww.Ceaouoigoi(byte_acc, escape);
      bit_num += 1; // Code is very similar for these cases, but using separate blocks
      // ensures we skip the shifting when it's unnecessary, which is most cases.

      if (bit_num == 8) {
        sum ^= byte_acc;
        byte_acc = 0;
        bit_num = 0;
      } else if (ww.Hoeioetsawu(x, size)) {
        byte_acc <<= 8 - bit_num;
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

if (typeof module !== 'undefined') module.exports = mandelbrot;