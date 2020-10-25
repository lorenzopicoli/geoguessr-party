import Message from '@src/interfaces/Message'
import $ from 'jquery'
import { browser } from 'webextension-polyfill-ts'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import PartyModeMessage from './PartyModeMessage'
import { getChallengeIdFromUrl } from '@src/utils'

const onDocumentReady = async () => {
  const pathName = window.location.pathname
  const url = window.location.href
  const joinChallengeButton = $('button[data-qa="join-challenge-button"]')

  // If it isn't the start challenge screen OR we couldn't find the "Start game" button, do nothing
  if (!pathName.startsWith('/challenge/') || joinChallengeButton.length === 0) {
    return
  }

  const challengeId = getChallengeIdFromUrl(url)

  if (!challengeId) {
    return
  }

  const message: Message = {
    isPartyModeActivated: {
      challengeId,
    },
  }
  try {
    const isPartyModeActivated = await browser.runtime.sendMessage(message)
    // If party mode is not activated, do nothing
    if (!isPartyModeActivated) {
      return
    }
  } catch (e) {
    console.log('ahhh', e)
  }

  const root = `
    <div id="gparty-root"></div>
    `

  joinChallengeButton.before(root)

  ReactDOM.render(<PartyModeMessage />, document.getElementById('gparty-root'))
}

$(onDocumentReady)
