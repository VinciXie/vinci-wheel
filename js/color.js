class ColorTransform {
  // let color = 'rgb(123,123,123)'

  static RGBcolor2RGBarr(color) {
    if (Array.isArray(color)) {
      return color
    } else if (typeof color == 'string' && color.startsWith('rgb')) {
      let index = color.indexOf('(')
      console.log('color', color);
      color = color.slice(index + 1, -1)
      console.log('color', color);
      return color.split(',')
    }
  }
  
  static RGB2HEX(color) {
    if (color[0] == '#') {
      return color;
    }
    let rgb = this.RGBcolor2RGB(color)
    let hex = '#';
    for (var i = 0; i < rgb.length; i++) {
      hex += Number(rgb[i]).toString(16)
    }
    return hex;
  }

  static HSV2RGB(h, s, v) {

      var round = Math.round;
      var min = Math.min;
      var max = Math.max;
      var ceil = Math.ceil;

      function set(r, g, b, out) {
        out[0] = round(r * 255);
        out[1] = round(g * 255);
        out[2] = round(b * 255);
      }

      function clamp(v, l, u) {
        return max(l, min(v, u));
      }

      function hsv2rgb(h, s, v, out) {
        out = out || [0, 0, 0];
        h = h % 360;
        s = clamp(s, 0, 1);
        v = clamp(v, 0, 1);

        // Grey
        if (!s) {
          out[0] = out[1] = out[2] = ceil(v * 255);
        } else {
          var b = ((1 - s) * v);
          var vb = v - b;
          var hm = h % 60;
          switch((h/60)|0) {
            case 0: set(v, vb * h / 60 + b, b, out); break;
            case 1: set(vb * (60 - hm) / 60 + b, v, b, out); break;
            case 2: set(b, v, vb * hm / 60 + b, out); break;
            case 3: set(b, vb * (60 - hm) / 60 + b, v, out); break;
            case 4: set(vb * hm / 60 + b, b, v, out); break;
            case 5: set(v, b, vb * (60 - hm) / 60 + b, out); break;
          }
        }
        return out;
      }

      return hsv2rgb(h, s, v)


  }

}

// ColorTransform.RGB2HEX(color)

export default ColorTransform;
