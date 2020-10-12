import Player from '@src/interfaces/Player'

const baseUrl = 'https://www.geoguessr.com/api/v3'

export const fetchMe = async (): Promise<Player> => {
  return fetch(`${baseUrl}/profiles/`).then(r => r.json())
}
