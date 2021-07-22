# MakeCode Package for the SEN-Color (TCS3200 Color Sensor).

This library provides a Microsoft Makecode package for the Joy-IT SEN-Color TCS3200 color sensor.
See https://joy-it.net/products/SEN-Color for more details.

## Connection

By default the color sensors is connected as follows:

| SEN-Color     | Micro:bit                 |
| ------------- |:--------------------------|
| VCC           | 3V                        |
| GND           | GND                       |
| OE            | NC (Not connected)        |
| LED           | GND (on the color sensor) |
| GND           | LED (on the color sensor) |
| S0            | P15                       |
| S1            | P1                        |
| S2            | P8                        |
| S3            | P12                       |
| OUT           | P2                        |

But the pin assignment of S0, S1, S2, S3 and OUT can be changed to any digital pins by using:

```typescript
// Set pin assignment
SENColor.setPins(DigitalPin.P15, DigitalPin.P1, DigitalPin.P8, DigitalPin.P12, DigitalPin.P2)
```

## Calibration

The sensor needs to be calibrated before each use. This is done by using the calibration function and holding the sensor in front of a white surface (e.g. a white sheet of paper).
In the following example the calibration function is mapped to the "A"-button of the Micro:bit. This way the calibration function is always accessible.

```typescript
// Calibrate sensor when pressing the A button on the Micro:bit
input.onButtonPressed(Button.A, function () {
    SENColor.calibrate()
})
```

## Measuring colors

The color component of each color can be measured. The function expects the component that you want to measure (red, green or blue) and returns the value as a numeric value.

```typescript
// Retreive all 3 color components and print them to the console
serial.writeLine("R: " + SENColor.getColor(color.red))
serial.writeLine("G: " + SENColor.getColor(color.green))
serial.writeLine("B: " + SENColor.getColor(color.blue))
```

## Supported targets

* for PXT/microbit

## License

MIT
