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
