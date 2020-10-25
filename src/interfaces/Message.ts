export default interface Message {
  togglePartyMode?: {
    isChecked: boolean
    challengeId: string
    playerId: string
  }
  isPartyModeActivated?: {
    challengeId: string
  }
  enableNextRound?: true
  changedReady?: boolean
}
