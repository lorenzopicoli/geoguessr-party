export default interface Player {
  proDate: string
  user: {
    nick: string
    isProUser: boolean
    url: string
    id: string
    stats: {
      gamesPlayed: number
      roundsPlayed: number
      maxGameScore: {
        amount: number
        unit: 'points'
        percentage: number
      }
      averageGameScore: {
        amount: number
        unit: 'points'
        percentage: number
      }
      maxRoundScore: {
        amount: number
        unit: 'points'
        percentage: number
      }
      streakGamesPlayed: number
      maxStreak: number
      maxStreakDate: string
      closestDistance: {
        meters: {
          amount: number
          unit: 'm' | 'yd' | 'km' | 'miles'
        }
        miles: {
          amount: number
          unit: 'm' | 'yd' | 'km' | 'miles'
        }
      }
      averageDistance: {
        meters: {
          amount: number
          unit: 'm' | 'yd' | 'km' | 'miles'
        }
        miles: {
          amount: number
          unit: 'm' | 'yd' | 'km' | 'miles'
        }
      }
      averageTime: string
      timedOutGuesses: number
    }
    emailNotificationSettings: null
    verifiedEmail: boolean
    countryCode: string
  }
  credits: {
    credits: number
    nextCreditAwardInSeconds: number
  }
  email: string
  isEmailChangeable: boolean
  isEmailVerified: boolean
  emailNotificationSettings: {
    sendLeagueNotifications: boolean
    sendDailyChallengeNotifications: boolean
    sendGeneralNotifications: boolean
    lastCampaignSent: string
    unsubscribeToken: null
  }
}
