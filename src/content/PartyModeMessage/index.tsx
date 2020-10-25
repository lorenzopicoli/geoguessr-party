import styled from 'styled-components'
import * as React from 'react'

const ContainerStyled = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  text-align: left;
`

export default function Container(): JSX.Element {
  return (
    <ContainerStyled>
      <div className="challenge-page__settings" style={{ marginTop: 0 }}>
        Party mode is activated for this game! All rounds will be automatically
        synced
      </div>
    </ContainerStyled>
  )
}
