import styled from 'styled-components'
import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'
import * as React from 'react'
import * as GeoguessrApi from '@src/api/Geoguessr'
import Toggle from '@src/components/Toggle'

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
  const onClick = async (isChecked: boolean) => {
    const me = await GeoguessrApi.fetchMe()
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
      <Toggle
        onClick={onClick}
        mainLabel="Party mode"
        subLabel="All rounds will be automatically synced for every user in this
          challenge"
      />
    </ContainerStyled>
  )
}
