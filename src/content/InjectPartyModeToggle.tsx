import { getChallengeIdFromUrl } from '@src/utils'
import $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PartyModeToggle from './PartyModeToggle'

const injectToggle: MutationCallback = (_mutationList, observer): void => {
  const challengeLink = $('input[name="copy-link"]').val()
  const startChallengeButton = $('button[data-qa="start-challenge-button"]')

  if (!challengeLink || startChallengeButton.length === 0) {
    return
  }

  observer.disconnect()

  const root = `
    <div id="gparty-root"></div>
    `

  startChallengeButton.before(root)
  const challengeId = getChallengeIdFromUrl(String(challengeLink))

  if (!challengeId) {
    console.error("Couldn't get challengeId from link")
    return
  }
  ReactDOM.render(
    <PartyModeToggle challengeId={challengeId} />,
    document.getElementById('gparty-root'),
  )
}

const targetNode = document.getElementsByTagName('body')[0]
const config = { attributes: true, childList: true, subtree: true }
const observer = new MutationObserver(injectToggle)

observer.observe(targetNode, config)
