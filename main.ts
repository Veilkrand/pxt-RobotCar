// Initialize the chip address for PCA9685 controller
PCA9685.init(67, 0)


/**
 * RobotCar_Keyestudio blocks
 */
//% weight=100 color=#0fbc11 icon="\uf1b9"
//% groups=['Motors', 'Sonar', 'Leds', 'IR Sensors']
namespace RobotCar_Keyestudio {

    // Pins Constant for all modules except PCA9685 control
    const IR_SENSOR_LEFT = DigitalPin.P2
    const IR_SENSOR_RIGHT = DigitalPin.P11
    const PIN_SONAR_TRIG = DigitalPin.P14
    const PIN_SONAR_ECHO = DigitalPin.P15

    // Initialize pins
    pins.setPull(IR_SENSOR_LEFT, PinPullMode.PullUp)
    pins.setPull(IR_SENSOR_RIGHT, PinPullMode.PullUp)


    export namespace Motors {

        /**
         * Move the robot in a straight line, forward or backwards.
         * 
         * @param speed Magnitude of the motor speed [-100, 100], negative number is backward motor rotation.
         */

        //% block="move at $speed \\% speed"
        //% speed.shadow="speedPicker"
        //% group="Motors"
        //% weight=100
        export function move(speed: number): void {
            rightMotor(speed)
            leftMotor(speed)
        }

        /**
         * Spin the robot.
         * 
         * @param speed Magnitude of the spin for motor speed [-100, 100]; 100 is full right hand spin.
         */
        //% block="spin at $speed \\%"
        //% speed.min=-100 steering.max=100
        //% speed.shadow=turnRatioPicker
        //% group="Motors"
        export function spin(speed: number): void {
            rightMotor(-speed)
            leftMotor(speed)
        }

        /**
         * Differential steering 2WD.
         * 
         * @param speed Magnitude of the motors speed [0, 100].
         * @param steering Magnitude of the steering [-100, 100]; 100 is turning right with right wheel stopped
         */


        //% block="steer $speed $steering"
        //% group="Motors"
        //% speed.shadow="speedPicker"
        //% steering.min=-100 steering.max=100
        //% steering.shadow=turnRatioPicker
        export function steer(speed: number, steering: number): void {

            steering = Math.constrain(steering, -100, 100)
            speed = Math.constrain(speed, -100, 100)

            let left_speed = speed
            let right_speed = speed

            if (steering > 0) {
                // map current steering to current speed
                //let steering_speed = Math.map(steering, 0, 100, 0, speed)
                left_speed -= steering

            } else if (steering < 0) {
                //let steering_speed = Math.map(steering, 0, -100, 0, speed)
                right_speed -= steering * -1

            }

            leftMotor(left_speed)
            rightMotor(right_speed)
        }
        /** 
         * Stop the robot movement. 
         * 
        */
        //%block
        //% group="Motors"
        export function stop(): void {
            move(0)
        }

        export function leftMotor(speed: number): void {

            speed = Math.constrain(speed, -100, 100)

            if (speed >= 0) {
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
            } else {
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 100, 67)
            }
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, Math.abs(speed), 67)
        }

        export function rightMotor(speed: number): void {

            speed = Math.constrain(speed, -100, 100)

            if (speed >= 0) {
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
            } else {
                PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 100, 67)
            }
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, Math.abs(speed), 67)
        }
    }

    export namespace Leds {
        // ******
        // * Front Leds Control
        // 

        /**
         * Control the front leds colors [0,255].
         * @param R Red light intensity [0,255]
         * @param G Green light intensity [0,255]
         * @param B Blue light intensity [0,255]
         */
        //%block="Set Led RGB"
        //% group="Leds"
        export function setRGB(R: number, G: number, B: number): void {

            let r = Math.map(R, 0, 255, 100, 0)
            let g = Math.map(G, 0, 255, 100, 0)
            let b = Math.map(B, 0, 255, 100, 0)

            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, g, 67)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, b, 67)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, r, 67)
        }

        //%block="Led Show Red"
        //% group="Leds"
        export function showRed(): void {
            setRGB(255, 0, 0)
        }

        //%block="Led Show Green"
        //% group="Leds"
        export function showGreen(): void {
            setRGB(0, 255, 0)
        }

        //%block="Led Show Blue"
        //% group="Leds"
        export function showBlue(): void {
            setRGB(0, 0, 255)
        }

        //%block="Led Show White"
        //% group="Leds"
        export function showWhite(): void {
            setRGB(255, 255, 255)
        }

        //%block="Leds Off"
        //% group="Leds"
        export function ledsOff(): void {
            setRGB(0, 0, 0)
        }
    }

    export namespace IrSensors {
        // ******
        // * IR Sensors handling for obstacle detection

        //%block
        //% group="IR Sensors"
        export function isLeftBlocked(): boolean {
            if (pins.digitalReadPin(IR_SENSOR_LEFT) == 0) {
                return true
            } else {
                return false
            }
        }

        //%block
        //% group="IR Sensors"
        export function isRightBlocked(): boolean {
            if (pins.digitalReadPin(IR_SENSOR_RIGHT) == 0) {
                return true
            } else {
                return false
            }
        }





    }

    export namespace Sonar {
        // ******
        // * Sonar handling with median filter

        // Globals
        let sonar_measures: number[] = []
        // Constants
        let SONAR_MEDIAN_SIZE = 2 //3

        /**
         * The "median" is the "middle" value in the list of numbers.
         *
         * @param {Array} numbers An array of numbers.
         * @return {Number} The calculated median value from the specified numbers.
         */
        function median(numbers: number[]) {
            // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
            let median = 0
            let numsLen = numbers.length
            numbers.sort();

            if (
                numsLen % 2 === 0 // is even
            ) {
                // average of two middle numbers
                median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
            } else { // is odd
                // middle number only
                median = numbers[(numsLen - 1) / 2];
            }

            return median;
        }

        /**
         * Ping the sonar and return a median-filtered distance result in centimeters.
         * 
         */
        //% block
        //% group="Sonar"
        export function ping(): number {

            let measure = sonar.ping(
                PIN_SONAR_TRIG,
                PIN_SONAR_ECHO,
                PingUnit.Centimeters
            )

            if (measure > 0) {
                sonar_measures.push(measure)
                if (sonar_measures.length > SONAR_MEDIAN_SIZE) { sonar_measures.shift() }
            }

            return median(sonar_measures)
        }
    }
}
