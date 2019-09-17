import axios from 'axios';

const request = axios.create({
  baseURL: 'https://hw-nc-news.herokuapp.com/api'
})

// export const getTopics = () => {
//   const { data } = await request.get('/topics')
//   console.log(data.topics)
// }

export const getTopics = () => {
  return request.get('/topics').then(({ data }) => {
    return data.topics
  })
}

export const getArticles = (topic) => {
  return request.get('/articles', { params: { topic } }).then(({ data }) => {
    return data.articles
  })
}

export const getUserByUsername = (username) => {
  return request.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  })
}