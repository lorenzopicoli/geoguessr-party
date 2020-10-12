import styled from 'styled-components'
import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'
import * as React from 'react'
import PartyModeToggle from './PartyModeToggle'
import { fetchMe } from '@src/api'

const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  text-align: left;
`

interface PartyModeContainerProps {
  challengeLink: string
}

export default function Container({
  challengeLink,
}: PartyModeContainerProps): JSX.Element {
  const handleClick = async (isChecked: boolean) => {
    // TODO: We don't want to call this every time the toggle is clicked
    const me = await fetchMe()
    const message: Message = {
      togglePartyMode: {
        isChecked,
        challengeLink,
        playerId: me.user.id,
      },
    }
    browser.runtime.sendMessage(message)
  }
  return (
    <ContainerStyled>
      <PartyModeToggle onClick={handleClick} />
    </ContainerStyled>
  )
}
