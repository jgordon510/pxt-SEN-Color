enum color {
  //%block="Red"
  red,
  //%block="Green"
  green,
  //%block="Blue"
  blue
}


/**
 * SEN-Color Block
 */
//% color="#275C6B" icon="\uf1fb" weight=95 block="SEN-Color"
namespace SENColor {
  /*
   * default pin settings
   */
  let s0 = DigitalPin.P15
  let s1 = DigitalPin.P1
  let s2 = DigitalPin.P8
  let s3 = DigitalPin.P12
  let output = DigitalPin.P2

  /*
   * other defaults
   */
  let pulseCounter: number = 0
  let frequency = 50
  let redFactor: number
  let greenFactor: number
  let blueFactor: number
  let calibration = false

  function resetPulseCounter(): void {
    pulseCounter = 0
    basic.pause(frequency)
  }

  /*
   * configure the pins where the SEN-Color is connected to
   */
  //%block="Set sensor pins to S0:%S0| S1:%S1| S2:%S2| S3:%S3| OUT:%OUT"
  export function setPins(S0: DigitalPin, S1: DigitalPin, S2: DigitalPin, S3: DigitalPin, OUT: DigitalPin): void {
    s0 = S0
    s1 = S1
    s2 = S2
    s3 = S3
    output = OUT
  }

  /*
   * calibrate sensor
   */
  //%block="Calibrate sensor"
  export function calibrate(): void {
    serial.writeLine("SEN-Color calibration started")
    calibration = false

    // Set output frequencyuency scale to 2%
    pins.digitalWritePin(s0, 0)
    pins.digitalWritePin(s1, 1)

    pins.onPulsed(output, PulseValue.Low, function() {
      pulseCounter++
    })

    // Red calibration
    pins.digitalWritePin(s2, 0)
    pins.digitalWritePin(s3, 0)
    resetPulseCounter()
    redFactor = 255 / pulseCounter

    // Green calibration
    pins.digitalWritePin(s2, 1)
    pins.digitalWritePin(s3, 1)
    resetPulseCounter()
    greenFactor = 255 / pulseCounter

    // Blue calibration
    pins.digitalWritePin(s2, 0)
    pins.digitalWritePin(s3, 1)
    resetPulseCounter()
    blueFactor = 255 / pulseCounter

    calibration = true
    serial.writeLine("SEN-Color calibration finished")

  }
  /*
   * Returns 'Red', 'Green', or 'Blue' 
   * if one of them is prominent
   * otherwise returns '-'
   */
  //%block="Get R, G, or B"
  export function getPrimary(): string {
    let r = SENColor.getColor(0)
    let g = SENColor.getColor(1)
    let b = SENColor.getColor(2)
    let ave = (r + g + b) / 3
    const lim = 1.5
    if (r > ave * lim) return 'Red'
    if (g > ave * lim) return 'Green'
    if (r > ave * lim) return 'Blue'
    return '-'
  }
  /*
   * Returns the color components
   */
  //%block="Measure %color color"
  export function getColor(color: color): number {
    if (calibration) {
      let colorValue: number
      switch (color) {
        case 0:
          // Red measurement
          pins.digitalWritePin(s2, 0)
          pins.digitalWritePin(s3, 0)
          resetPulseCounter()
          colorValue = pulseCounter * redFactor
          break
        case 1:
          // Green measurement
          pins.digitalWritePin(s2, 1)
          pins.digitalWritePin(s3, 1)
          resetPulseCounter()
          colorValue = pulseCounter * greenFactor
          break
        case 2:
          // Blue measurement
          pins.digitalWritePin(s2, 0)
          pins.digitalWritePin(s3, 1)
          resetPulseCounter()
          colorValue = pulseCounter * blueFactor
          break
      }

      return (colorValue <= 255) ? colorValue : 255

    }
    else {
      return null
    }
  }
}
