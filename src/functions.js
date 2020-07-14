
export const isHexString = (hex) => {
    var hexString = hex;
    if (!hex.includes("#")) {
        hexString = `#${hex}`;
    }
    return RegExp("^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$").test(hexString);
}

export const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

export const convertRgbStringToArray = (rgbString) => {
    var rgb = [];
    var rString = rgbString.toString();
    var r1 = rString.replace('rgb(', '');
    var r2 = r1.replace(')', '');
    var r3 = r2.replace(' ', '');
    var rStringArr = r3.split(',');
    rgb = rStringArr.map(function (x) {
        // return parseInt(x, 16);
        return parseInt(x, 10);
    });
    return rgb;
}

export const convertRgbArrayToString = (arr) => "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")"

const rgbToLightness = (r, g, b) => (1 / 2) * (Math.max(r, g, b) + Math.min(r, g, b));

const rgbToSaturation = (r, g, b) => {
    const L = rgbToLightness(r, g, b);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return (L === 0 || L === 1)
        ? 0
        : (max - min) / (1 - Math.abs(2 * L - 1));
};

const rgbToHue = (r, g, b) => Math.round(
    Math.atan2(
        Math.sqrt(3) * (g - b),
        2 * r - g - b,
    ) * 180 / Math.PI
);

const rgbToHsl = (r, g, b) => {
    const lightness = rgbToLightness(r, g, b);
    const saturation = rgbToSaturation(r, g, b);
    const hue = rgbToHue(r, g, b) < 0 ? rgbToHue(r, g, b) + 360 : rgbToHue(r, g, b);
    return [hue, saturation, lightness];
}

export const hslToRgb = (h, s, l) => {
    const C = (1 - Math.abs(2 * l - 1)) * s;
    const hPrime = h / 60;
    const X = C * (1 - Math.abs(hPrime % 2 - 1));
    const m = l - C / 2;
    const withLight = (r, g, b) => [r + m, g + m, b + m];
    if (hPrime <= 1) { return withLight(C, X, 0); } else
        if (hPrime <= 2) { return withLight(X, C, 0); } else
            if (hPrime <= 3) { return withLight(0, C, X); } else
                if (hPrime <= 4) { return withLight(0, X, C); } else
                    if (hPrime <= 5) { return withLight(X, 0, C); } else
                        if (hPrime <= 6) { return withLight(C, 0, X); }
}

export const rgbToObject = (red, green, blue) => {
    var [hue, saturation, lightness] = [0, 0, 0]
    try {
        [hue, saturation, lightness] = rgbToHsl(red / 255, green / 255, blue / 255);
    } catch (error) {
        [hue, saturation, lightness] = [undefined, undefined, undefined]
    }

    return { red, green, blue, hue, saturation, lightness };
}

export const hslToObject = (hue, saturation, lightness) => {
    var [red, green, blue] = [255, 255, 255]
    try {
        [red, green, blue] = hslToRgb(hue, saturation, lightness);
    } catch (error) {
        [red, green, blue] = [undefined, undefined, undefined]
    }
    red = red * 255;
    green = green * 255;
    blue = blue * 255;
    return { red, green, blue, hue, saturation, lightness };
}

/* ------------------------------------------------
FUNCTIONS
------------------------------------------------  */
const power = (i) => (i - 0.37);
export const saturate = ({ saturation, i }) => Math.min(1, saturation + power(i));
export const desaturate = ({ saturation, i }) => Math.max(0, saturation - power(i));
export const lighten = ({ lightness, i }) => Math.min(1, lightness + power(i));
export const darken = ({ lightness, i }) => Math.max(0, lightness - power(i));

/* ------------------------------------------------
PREDICATES
------------------------------------------------  */
export const isGrayscale = ({ saturation }) => saturation === 0;
export const isDark = ({ lightness }) => lightness < 0.55;