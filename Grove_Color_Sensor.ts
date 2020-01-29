/**
 * Librairie Makecode pour Grove_Color_Sensor.
 */


//% weight=1 color=#004696 icon="\uf121" block="Grove_Color_Sensor" advanced=false
namespace A4_Robot_Driver {
    export enum MotorDirection {
        //% block="Avancer"
        Forward = 1,
        //% block="Reculer"
        Reverse = 2,
        //% block="Arrêter"
        Stop = 0
    }

    export enum RobotDirection {
        //% block="Avancer"
        Forward,
        //% block="Reculer"
        Reverse,
        //% block="Virer à droite"
        TurnRigh,
        //% block="Virer à gauche"
        TurnLef,
        //% block="Tourner à droite"
        RotateRight,
        //% block="Tourner à gauche"
        RotateLef,
        //% block="Arrêter"
        Stop
    }

    export enum Motors {
        //%blockId=A4_Robot_Driver_motor_one
        //% block="moteur gauche"
        Motor1,
        //%blockId=A4_Robot_Driver_motor_two
        //% block="moteur droit"
        Motor2,
        //%blockId=A4_Robot_Driver_motor_full
        //% block="moteurs droit et gauche"
        MotorFull
    }

    export let _speed_left = 700; //1023 = 100% de la vitesse
    export let _speed_right = 700;
    export let _dir_right = 1; //0 = arrêt, 1 = avancer, 2 = reculer
    export let _dir_left = 1;


    /**
     * Permet de controler les déplacements et la vitesse du robot
     * @param dir sens de déplacement du robot
     * @param speed vitesse en pourcentage du moteur
     */

    //% blockId=A4_Robot_Driver_Robot_Move
    //% block="Groove_Color_Sensor BV %dir| vitesse %speed"
    //% speed.min=0 speed.max=100
    //% parts="A4_Robot_Driver" advanced=false
    //% speed.defl=75
    export function robotMove(dir: RobotDirection, speed: number): void {
        setSpeed(Motors.MotorFull, speed);
        switch (dir) {
            case RobotDirection.Forward:
                setDir(Motors.MotorFull, MotorDirection.Forward);
                break
            case RobotDirection.Reverse:
                setDir(Motors.MotorFull, MotorDirection.Reverse);
                break
            case RobotDirection.RotateRight:
                setDir(Motors.Motor1, MotorDirection.Forward);
                setDir(Motors.Motor2, MotorDirection.Reverse);
                break
            case RobotDirection.RotateLef:
                setDir(Motors.Motor1, MotorDirection.Reverse);
                setDir(Motors.Motor2, MotorDirection.Forward);
                break
            case RobotDirection.TurnRigh:
                setDir(Motors.Motor1, MotorDirection.Forward);
                setDir(Motors.Motor2, MotorDirection.Stop);
                break
            case RobotDirection.TurnLef:
                setDir(Motors.Motor1, MotorDirection.Stop);
                setDir(Motors.Motor2, MotorDirection.Forward);
                break
            case RobotDirection.Stop:
                setDir(Motors.MotorFull, MotorDirection.Stop);
                break
        }
        setMotors();
    }


    /**
     * Mesure la distance à partir d'un capteur à ultrason
     * @param pin Pin ou est branché le capteur
     */

    //% blockId=A4_Robot_Driver_ultrasonic_cm 
    //% block="Ultrason - Mesurer la distance|%name| (cm)"
    //% name.fieldEditor="gridpicker" 
    //% name.fieldOptions.columns=5
    //% name.fieldOptions.tooltips="false"
    //% name.fieldOptions.width="0"
    export function measDistCm(name: DigitalPin): number {
        let duration = 0;
        let distance = 0;
        pins.digitalWritePin(name, 0); //make sure pin is low
        control.waitMicros(2);
        pins.digitalWritePin(name, 1); //send echo
        control.waitMicros(20);
        pins.digitalWritePin(name, 0);
        duration = pins.pulseIn(name, PulseValue.High, 50000); // Max duration 50 ms - receive echo
        distance = duration * 153 / 29 / 2 / 100;
        Math.constrain(distance, 0, 500);
        //basic.pause(50);
        return distance;
    }


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


    /**
     * Permet de changer la direction du moteur sélectionné
     * @param motor choix du moteur: droit ou gauche
     * @param dir sens de rotation du moteur comparé au sens du robot
     */

    //% blockId=A4_Robot_Driver_motor_dir
    //% block="%motor| %dir"
    //% parts="A4_Robot_Driver" advanced=true
    //% motor.defl=MotorFull
    export function motorDir(motor: Motors, dir: MotorDirection): void {
        setDir(motor, dir);
        setMotors();
    }


    /**
     * Permet de changer la vitesse du moteur sélectionné
     * @param motor choix du moteur: droit ou gauche
     * @param speed vitesse en pourcentage du moteur
     */
    
    //% blockId=A4_Robot_Driver_Motor_Speed
    //% block="Régler la vitesse %motor| à %speed"
    //% speed.min=0 speed.max=100
    //% parts="A4_Robot_Driver" advanced=true
    //% speed.defl=75
    export function motorSpeed(motor: Motors, speed: number): void {
        setSpeed(motor, speed);
        setMotors();
    }


    /*
     * Private functions
     */


    function setDir(motor: Motors, dir: MotorDirection): void {
        switch (motor) {
            case Motors.Motor1: //gauche
                _dir_left = dir;
                break
            case Motors.Motor2: //droit
                _dir_right = dir;
                break
            case Motors.MotorFull: //droit
                _dir_left = dir;
                _dir_right = dir;
                break
        }
    }

    function setSpeed(motor: Motors, speed: number): void {
        let corrected_speed = Math.min(Math.map(speed, 0, 100, 0, 1023), 1023);
        switch (motor) {
            case Motors.Motor1:
                _speed_left = corrected_speed;
                break
            case Motors.Motor2:
                _speed_right = corrected_speed;
                break
            case Motors.MotorFull:
                _speed_left = corrected_speed;
                _speed_right = corrected_speed;
                break
        }
    }

    function setMotors(): void {
        if (_dir_right == 1) {
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.analogWritePin(AnalogPin.P16, _speed_right);
        } else if (_dir_right == 2) {
            pins.analogWritePin(AnalogPin.P15, _speed_right);
            pins.digitalWritePin(DigitalPin.P16, 0);
        } else {
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (_dir_left == 1) {
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.analogWritePin(AnalogPin.P14, _speed_left);
        } else if (_dir_left == 2) {
            pins.analogWritePin(AnalogPin.P13, _speed_left);
            pins.digitalWritePin(DigitalPin.P14, 0);
        } else {
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.digitalWritePin(DigitalPin.P14, 0);
        }
    }
}
