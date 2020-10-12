export default interface Game {
  token: string
  type: 'challenge'
  mode: 'standard'
  state: 'started'
  roundCount: number
  timeLimit: number
  forbidMoving: boolean
  forbidZooming: boolean
  forbidRotating: boolean
  map: string
  mapName: string
  panoramaProvider: number
  bounds: {
    min: { lat: number; lng: number }
    max: { lat: number; lng: number }
  }
  round: number
  rounds: {
    lat: number
    lng: number
    panoId: null
    heading: number
    pitch: number
    zoom: number
    countryCode: null
  }[]
  player: {
    totalScore: {
      amount: number
      unit: 'points'
      percentage: number
    }
    totalDistance: {
      meters: {
        amount: number
        unit: 'km'
      }
      miles: {
        amount: number
        unit: 'miles'
      }
    }
    totalStreak: number
    guesses: {
      lat: number
      lng: number
      timedOut: boolean
      timedOutWithGuess: boolean
      roundScore: {
        amount: number
        unit: 'points'
        percentage: number
      }
      distance: {
        meters: { amount: number; unit: 'km' }
        miles: { amount: number; unit: 'miles' }
      }
      countryCode: null
    }[]
    isLeader: boolean
    currentPosition: number
    pin: { url: string; anchor: 'center-center'; isDefault: boolean }
    newBadges: []
    explorer: null
    id: string
    nick: string
  }
}
