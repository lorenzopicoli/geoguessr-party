import Toggle from '@src/components/Toggle'
import $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { browser } from 'webextension-polyfill-ts'

const getNextRoundButton = () => $('button[data-qa="close-round-result"]')

const toggleNextRoundButton = (enabled: boolean) =>
  getNextRoundButton()
    .prop('disabled', !enabled)
    .css('background', enabled ? '#568209' : '#56820994')
    .prop('value', enabled ? 'PLAY NEXT ROUND' : 'WAITING PLAYERS TO BE READY')

const onClickReady = (enabled: boolean) => {
  // If the user isn't ready we can already toggle off the button even before sending the message
  // to the backend
  if (!enabled) {
    toggleNextRoundButton(false)
  }
  browser.runtime.sendMessage({ changedReady: enabled })
}

const disableButton: MutationCallback = (_mutationList, observer): void => {
  const nextRoundButton = getNextRoundButton()
  if (nextRoundButton.length === 0) {
    return
  }

  observer.disconnect()

  const root = `
    <div id="gparty-root"></div>
    `

  toggleNextRoundButton(false)
  nextRoundButton.before(root)

  ReactDOM.render(
    <div>
      Waiting other users... TODO @FernandoTeodoro
      <br />
      <Toggle
        onClick={onClickReady}
        mainLabel="Ready"
        subLabel="You'll be able to go to the next round once every player is ready"
      />
    </div>,
    document.getElementById('gparty-root'),
  )
}

const targetNode = document.getElementsByTagName('body')[0]
const config = { attributes: true, childList: true, subtree: true }
const observer = new MutationObserver(disableButton)

const startObserver = () => observer.observe(targetNode, config)

export const enableNextRound = () => {
  const nextRoundButton = getNextRoundButton()
  toggleNextRoundButton(true)
  // Start the observer again
  nextRoundButton.on('click', () => {
    console.log('observe')
    startObserver()
  })
}

startObserver()
