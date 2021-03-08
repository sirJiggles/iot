import * as five from 'johnny-five'
import { lights } from './lights'

const motionLights = (pinNumber = 1) => {
  const motionSensor = new five.Motion(pinNumber)

  motionSensor.on('motionstart', () => {
    lights(true)
  })
  motionSensor.on('motionend', () => {
    lights(false)
  })
}

export { motionLights }
