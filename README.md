# pxt-robotcar

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

---

## TODO

- [X] Add a reference for your blocks here
- [X] Add "icon.png" image (300x200) in the root folder
- [X] Add "- beta" to the GitHub project description if you are still iterating it.
- [ ] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [X] On GitHub, create a new file named LICENSE. Select the MIT License template.
- [ ] Get your package reviewed and approved https://makecode.microbit.org/extensions/approval

Read more at https://makecode.microbit.org/extensions

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

