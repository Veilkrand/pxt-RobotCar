{

    // Show leds colors and spin for 2 secs
    RobotCar_Keyestudio.Leds.showRed()
    RobotCar_Keyestudio.Motors.spin(50)
    basic.pause(2000)
    RobotCar_Keyestudio.Leds.setRGB(255, 255, 0)
    basic.pause(1000)
    RobotCar_Keyestudio.Leds.showGreen()
    basic.pause(1000)
    RobotCar_Keyestudio.Leds.showBlue()
    basic.pause(1000)
    RobotCar_Keyestudio.Leds.showWhite()

    /** 
     * Keep distance and avoid obstacle
     * 
     **/
    while (true) {
        // Keep distance to obstacle
        let distance = RobotCar_Keyestudio.Sonar.ping()
        if (distance > 10) {
            RobotCar_Keyestudio.Motors.move(50)

            // Check IR sensors
            if (RobotCar_Keyestudio.IrSensors.isLeftBlocked()) {
                RobotCar_Keyestudio.Motors.steer(30, 50)
                basic.pause(500)
            } else if (RobotCar_Keyestudio.IrSensors.isRightBlocked()) {
                RobotCar_Keyestudio.Motors.steer(-30, 50)
                basic.pause(500)
            }

        } else if (distance < 8) {
            RobotCar_Keyestudio.Motors.move(-50)
        } else {
            RobotCar_Keyestudio.Motors.stop()
        }


    }


}