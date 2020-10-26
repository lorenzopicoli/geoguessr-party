import React from 'react'
import PlayersListCard from './index'
export default {
  title: 'PlayersListCard',
  component: PlayersListCard,
}

const players = [
  { name: 'Vitor Azevedo', score: 25000, ready: true },
  { name: 'Lorenzo Piccoli', score: 23034, ready: true },
  { name: 'Diogo Carmo', score: 22011, ready: false },
  { name: 'Elciney Junior', score: 12230, ready: true },
  { name: 'Fernando Teodoro', ready: false },
]

export const Basic = () => <PlayersListCard players={players} />
