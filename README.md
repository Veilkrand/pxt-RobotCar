# pxt-robotcar
Easy extension to control the Keyestudio Robot Car for micro:bit. 

https://wiki.keyestudio.com/Ks0426_keyestudio_Micro:bit_Mini_Smart_Robot_Car_Kit_V2

## Block Reference

### Motors

#### move(speed: number)
```||move||``` the robot in a straight line, forward or backwards.

@param {number} speed - Magnitude of the motor speed [-100, 100], negative number is backward motor rotation.

```blocks
// Move forward at 50% speed for 1 second
RobotCar_Keyestudio.Motors.move(50)
basic.pause(1000)
```

#### spin(speed: number)
```||spin||``` the robot.

@param {number} speed - Magnitude of the spin for motor speed [-100, 100]; 100 is full right hand spin.

```blocks
// Spin at 50% speed for 1 second
RobotCar_Keyestudio.Motors.spin(50)
basic.pause(1000)
```

#### steer(speed: number, steering: number)
```||steer||``` for differential steering 2WD.

@param {number} speed - Magnitude of the motors speed [0, 100].

@param {number} steering - Magnitude of the steering [-100, 100]; 100 is turning right with right wheel stopped

```blocks
// steer forward at 50% speed and 30% steering for 1 second
RobotCar_Keyestudio.Motors.steer(50, 30)
basic.pause(1000)
```

### Leds

#### setRGB(R: number, G: number, B: number)
```||setRGB||``` to control the front leds colors with RGB values.

@param {number} R - Red light intensity [0,255]

@param {number} G - Green light intensity [0,255]

@param {number} B - Blue light intensity [0,255]

```blocks
// Set leds to red for 2 seconds then switch off
RobotCar_Keyestudio.Leds.setRGB(255, 0, 0)
basic.pause(2000)
RobotCar_Keyestudio.Leds.setRGB(0, 0, 0)
```

### IR Sensors

```blocks
// Show arrow icons depending on the sensor blocked
while (true) {
    
    if ( RobotCar_Keyestudio.IrSensors.isRightBlocked() ) {
        basic.showArrow(2)
    } else if ( RobotCar_Keyestudio.IrSensors.isLeftBlocked() ) {
        basic.showArrow(6)
    } else {
        basic.showArrow(0)
    }
}
```

#### isLeftBlocked()
```||isLeftBlocked||``` Return true if the sensor is blocked by an obstacle, false otherwise.

@return {boolean} is sensor blocked?


#### isRightBlocked()
```||isRightBlocked||``` Return true if the sensor is blocked by an obstacle, false otherwise.

@return {boolean} is sensor blocked?

### Sonar

#### ping()
```||ping||``` the sonar and return a median-filtered distance result in centimeters.

@return {number} distance in cm to obstacle

```blocks
// Show an icon depending on the distance from sensor
let distance = 0
basic.forever(function () {
    distance = RobotCar_Keyestudio.Sonar.ping()
    if (distance < 10) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
    
})
```

---

## License
MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
