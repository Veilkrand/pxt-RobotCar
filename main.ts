
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

PCA9685.init(67, 0)
//led.enable(false)

/**
 * RobotCar_Keyestudio blocks
 */
//% weight=100 color=#0fbc11 icon="\uf63c"
//icon = "\uf63c"
namespace RobotCar_Keyestudio {


    /**
     * Move the robot in a straight line, forward or backawards
     * @param speed Magnitude of the motor speed [-100, 100], negative number is backward motor rotation.
     */
    //% block
    export function move(speed: number): void {
        rightMotor(speed)
        leftMotor(speed)
    }

    /**
     * Spin the robot
     * @param speed Magnitude of the spin for motor speed [-100, 100]; 100 is full right hand spin.
     */
    //% block
    export function spin(speed: number): void {
        rightMotor(-speed)
        leftMotor(speed)
    }

    /**
     * Differential steering 2WD 
     * @param speed Magnitude of the motors speed [0, 100].
     * @param steering Magnitude of the steering [-100, 100]; 100 is turning right with right wheel stopped
     */
    //% block
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

    //%block
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
