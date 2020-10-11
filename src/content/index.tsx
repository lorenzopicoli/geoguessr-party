import $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { browser } from 'webextension-polyfill-ts'
// import '../scss/app.scss'

const PartyModeToggle = (props: {
  onClick: () => Promise<void>
}): JSX.Element => (
  <div>
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        name="show-game-settings"
        onClick={props.onClick}
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

const Container = (props: { challengeLink: string }): JSX.Element => (
  <ContainerStyled>
    <PartyModeToggle
      onClick={(): Promise<void> =>
        browser.runtime.sendMessage({ partyLink: props.challengeLink })
      }
    />
  </ContainerStyled>
)

const injectHtml: MutationCallback = (_mutationList, observer): void => {
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

  ReactDOM.render(
    <Container challengeLink={challengeLink.toString()} />,
    document.getElementById('gparty-root'),
  )

  console.log(challengeLink)
  console.log(startChallengeButton)
}

const targetNode = document.getElementsByTagName('body')[0]
const config = { attributes: true, childList: true, subtree: true }
const observer = new MutationObserver(injectHtml)

observer.observe(targetNode, config)
console.log($)
