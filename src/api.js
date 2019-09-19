import axios from 'axios';

const request = axios.create({
  baseURL: 'https://hw-nc-news.herokuapp.com/api'
})

// export const getTopics = (aysnc?) => {
//   const { data } = await request.get('/topics')
//   console.log(data.topics)
// }

export const getTopics = () => {
  return request.get('/topics').then(({ data }) => {
    return data.topics
  })
}

// export const getArticles = (aysnc topic) => {
//   const { data } = await request.get('/articles', { params: { topic } })
//   return data.articles
// }

export const getArticles = (topic, author, sort_by, order) => {
  return request.get('/articles', { params: { topic, author, sort_by, order } }).then(({ data }) => {
    return data.articles
  })
}

export const getUserByUsername = (username) => {
  return request.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  })
}

export const getAllUsers = () => {
  return request.get('/users').then(({ data }) => {
    return data.users
  })
}

export const getTopFive = (topic, sort_by) => {
  return request.get('/articles', { params: { topic, sort_by } }).then(({ data }) => {
    return data.articles
  })
}

export const sendNewArticle = (title, topic, body, loggedInUser) => {
  return request.post('/articles', {
    title: title,
    topic: topic,
    username: loggedInUser,
    body: body
  }).then(({ data }) => {
    return data.article
  })
}

export const getSelectedArticle = (article_id) => {
  return request.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article
  })
}

export const patchVotes = (item, id, votesDifference) => {
  return request.patch(`/${item}/${id}`, {
    inc_votes: votesDifference
  })
}

export const getCommentsByArticleId = (article_id) => {
  return request.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments
  })
}

export const sendNewComment = (article_id, username, newComment) => {
  return request.post(`/articles/${article_id}/comments`, {
    username: username,
    body: newComment
  }).then(({ data }) => {
    return data.comment
  })
}