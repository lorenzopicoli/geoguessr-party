export default interface Message {
  togglePartyMode?: {
    isChecked: boolean
    // TODO: change this to challengeId. We should create a helper function that
    // takes a url and extracts the challengeId out of it
    challengeLink: string
  }
  isPartyModeActivated?: {
    challengeId: string
  }
}
