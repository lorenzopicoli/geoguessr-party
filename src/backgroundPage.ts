import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'
import { getChallengeIdFromUrl, getGameIdFromUrl, isNil } from './utils'
import * as Backend from './api/Backend'

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
    console.log('user ready state changed', message.changedReady)
  }
})

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
    }
  },
  { urls: ['https://www.geoguessr.com/api/*'] },
)
