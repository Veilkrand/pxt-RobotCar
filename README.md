# pxt-robotcar
Easy extension to control the Keyestudio Robot Car for micro:bit.

https://wiki.keyestudio.com/Ks0426_keyestudio_Micro:bit_Mini_Smart_Robot_Car_Kit_V2

## Block Reference

### move(speed: number)
Move the robot in a straight line, forward or backawards.

@param speed Magnitude of the motor speed [-100, 100], negative number is backward motor rotation.

### spin(speed: number)
Spin the robot.

@param speed Magnitude of the spin for motor speed [-100, 100]; 100 is full right hand spin.

### steer(speed: number, steering: number)
Differential steering 2WD.

@param speed Magnitude of the motors speed [0, 100].

@param steering Magnitude of the steering [-100, 100]; 100 is turning right with right wheel stopped

## License
MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
