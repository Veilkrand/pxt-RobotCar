
// Initialize the pins
PCA9685.init(67, 0)

/**
 * RobotCar_Keyestudio blocks
 */
//% weight=100 color=#0fbc11 icon="\uf1b9"
//% groups=['Motors', 'Sonar', 'Leds']
namespace RobotCar_Keyestudio {

    // Pin Constants
    

    export namespace Motors {

        /**
         * Move the robot in a straight line, forward or backwards.
         * 
         * @param speed Magnitude of the motor speed [-100, 100], negative number is backward motor rotation.
         */
        //% block
        //% group="Motors"
        export function move(speed: number): void {
            rightMotor(speed)
            leftMotor(speed)
        }

        /**
         * Spin the robot.
         * 
         * @param speed Magnitude of the spin for motor speed [-100, 100]; 100 is full right hand spin.
         */
        //% block
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
        //% block
        //% group="Motors"
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
         * Control the front leds colors [0,255]
         * 
         */
        //%block
        //% group="Leds"
        export function setLedRGB(R: number, G: number, B: number): void {

            let r = Math.map(R, 0, 255, 100, 0)
            let g = Math.map(G, 0, 255, 100, 0)
            let b = Math.map(B, 0, 255, 100, 0)

            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, g, 67)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, b, 67)
            PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, r, 67)
        }

        //%block
        //% group="Leds"
        export function ledShowRed(): void {
            setLedRGB(255, 0, 0)
        }

        //%block
        //% group="Leds"
        export function ledShowGreen(): void {
            setLedRGB(0, 255, 0)
        }

        //%block
        //% group="Leds"
        export function ledShowBlue(): void {
            setLedRGB(0, 255, 0)
        }

        //%block
        //% group="Leds"
        export function ledShowWhite(): void {
            setLedRGB(255, 255, 255)
        }

        //%block
        //% group="Leds"
        export function ledOff(): void {
            setLedRGB(0, 0, 0)
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
                DigitalPin.P14,
                DigitalPin.P15,
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
