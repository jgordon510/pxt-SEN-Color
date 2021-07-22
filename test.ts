// Calibrate sensor when button A is pressed
input.onButtonPressed(Button.A, function () {
    SENColor.calibrate()
})

// Retreive all 3 color components and print them to the console
basic.forever(function() {
    serial.writeLine("R: " + SENColor.getColor(color.red))
    serial.writeLine("G: " + SENColor.getColor(color.green))
    serial.writeLine("B: " + SENColor.getColor(color.blue))
    basic.pause(500)
})
