import Game from '@src/interfaces/Game'
import Player from '@src/interfaces/Player'

const baseUrl = 'https://www.geoguessr.com/api/v3'

export const fetchMe = async (): Promise<Player> => {
  return fetch(`${baseUrl}/profiles/`).then(r => r.json())
}

// The "game" returned here will be missing some fields. Make sure to take the `token`
// property and call `fetchGame` if you want round/guess information
export const fetchChallengeGame = async (
  challengeId: string,
): Promise<Game> => {
  return fetch(`${baseUrl}/challenges/${challengeId}/game`).then(r => r.json())
}

export const fetchGame = async (gameId: string): Promise<Game> => {
  return fetch(`${baseUrl}/games/${gameId}`).then(r => r.json())
}
