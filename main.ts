let sos = 0
let distance = 0
let availability = 1
radio.setGroup(11)
radio.setTransmitPower(7)
robotbit.Servo(robotbit.Servos.S1, 90)
basic.pause(200)
robotbit.Servo(robotbit.Servos.S1, 180)
basic.forever(function () {
    distance = sonar.ping(
    DigitalPin.P2,
    DigitalPin.P12,
    PingUnit.Centimeters
    )
    if (distance <= 90) {
        radio.sendValue("Unavailable", 3)
        availability = 2
        sos += 1
    } else if (distance >= 90 && availability == 2) {
        radio.sendValue("Flushing", 2)
        robotbit.Servo(robotbit.Servos.S1, 90)
        availability = 1
        sos = 0
        basic.pause(200)
        robotbit.Servo(robotbit.Servos.S1, 180)
    } else if (distance >= 90) {
        radio.sendValue("Available", 1)
        sos = 0
        availability = 1
    } else {
        radio.sendValue("Error", 4)
    }
    if (sos >= 10) {
        radio.sendNumber(999)
    } else {
        radio.sendNumber(Environment.ReadDust(DigitalPin.P16, AnalogPin.P1))
    }
    basic.pause(1000)
})
