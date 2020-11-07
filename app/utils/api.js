const hackerNewsBaseUrl = 'https://hacker-news.firebaseio.com/v0/'

export async function getTopPosts() {
  const ids = await getTopPostIds()
  return await Promise.all(
    ids.slice(0, 50).map(
      async id => await getPost(id)
  ))
}

async function getTopPostIds() {
  const response = await fetch(`${hackerNewsBaseUrl}topstories.json`)
  const data = await response.json()
  return data
}

export async function getNewPosts() {
  const ids = await getNewPostIds()
  return await Promise.all(
    ids.slice(0, 50).map(
      async id => await getPost(id)
  ))
}


async function getNewPostIds() {
  const response = await fetch(`${hackerNewsBaseUrl}newstories.json`)
  const data = await response.json()
  return data
}

async function getPost(id) {
  const response = await fetch(`${hackerNewsBaseUrl}item/${id}.json`)
  const data = await response.json()
  return data
}

