import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'
import * as axios from 'axios'

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener(async (message: Message) => {
  if (message.togglePartyMode) {
    console.log('a')
    console.log(await axios.default.get('https://google.com'))
    console.log('b')
  }
})
