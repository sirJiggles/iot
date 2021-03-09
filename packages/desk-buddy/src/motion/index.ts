import * as five from 'johnny-five'
import { lights } from './lights'
import { setStatus } from './slack'

const motion = (pinNumber = 1) => {
  const motionSensor = new five.Motion(pinNumber)
  let wasMoving = false

  motionSensor.on('motionstart', () => {
    if (!wasMoving) {
      wasMoving = true
      lights(wasMoving)
      setStatus({ afk: !wasMoving })
    }
  })
  motionSensor.on('motionend', () => {
    if (wasMoving) {
      wasMoving = false
      lights(wasMoving)
      setStatus({ afk: !wasMoving })
    }
  })
}

export { motion }
