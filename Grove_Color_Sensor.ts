/**
 * Librairie Makecode pour Grove_Color_Sensor.
 */

//% weight=1 color=#004696 icon="\uf121" block="Grove_Color_Sensor" advanced=false
namespace A4_Robot_Driver {
    /**
     * Configure la position angulaire d'un servomoteur
     * @param pin choix du moteur: droit ou gauche
     */

    //% blockId=A4_Robot_Driver_servo_degrees
    //% block="positionner le servo sur |%pin| à |%angle| degrés"
    //% parts="A4_Robot_Driver" advanced=false
    //% angle.shadow="protractorPicker"
    //% angle.defl=90
    export function setServoMotor(pin: AnalogPin, angle: number): void {
        pins.servoWritePin(pin, Math.constrain(angle, 0, 180));
    }

}
