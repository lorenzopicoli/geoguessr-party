import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'
import { enableNextRound } from '@src/content/NextRoundHandler'

browser.runtime.onMessage.addListener(async (message: Message) => {
  if (message.enableNextRound) {
    enableNextRound()
  }
})
