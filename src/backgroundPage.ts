import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'
import { getChallengeIdFromUrl, getGameIdFromUrl, isNil } from './utils'
import * as Backend from './api/Backend'
import * as Geoguessr from './api/Geoguessr'
import { Channel, Presence, Socket } from 'phoenix'

const socket = new Socket(`${Backend.baseSocketUrl}/socket`)
socket.connect()

let presences: any[] = []
let channel: Channel | null = null

const lessgo = async () => {
  const message: Message = {
    enableNextRound: true,
  }
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })
  if (tabs[0].id) {
    await browser.tabs.sendMessage(tabs[0].id, message)
  }
}

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener(async (message: Message) => {
  console.log('Background page message', message)
  if (!isNil(message.togglePartyMode)) {
    // TODO: handle errors
    const { challengeId } = message.togglePartyMode
    message.togglePartyMode.isChecked
      ? await Backend.createChallenge(challengeId)
      : await Backend.deleteChallenge(challengeId)
  }
  if (!isNil(message.isPartyModeActivated)) {
    // TODO: Handle response
    try {
      await Backend.getChallenge(message.isPartyModeActivated.challengeId)
      return true
    } catch (e) {
      return false
    }
  }
  if (!isNil(message.changedReady)) {
    channel
      ?.push('shout', {}, 10000)
      .receive('ok', msg => console.log('Ready ok', msg))
      .receive('error', reasons => console.log('Ready failed', reasons))
      .receive('timeout', () => console.log('Ready timed out...'))
    channel?.on('shout', () => lessgo())
  }
})

browser.webRequest.onCompleted.addListener(
  async details => {
    const { method, url } = details

    if (
      method === 'POST' &&
      url.indexOf('api/v3/challenges/') > -1 &&
      url.indexOf('/invite') === -1
    ) {
      const challengeId = getChallengeIdFromUrl(url)
      console.log('starting challenge with Id', challengeId)
      const player = await Geoguessr.fetchMe()

      channel = socket.channel(`challenges:${challengeId}`, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        player: { geoguessr_id: player.user.id },
      })

      const presence = new Presence(channel)
      presence.onSync(() => console.log(presence.list()))

      channel.join()
    } else if (method === 'POST' && url.indexOf('api/v3/games/') > -1) {
      const gameId = getGameIdFromUrl(url)
      console.log('Guessed for game with Id', gameId)
    }
  },
  { urls: ['https://www.geoguessr.com/api/*'] },
)
