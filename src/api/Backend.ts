export const baseUrl = 'http://geoguessr-party.caprover.diogocarmo.me/api'
export const baseSocketUrl = 'ws://geoguessr-party.caprover.diogocarmo.me'

export const createChallenge = async (
  challengeId: string,
): Promise<unknown> => {
  const url = `${baseUrl}/challenge`

  const body = {
    challenge: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      geoguessr_id: challengeId,
    },
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return response.json()
}

export const deleteChallenge = async (challengeId: string): Promise<void> => {
  const url = `${baseUrl}/challenge/${challengeId}`

  await fetch(url, {
    method: 'DELETE',
  })
}

export const getChallenge = async (challengeId: string): Promise<void> => {
  const url = `${baseUrl}/challenge/${challengeId}`

  const response = await fetch(url)
  if (response.status === 404) {
    throw new Error('Challenge not found')
  }
  return response.json()
}
