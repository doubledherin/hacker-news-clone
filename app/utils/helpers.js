export function createMarkup(html) {
  return {__html: html};
}

export function getDate(unixTimestamp) {
  return new Date(unixTimestamp * 1000).toLocaleDateString()
}

export function getTime(unixTimestamp) {
  let timeString = new Date(unixTimestamp * 1000).toLocaleTimeString()
  return timeString
}