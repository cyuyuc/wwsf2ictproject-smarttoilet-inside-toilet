availability = 0
flushing = 0
distance = 0
radio.set_group(11)
radio.set_transmit_power(7)

def on_forever():
    global distance
    distance = sonar.ping(DigitalPin.P2, DigitalPin.P12, PingUnit.CENTIMETERS)
basic.forever(on_forever)

def on_forever2():
    global availability, flushing
    if distance < 100 and flushing == 1:
        radio.send_value("Unavailable", 3)
        availability = 1
    elif distance > 100 and availability == 1:
        radio.send_value("Flushing", 2)
        availability = 0
        flushing = 1
    else:
        radio.send_value("Available", 1)
    flushing = 0
basic.forever(on_forever2)
