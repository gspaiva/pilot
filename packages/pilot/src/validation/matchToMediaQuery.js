/* eslint-disable no-undef */
export const matchToPrint = () => window.matchMedia('print').matches

const match = mediaQuery => window.matchMedia(mediaQuery).matches
/* eslint-enable no-undef */

export default match
