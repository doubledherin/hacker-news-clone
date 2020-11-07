const hackerNewsBaseUrl = 'https://hacker-news.firebaseio.com/v0/'

export function getTopPosts() {
  return fetch(`${hackerNewsBaseUrl}topstories.json`)
    .then(res => res.json()).then(data => {
      if (!data) {
        throw new Error('No data return from Hacker News API')
      }
      return data
    })
}

export function getPost(id) {
  return fetch(`${hackerNewsBaseUrl}item/${id}.json`)
    .then(res => res.json()).then(data => {
      if (!data) {
        throw new Error('No post return from Hacker News API')
      }
      return data
    })
}
