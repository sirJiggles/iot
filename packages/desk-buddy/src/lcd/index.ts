import * as five from 'johnny-five'
import * as scroll from 'lcd-scrolling'
import { setInterval } from 'timers'
import { connect, getStats } from './binance'

let lcd: five.LCD

const initLcd = () => {
  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    pins: [7, 6, 5, 4, 3, 2],
    // backlight: 6,
    rows: 2,
    cols: 20,

    // Options:
    // bitMode: 4 or 8, defaults to 4
    // lines: number of lines, defaults to 2
    // dots: matrix dimensions, defaults to "5x8"
  })

  // Tell the LCD you will use these characters:
  // lcd.useChar('arrowsw')
  // lcd.useChar('arrowne')
  lcd.useChar('euro')

  scroll.setup({
    lcd,
    // Optional parameters defaults
    // debug: false, - true will enable console.log()
    char_length: 16,
    // row: 2, - Number of rows on your LCD
    // firstCharPauseDuration: 4000, - Duration of the pause before your text start scrolling. Value in ms
    // lastCharPauseDuration: 1000, - Duration to wait before restarting the animation
    scrollingDuration: 1200,
    full: false,
    // full: true - Extend text with white space to be animated out of the screen completely
  })
}

const getData = async () => {
  const { stats, balance } = await getStats(['ANKR', 'LUNA', 'CHZ'])

  // lcd.clear()
  scroll.clear()
  scroll.line(0, `:euro:${balance.toFixed(2)}`)
  scroll.line(1, stats)
  // lcd.cursor(0, 0)
  // lcd.clear().print(`:euro:${balance.toFixed(2)}`)
  // lcd.cursor(1, 0)
  // lcd.autoscroll().print(stats)
}

const ldcScreen = async () => {
  // set up the lcd screen
  initLcd()
  // connect to binance
  await connect()

  // get the data once first
  getData()

  // get the stats every few mins
  setInterval(getData, 120000)
}

export { ldcScreen }
