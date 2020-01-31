
/**
 * Utilisez ce fichier pour définir des fonctions et des blocs personnalisés.
 * En savoir plus à https://makecode.microbit.org/blocks/custom
 */

enum Color {
    //% block="Red"
    Red,
    //% block="Green"
    Green,
    //% block="Blue"
    Blue,
    //% block="Clear"
    Clear
}


//% weight=1 color=#004696 icon="\uf121" block="Grove_Color_Sensor" advanced=false
namespace Grove_Color_Sensor {

    export let identifiant = 0;

    //% block
    export function get_color(col: Color): NumberFormat.UInt16BE {
        let nums, red, green, blue, clear: number;

        if (identifiant == 0) {   // No sensor previously detected
            pins.i2cWriteNumber(57, 132, NumberFormat.UInt8BE, false);
            nums = pins.i2cReadNumber(57, NumberFormat.UInt8BE, false);
            if (nums == 17) {     // Grove Sensor v1.3 detected
                identifiant = 1;
                pins.i2cWriteNumber(57, 129, NumberFormat.UInt8BE, false);
                pins.i2cWriteNumber(57, 0, NumberFormat.UInt8BE, true);
                pins.i2cWriteNumber(57, 135, NumberFormat.UInt8BE, false);
                pins.i2cWriteNumber(57, 48, NumberFormat.UInt8BE, true);
                pins.i2cWriteNumber(57, 128, NumberFormat.UInt8BE, false);
                pins.i2cWriteNumber(57, 3, NumberFormat.UInt8BE, true);
                basic.pause(50);
            } else {
                pins.i2cWriteNumber(41, 146, NumberFormat.UInt8BE, false);
                nums = pins.i2cReadNumber(41, NumberFormat.UInt8BE, false);
                if (nums == 68) {     // Grove Sensor v2 detected 
                    identifiant = 2;
                    pins.i2cWriteNumber(41, 129, NumberFormat.UInt8BE, false);
                    pins.i2cWriteNumber(41, 249, NumberFormat.UInt8BE, true);
                    pins.i2cWriteNumber(41, 143, NumberFormat.UInt8BE, false);
                    pins.i2cWriteNumber(41, 2, NumberFormat.UInt8BE, true);
                    pins.i2cWriteNumber(41, 128, NumberFormat.UInt8BE, false);
                    pins.i2cWriteNumber(41, 1, NumberFormat.UInt8BE, true);
                    basic.pause(50);
                    pins.i2cWriteNumber(41, 128, NumberFormat.UInt8BE, false);
                    pins.i2cWriteNumber(41, 3, NumberFormat.UInt8BE, true);
                    basic.pause(500);
                }
            }
        }

        if (identifiant == 1) {    // Grove Sensor v1.3 detected
            switch (col) {
                case Color.Red:
                    pins.i2cWriteNumber(57, 210, NumberFormat.UInt8BE, false);
                    red = pins.i2cReadNumber(57, NumberFormat.UInt16BE, true);
                    return swap16(red)
                    break
                case Color.Green:
                    pins.i2cWriteNumber(57, 208, NumberFormat.UInt8BE, false);
                    green = pins.i2cReadNumber(57, NumberFormat.UInt16BE, true);
                    return swap16(green)
                    break
                case Color.Blue:
                    pins.i2cWriteNumber(57, 212, NumberFormat.UInt8BE, false);
                    blue = pins.i2cReadNumber(57, NumberFormat.UInt16BE, true);
                    return swap16(blue)
                    break
                case Color.Clear:
                    pins.i2cWriteNumber(57, 214, NumberFormat.UInt8BE, false);
                    clear = pins.i2cReadNumber(57, NumberFormat.UInt16BE, true);
                    return swap16(clear)
                    break
            }
        }
        else if (identifiant == 2) {
            switch (col) {
                case Color.Red:
                    pins.i2cWriteNumber(41, 150, NumberFormat.UInt8BE, false);
                    red = pins.i2cReadNumber(41, NumberFormat.UInt16BE, true);
                    return swap16(red)
                    break
                case Color.Green:
                    pins.i2cWriteNumber(41, 152, NumberFormat.UInt8BE, false);
                    green = pins.i2cReadNumber(41, NumberFormat.UInt16BE, true);
                    return swap16(green)
                    break
                case Color.Blue:
                    pins.i2cWriteNumber(41, 154, NumberFormat.UInt8BE, false);
                    blue = pins.i2cReadNumber(41, NumberFormat.UInt16BE, true);
                    return swap16(blue)
                    break
                case Color.Clear:
                    pins.i2cWriteNumber(41, 148, NumberFormat.UInt8BE, false);
                    clear = pins.i2cReadNumber(41, NumberFormat.UInt16BE, true);
                    return swap16(clear)
                    break
            }
            return 0;
        }
        return 0;
    }

    export function swap16(val: NumberFormat.UInt16BE) {
        return ((val & 0xFF) << 8)
            | ((val >> 8) & 0xFF);
    }

    export function get_id(): NumberFormat.UInt16BE {
        return identifiant;
    }
}
