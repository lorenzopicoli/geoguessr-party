import Player from './Player'

export default interface Challenge {
  challenge: {
    token: string
    mapSlug: string
    roundCount: number
    timeLimit: number
    forbidMoving: boolean
    forbidZooming: boolean
    forbidRotating: boolean
    numberOfParticipants: number
    gameMode: string
    challengeType: number
  }
  map: {
    id: string
    name: string
    slug: string
    description: string
    url: string
    playUrl: string
    published: boolean
    banned: boolean
    tags: string[]
    images: {
      backgroundLarge: string
      incomplete: boolean
    }
    bounds: {
      min: {
        lat: number
        lng: number
      }
      max: {
        lat: number
        lng: number
      }
    }
    customCoordinates: null
    coordinateCount: null
    regions: null
    creator: null
    created: string
    createdAt: string
    updated: string
    updatedAt: string
    numFinishedGames: number
    likes: number
    likedByUser: null
    averageScore: number
    avatar: {
      background: string
      decoration: string
      ground: string
      landscape: string
    }
    difficulty: null
    difficultyLevel: number
    highscore: null
    isUserMap: boolean
    highlighted: boolean
    free: boolean
    inExplorerMode: boolean
  }
  creator: Player
}
