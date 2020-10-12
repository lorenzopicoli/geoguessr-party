import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener(async (message: Message) => {
  if (message.togglePartyMode) {
    console.log('Challenge link: ', message.togglePartyMode.challengeLink)
    console.log('Is checked: ', message.togglePartyMode.isChecked)
    console.log('Player ID: ', message.togglePartyMode.playerId)
  }
  if (message.isPartyModeActivated) {
    console.log('a')
    console.log('b')
    return true
  }
})

browser.webRequest.onCompleted.addListener(
  details => {
    const { method, url } = details

    if (method === 'POST' && url.indexOf('api/v3/challenges/') > -1) {
      const challengeId = url.replace(
        'https://www.geoguessr.com/api/v3/challenges/',
        '',
      )
      console.log('starting challenge with Id', challengeId)
    } else if (method === 'POST' && url.indexOf('api/v3/games/') > -1) {
      const gameId = url.replace('https://www.geoguessr.com/api/v3/games/', '')
      console.log('Guessed for game with Id', gameId)
    }
  },
  { urls: ['https://www.geoguessr.com/api/*'] },
)
