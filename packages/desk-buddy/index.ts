import { motion } from './src/motion'
import { ldcScreen } from './src/lcd'
import * as five from 'johnny-five'
import { RaspiIO } from 'raspi-io'

const board = new five.Board({
  io: new RaspiIO(),
})

import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

board.on('ready', function () {
  // motion sensor on pin 17
  motion('GPIO4')
  // the lcd screen that shows us the lights
  ldcScreen()
})
