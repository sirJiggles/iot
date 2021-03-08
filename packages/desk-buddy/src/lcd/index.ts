import * as five from 'johnny-five'
import { connect, getStats } from './binance'

const lcd = () => {
  connect()

  const lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [8, 7, 12, 11, 10, 9],
    // backlight: 6,
    rows: 2,
    cols: 20,

    // Options:
    // bitMode: 4 or 8, defaults to 4
    // lines: number of lines, defaults to 2
    // dots: matrix dimensions, defaults to "5x8"
  })

  // Tell the LCD you will use these characters:
  lcd.useChar('heart')

  lcd.clear().print('Gareth Rocks')
  lcd.cursor(1, 0)

  // Line 2: I <3 johnny-five
  // lcd.print('I').write(7).print(' johnny-five');
  // can now be written as:
  lcd.print('I :heart: Lisa')

  // this.wait(3000, function () {
  //   screen.clear().cursor(0, 0).print('I :check::heart: 2 :duck: :)');
  // });

  // this.repl.inject({
  //   screen: lcd,
  // });
}

export { lcd }
