import * as React from 'react'
import './styles.scss'
import { Defaults, Offsets, ShadyModeTypes } from './constants';
import {
    isHexString,
    hexToRgb,
    convertRgbStringToArray,
    rgbToObject,
    isDark,
    lighten,
    convertRgbArrayToString,
    hslToObject,
    darken
} from './functions';

const { useState } = React
function ShadyButton(props) {
    var { children, className, backgroundColor, mode, style, hoverShadeStrength, clickShadeStrength, onMouseEnter, onMouseDown, onMouseLeave, onMouseUp, ...rest } = props
    var _className = className || "";
    var _backgroundColor = backgroundColor || "#DDDDDD";
    var _mode = mode || ShadyModeTypes.lighten;
    var _style = style || {};
    var _onHoverShadeStrength = hoverShadeStrength || Defaults.hoverStrength;
    var _onClickShadeStrength = clickShadeStrength || Defaults.clickStrength;

    // disect color into rgb array
    var rgbArray = [] as Number[];
    if (isHexString(_backgroundColor)) {
        // is hex string
        if (!_backgroundColor.includes("#"))
            _backgroundColor = `#${_backgroundColor}`
        rgbArray = hexToRgb(_backgroundColor)
    } else {
        // is rgb string
        rgbArray = convertRgbStringToArray(_backgroundColor)
    }

    // setState hook
    const [bgColor, setBgColor] = useState(_backgroundColor)

    var defaultColorObj = rgbToObject(rgbArray[0], rgbArray[1], rgbArray[2])
    var hoverColorObj = rgbToObject(rgbArray[0], rgbArray[1], rgbArray[2])
    var clickColorObj = rgbToObject(rgbArray[0], rgbArray[1], rgbArray[2])
    var bgHover = _backgroundColor;
    var bgClick = _backgroundColor;
    var isHSL = false;

    if (_mode == ShadyModeTypes.lighten) {
        // check if dark
        if (isDark({ lightness: defaultColorObj.lightness })) {
            // dark
            hoverColorObj.lightness = lighten({ lightness: hoverColorObj.lightness, i: _onHoverShadeStrength + Offsets.darkHoverLighten })
            clickColorObj.lightness = lighten({ lightness: clickColorObj.lightness, i: _onClickShadeStrength + Offsets.darkClickLighten })
            isHSL = true
        } else {
            // not dark
            hoverColorObj.lightness = lighten({ lightness: hoverColorObj.lightness, i: _onHoverShadeStrength + Offsets.lightHoverLighten })
            clickColorObj.lightness = lighten({ lightness: clickColorObj.lightness, i: _onClickShadeStrength + Offsets.lightClickLighten })
            isHSL = true
        }

    } else if (_mode == ShadyModeTypes.darken) {
        if (isDark({ lightness: defaultColorObj.lightness })) {
            // dark
            hoverColorObj.lightness = darken({ lightness: hoverColorObj.lightness, i: _onHoverShadeStrength + Offsets.darkHoverDarken })
            clickColorObj.lightness = darken({ lightness: clickColorObj.lightness, i: _onClickShadeStrength + Offsets.darkClickDarken })
            isHSL = true
        } else {
            // not dark
            hoverColorObj.lightness = darken({ lightness: hoverColorObj.lightness, i: _onHoverShadeStrength + Offsets.lightHoverDarken })
            clickColorObj.lightness = darken({ lightness: clickColorObj.lightness, i: _onClickShadeStrength + Offsets.lightClickDarken })
            isHSL = true
        }
    } else {
        // invalid _mode type, do nothing with bgColor
    }

    if ((defaultColorObj.hue == undefined || defaultColorObj.saturation == undefined || defaultColorObj.lightness == undefined) || (defaultColorObj.red == undefined || defaultColorObj.green == undefined || defaultColorObj.blue == undefined)) {
        // error
        console.log("Couldn't create color object. Make sure your input is a valid rgb (rgb(255, 255, 255)) or hex string (#FFFFFF).")
    } else {
        // success
        // check if hsl
        if (isHSL) {
            var hslHoverColorObj = hslToObject(hoverColorObj.hue, hoverColorObj.saturation, hoverColorObj.lightness)
            var hslClickColorObj = hslToObject(clickColorObj.hue, clickColorObj.saturation, clickColorObj.lightness)
            bgHover = convertRgbArrayToString([hslHoverColorObj.red, hslHoverColorObj.green, hslHoverColorObj.blue])
            bgClick = convertRgbArrayToString([hslClickColorObj.red, hslClickColorObj.green, hslClickColorObj.blue])
        } else {
            // is rgb
            bgHover = convertRgbArrayToString([hoverColorObj.red, hoverColorObj.green, hoverColorObj.blue])
            bgClick = convertRgbArrayToString([clickColorObj.red, clickColorObj.green, clickColorObj.blue])
        }
    }

    // fix _className
    _className = `ShadyButton ShadyButton-default ${_className}`

    const _onMouseEnter = () => {
        setBgColor(bgHover)
        onMouseEnter ? onMouseEnter() : null
    }

    const _onMouseLeave = () => {
        setBgColor(_backgroundColor)
        onMouseLeave ? onMouseLeave() : null
    }

    const _onMouseUp = () => {
        setBgColor(bgHover)
        onMouseUp ? onMouseUp() : null
    }

    const _onMouseDown = () => {
        setBgColor(bgClick)
        onMouseDown ? onMouseDown() : null
    }

    return (
        <button
            className={_className}
            style={{
                backgroundColor: bgColor,
                ..._style
            }}
            onMouseDown={_onMouseDown}
            onMouseUp={_onMouseUp}
            onMouseLeave={_onMouseLeave}
            onMouseEnter={_onMouseEnter}
            {...rest}
        >
            {children}
        </button>
    )
}

export default ShadyButton