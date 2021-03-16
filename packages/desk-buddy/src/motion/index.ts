import * as five from 'johnny-five'
import { lights } from './lights'
import { setStatus } from './slack'

const motion = (pin: string) => {
  // @ts-ignore
  const motionSensor = new five.Motion(pin)
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
