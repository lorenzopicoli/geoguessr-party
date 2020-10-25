import Game from '@src/interfaces/Game'
import Player from '@src/interfaces/Player'

const baseUrl = 'https://www.geoguessr.com/api/v3'

export const fetchMe = async (): Promise<Player> => {
  const response = await fetch(`${baseUrl}/profiles/`)
  return response.json()
}

// The "game" returned here will be missing some fields. Make sure to take the `token`
// property and call `fetchGame` if you want round/guess information
export const fetchChallengeGame = async (
  challengeId: string,
): Promise<Game> => {
  const response = await fetch(`${baseUrl}/challenges/${challengeId}/game`)
  return response.json()
}

export const fetchGame = async (gameId: string): Promise<Game> => {
  const response = await fetch(`${baseUrl}/games/${gameId}`)
  return response.json()
}
