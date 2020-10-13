import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'
import { getChallengeIdFromUrl, getGameIdFromUrl } from './utils'

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener(async (message: Message) => {
  if (message.togglePartyMode) {
    console.log('Challenge Id: ', message.togglePartyMode.challengeId)
    console.log('Is checked: ', message.togglePartyMode.isChecked)
    console.log('Player ID: ', message.togglePartyMode.playerId)
  }
  if (message.isPartyModeActivated) {
    console.log('a')
    console.log('b')
    return true
  }
})

const test = () =>
  setTimeout(async () => {
    try {
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
    } catch (e) {
      console.log(e)
    }
  }, 3000)
browser.webRequest.onCompleted.addListener(
  details => {
    const { method, url } = details

    if (
      method === 'POST' &&
      url.indexOf('api/v3/challenges/') > -1 &&
      url.indexOf('/invite') === -1
    ) {
      const challengeId = getChallengeIdFromUrl(url)
      console.log('starting challenge with Id', challengeId)
    } else if (method === 'POST' && url.indexOf('api/v3/games/') > -1) {
      const gameId = getGameIdFromUrl(url)
      console.log('Guessed for game with Id', gameId)
      test()
    }
  },
  { urls: ['https://www.geoguessr.com/api/*'] },
)
