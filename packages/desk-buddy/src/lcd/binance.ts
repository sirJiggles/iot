import Binance from 'binance-api-node'
import * as dotenv from 'dotenv'

let client;

const getStats = async (coins) => {
  try {
    const info = await client.accountInfo();
    console.log(info);
    info.map(())
  } catch (error) {
    throw new Error(`could not get account info: ${error}`);
  }
};

const stats = async () => {
  try {
    const btc = await client.dailyStats({ symbol: 'BTC' });
    const enjin = await client.dailyStats({ symbol: 'ENJ' });

    return {
      enj: enjin.priceChangePercent,
      btc: btc.priceChangePercent,
    };
  } catch (error) {
    throw new Error('could not get the stats for the coinz');
  }
};

const connect = async () => {
  client = Binance({
    apiKey: process.env.BINANCE_KEY,
    apiSecret: process.env.BINANCE_SECRET,
  });
};

export {connect, getStats}