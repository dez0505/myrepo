export default (type, id, title, url, time, secuAbbr) => {
  const href = `@redirect=${type}&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&CreatedDate=${time}&id=${id}&secuAbbr=${encodeURIComponent(secuAbbr)}`
  console.log(href)
  window.location.href = href
}
export function targetStock (e,item) {
  e.stopPropagation()
  window.location.href = '@stk=' + item
}
