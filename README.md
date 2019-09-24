# pxt-robotcar
Easy extension to control the Keyestudio Robot Car for micro:bit. 

https://wiki.keyestudio.com/Ks0426_keyestudio_Micro:bit_Mini_Smart_Robot_Car_Kit_V2

## Block Reference

### Motors

#### move(speed: number)
Move the robot in a straight line, forward or backawards.

@param {number} speed - Magnitude of the motor speed [-100, 100], negative number is backward motor rotation.

#### spin(speed: number)
Spin the robot.

@param {number} speed - Magnitude of the spin for motor speed [-100, 100]; 100 is full right hand spin.

#### steer(speed: number, steering: number)
Differential steering 2WD.

@param {number} speed - Magnitude of the motors speed [0, 100].

@param {number} steering - Magnitude of the steering [-100, 100]; 100 is turning right with right wheel stopped

### Leds

#### setRGB(R: number, G: number, B: number)
Control the front leds colors with RGB values.

@param {number} R - Red light intensity [0,255]

@param {number} G - Green light intensity [0,255]

@param {number} B - Blue light intensity [0,255]


### IR Sensors

#### isLeftBlocked()
Return true if the sensor is blocked by an obstacle, false otherwise.

@return {boolean} is sensor blocked?

#### isRightBlocked()
Return true if the sensor is blocked by an obstacle, false otherwise.

@return {boolean} is sensor blocked?

### Sonar

#### ping()
Ping the sonar and return a median-filtered distance result in centimeters.

@return {number} distance in cm to obstacle

---

## License
MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
