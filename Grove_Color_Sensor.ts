/**
 * Librairie Makecode pour Grove_Color_Sensor.
 */
namespace A4_Grove {

    export enum Couleur {
        Rouge,
        Vert,
        Bleu,
        Eclairage
    }

    //% weight=1 color=#004696 icon="\uf121" block="Grove_Color_Sensor" advanced=false
    namespace Grove_Color_Sensor {
        //% block
        export function get_color(coul: Couleur) {
            let nums: number;
            pins.i2cWriteNumber( 41, 146, NumberFormat.Int8BE, false);
            nums = pins.i2cReadNumber(41, NumberFormat.UInt8BE, false);
            return nums;
        }

    }
}
