import fetch from 'node-fetch'

const statusDesk = {
  status_text: ' At my desk',
  status_emoji: ':desktop_computer:',
  status_expiration: 0,
}

const statusAfk = {
  status_text: ' Not at my desk',
  status_emoji: ':coffee:',
  status_expiration: 0,
}

const setStatus = async (status: { afk: boolean }) => {
  try {
    const result = await fetch(`https://slack.com/api/users.profile.set`, {
      method: 'POST',
      body: JSON.stringify({
        profile: status.afk ? statusAfk : statusDesk,
        user: process.env.SLACK_USER_ID,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Host: 'slack.com',
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    })
    const response = await result.json()
    if (!response.ok) {
      throw new Error(`could not set the slack status: ${response}`)
    }
  } catch (err) {
    throw new Error(`could not set slack status: ${err}`)
  }
}

export { setStatus }
