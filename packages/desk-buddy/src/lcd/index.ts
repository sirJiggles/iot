import * as five from 'johnny-five'
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
  lcd.useChar('arrowsw')
  lcd.useChar('arrowne')
  lcd.useChar('euro')
}

const getData = async () => {
  // start polling for the stats @TODO
  const { stats, balance } = await getStats(['BTC', 'ENJ'])

  lcd.clear().print(`:euro:${balance.toFixed(2)}`)
  lcd.cursor(1, 0)
  lcd.print(stats)
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
