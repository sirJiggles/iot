import { motionLights } from './src/motionLights'
import { ldcScreen } from './src/lcd'
import * as five from 'johnny-five'
const board = new five.Board()

import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

board.on('ready', function () {
  // motion sensor to control lights on the desk on pin 13
  motionLights(13)
  // the lcd screen that shows us the lights
  ldcScreen()
})
