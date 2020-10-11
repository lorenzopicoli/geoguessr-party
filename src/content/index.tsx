import $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
// import '../scss/app.scss'

const PartyModeToggle = (): JSX.Element => (
  <div>
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        name="show-game-settings"
      />
      <span className="checkbox__mark checkbox__mark--dark"></span>
      <span className="game-settings__checkbox-main-label">Party mode</span>
      <br />
      <span className="game-settings__checkbox-sub-label">Tutis tutis</span>
    </label>
  </div>
)

const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
`

const Container = (): JSX.Element => (
  <ContainerStyled>
    <PartyModeToggle />
  </ContainerStyled>
)

const injectHtml: MutationCallback = (_mutationList, observer): void => {
  const copyLink = $('input[name="copy-link"]')
  const startChallengeButton = $('button[data-qa="start-challenge-button"]')

  if (copyLink.length === 0 || startChallengeButton.length === 0) {
    return
  }

  observer.disconnect()

  const root = `
    <div id="gparty-root"></div>
    `

  startChallengeButton.before(root)

  ReactDOM.render(<Container />, document.getElementById('gparty-root'))

  console.log(copyLink)
  console.log(startChallengeButton)
}

const targetNode = document.getElementsByTagName('body')[0]
const config = { attributes: true, childList: true, subtree: true }
const observer = new MutationObserver(injectHtml)

observer.observe(targetNode, config)
console.log($)
