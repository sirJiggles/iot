import Binance, {
  Binance as BinanceClient,
  DailyStatsResult,
} from 'binance-api-node'

type CoinStats = {
  stats: string
  balance: number
}

let client: BinanceClient

const getStats = async (coins: Array<string>): Promise<CoinStats> => {
  const percentageChanges = []

  try {
    const accountInfo = await client.accountInfo()

    // check for the balances we care about
    const balances = accountInfo.balances.filter((balance) =>
      coins.includes(balance.asset),
    )

    let balance = 0

    // go through each coin and get the daily stats of it
    for (const coin of coins) {
      const { priceChangePercent, lastPrice } = (await client.dailyStats({
        symbol: `${coin}USDT`,
      })) as DailyStatsResult

      percentageChanges.push(
        `${coin}${parseFloat(priceChangePercent).toFixed(2)}`,
      )

      const amountWeHave = balances.filter(
        (balance) => balance.asset === coin,
      )[0].free

      // add the value of the coin we care about to the balance
      balance += parseFloat(amountWeHave) * parseFloat(lastPrice)
    }

    // convert the USD balance to EUR
    const eurData = (await client.dailyStats({
      symbol: `EURUSDT`,
    })) as DailyStatsResult

    balance = balance / parseFloat(eurData.lastPrice)

    return {
      stats: percentageChanges.join(' '),
      balance,
    }
  } catch (error) {
    throw new Error(`could not get info from binance: ${error}`)
  }
}

const connect = async () => {
  client = Binance({
    apiKey: process.env.BINANCE_KEY,
    apiSecret: process.env.BINANCE_SECRET,
  })
}

export { connect, getStats }
