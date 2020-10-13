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
  challengeId: string
}

export default function Container({
  challengeId,
}: PartyModeContainerProps): JSX.Element {
  const handleClick = async (isChecked: boolean) => {
    const me = await fetchMe()
    const message: Message = {
      togglePartyMode: {
        isChecked,
        challengeId,
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
