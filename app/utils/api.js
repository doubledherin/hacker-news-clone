const hackerNewsBaseUrl = 'https://hacker-news.firebaseio.com/v0/'

export async function getPosts(path) {
  const postType = path === '/' ? 'topstories' : 'newstories'
  const postIds = await getIds(postType)
  return await Promise.all(
    postIds.slice(0, 50).map(
      async postId => await getPost(postId)
    )
  )
}

async function getIds(postType) {
  const response = await fetch(`${hackerNewsBaseUrl}${postType}.json`)
  const data = await response.json()
  return data
}

export async function getPost(id) {
  const response = await fetch(`${hackerNewsBaseUrl}item/${id}.json`)
  const data = await response.json()
  return data
}

export async function getUser(userId) {
  const response = await fetch(`${hackerNewsBaseUrl}user/${userId}.json`)
  const data = await response.json()
  return data
}

