import { motionLights } from './src/motionLights'
import { lcd } from './src/lcd'
import * as five from 'johnny-five'
const board = new five.Board()

board.on('ready', function () {
  // motion sensor to control lights on the desk on pin 13
  motionLights(13)
  lcd()
})
