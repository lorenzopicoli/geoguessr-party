import styled from 'styled-components'
import { browser } from 'webextension-polyfill-ts'
import Message from '@src/interfaces/Message'
import * as React from 'react'
import PartyModeToggle from './PartyModeToggle'

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
  return (
    <ContainerStyled>
      <PartyModeToggle
        onClick={(isChecked: boolean) => {
          const message: Message = {
            togglePartyMode: {
              isChecked,
              challengeLink,
            },
          }
          browser.runtime.sendMessage(message)
        }}
      />
    </ContainerStyled>
  )
}
