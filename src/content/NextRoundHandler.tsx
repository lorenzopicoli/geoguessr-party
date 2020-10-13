import $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const targetNode = document.getElementsByTagName('body')[0]
const config = { attributes: true, childList: true, subtree: true }

const getNextRoundButton = () => $('button[data-qa="close-round-result"]')
const toggleNextRoundButton = (enabled: boolean) =>
  getNextRoundButton()
    .prop('disabled', !enabled)
    .css('background', enabled ? '#568209' : '#56820994')

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
    <div>Waiting other users... TODO @FernandoTeodoro</div>,
    document.getElementById('gparty-root'),
  )
}

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
