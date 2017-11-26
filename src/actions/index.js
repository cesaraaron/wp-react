export const getEndpoint = location => ({
  type: 'GET_ENDPOINT',
  location
})

export const fetchPosts = () => ({
  type: 'FETCH_POSTS'
})

export const fetchSingle = slug => ({
  type: 'FETCH_SINGLE',
  slug
})
