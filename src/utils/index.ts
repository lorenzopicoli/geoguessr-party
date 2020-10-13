// URL must look be formatted like "<host>/challenge[s]/<id>/<anything>", "<host>/challenge[s]/<id>?<anything>"
export const getChallengeIdFromUrl = (url: string): string | null =>
  url.replace(/.*(challenge\/|challenges\/)/, '').replace(/(\/|\?).*/g, '')

// TODO: merge function with getChallengeIdFromUrl
export const getGameIdFromUrl = (url: string): string | null =>
  url.replace(/.*(game\/|games\/)/, '').replace(/(\/|\?).*/g, '')
