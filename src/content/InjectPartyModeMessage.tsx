import Message from '@src/interfaces/Message'
import $ from 'jquery'
import { browser } from 'webextension-polyfill-ts'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import PartyModeMessage from './PartyModeMessage'

const onDocumentReady = async () => {
  const pathName = window.location.pathname
  const joinChallengeButton = $('button[data-qa="join-challenge-button"]')
  console.log('pathName', pathName.startsWith('/challenge/'))
  console.log('joinChallengeButton', joinChallengeButton)
  // If it isn't the start challenge screen OR we couldn't find the "Start game" button, do nothing
  if (!pathName.startsWith('/challenge/') || joinChallengeButton.length === 0) {
    return
  }

  const challengeId = pathName.replace('/challenge/', '')
  const message: Message = {
    isPartyModeActivated: {
      challengeId,
    },
  }
  const isPartyModeActivated = await browser.runtime.sendMessage(message)

  // If party mode is not activated, do nothing
  if (!isPartyModeActivated) {
    return
  }

  const root = `
    <div id="gparty-root"></div>
    `

  joinChallengeButton.before(root)

  ReactDOM.render(<PartyModeMessage />, document.getElementById('gparty-root'))
}

$(onDocumentReady)
