// turn the lights from green to red based on a condition
import * as fetch from 'node-fetch'
import * as dotenv from 'dotenv'

type Color = {
  h: number
  s: number
  l: number
}

const convertHSL = (color: Color) => {
  const { h, s, l } = color
  return {
    hue: Math.floor((65535 * h) / 360),
    sat: Math.floor(s * 255),
    bri: Math.floor(l * 255),
  }
}

// le colors of the lights
const green = convertHSL({
  h: 109,
  s: 0.7,
  l: 0.7,
})
const red = convertHSL({
  h: 360,
  l: 0.46,
  s: 1,
})

const lightsWeHave = [1, 2]

const lights = (turnOn: boolean) => {
  // base object for each light
  let body = {
    on: turnOn,
  }
  // if (shouldBeGreen) {
  //   body = { ...body, ...green };
  // } else {
  //   body = { ...body, ...red };
  // }

  try {
    for (const light of lightsWeHave) {
      fetch(
        `http://192.168.2.111/api/${process.env.HUE_APP_KEY}/lights/${light}/state`,
        {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  } catch (error) {
    throw new Error(`could not set the lights: ${error}`)
  }
}

export { lights }
