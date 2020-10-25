// URL must look be formatted like "<host>/challenge[s]/<id>/<anything>", "<host>/challenge[s]/<id>?<anything>"
export const getChallengeIdFromUrl = (url: string): string | null =>
  url.replace(/.*(challenge\/|challenges\/)/, '').replace(/(\/|\?).*/g, '')

// TODO: merge function with getChallengeIdFromUrl
export const getGameIdFromUrl = (url: string): string | null =>
  url.replace(/.*(game\/|games\/)/, '').replace(/(\/|\?).*/g, '')

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * From lodash :)
 * isNil(null)
 * // => true
 *
 * isNil(void 0)
 * // => true
 *
 * isNil(NaN)
 * // => false
 */
export const isNil = (value: unknown): value is null | undefined => {
  return value == null
}
