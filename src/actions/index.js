import WPAPI from 'wpapi'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './schema'
import * as selectors from '../reducers'
import * as types from './types'

// For some reason this doesn't work when fetching http://wptest.io/demo
// I got an error ‘res is null’ or something like that.
// Had to use a local wp installation to make it work :c
const getAll = req =>
  req.then(res => {
    if (!res._paging || !res._paging.next) {
      return res
    }
    return Promise.all([res, getAll(res._paging.next)]).then(data =>
      data.reduce((prev, next) => [...prev, ...next])
    )
  })

const createOnFetch = (type, doFetching) => (dispatch, getState) => {
  const onFetchVars = types.createOnFetchVars(type)
  const state = getState()
  const endpoint = selectors.getEndpoint(state)
  const isFetching = selectors.getIsFetching(state, type)

  if (isFetching) {
    return Promise.resolve()
  }

  const api = new WPAPI({ endpoint })
  dispatch({ type: onFetchVars.request })

  return doFetching(api, dispatch)
}

export const getEndpoint = location => ({
  type: types.GET_ENDPOINT,
  location
})

export const fetchPostsByCategorySlug = (categorySlug, pageNumber) =>
  createOnFetch(types.postsByCategory, (api, dispatch) =>
    api
      .categories()
      .slug(categorySlug)
      .then(cats => {
        if (cats.length > 0) {
          return api
            .posts()
            .categories(cats[0].id)
            .page(pageNumber)
        } else {
          dispatch({
            type: types.FETCH_POSTS_BY_CATEGORY_FAILURE,
            message: '404 not found'
          })
        }
      })
      .then(
        res => {
          const response = normalize(res, arrayOfPosts)
          response._paging = res._paging

          dispatch({
            type: types.FETCH_POSTS_BY_CATEGORY_SUCCESS,
            response,
            pageNumber
          })
        },
        err =>
          dispatch({
            type: types.FETCH_POSTS_BY_CATEGORY_FAILURE,
            message: err.message
          })
      )
  )

export const fetchPostsByPageNumber = pageNumber =>
  createOnFetch(types.posts, (api, dispatch) =>
    api
      .posts()
      .page(pageNumber)
      .then(
        res => {
          const response = normalize(res, arrayOfPosts)
          response._paging = res._paging

          dispatch({
            type: types.FETCH_POSTS_SUCCESS,
            response,
            pageNumber
          })
        },
        err =>
          dispatch({ type: types.FETCH_POSTS_FAILURE, message: err.message })
      )
  )

export const fetchSingleBySlug = slug =>
  createOnFetch(types.single, (api, dispatch) =>
    api
      .posts()
      .slug(slug)
      .then(
        res =>
          dispatch({
            type: types.FETCH_SINGLE_SUCCESS,
            response: normalize(res, arrayOfPosts)
          }),
        err =>
          dispatch({ type: types.FETCH_SINGLE_FAILURE, message: err.message })
      )
  )

export const fetchCommentsByPostId = postId =>
  createOnFetch(types.comments, (api, dispatch) =>
    api
      .comments()
      .post(postId)
      .then(
        res =>
          dispatch({
            type: types.FETCH_COMMENTS_SUCCESS,
            response: normalize(res, arrayOfPosts)
          }),
        err =>
          dispatch({ type: types.FETCH_COMMENTS_FAILURE, message: err.message })
      )
  )

export const fetchAllCategories = () =>
  createOnFetch(types.allCategories, (api, dispatch) =>
    getAll(api.categories()).then(
      res =>
        dispatch({
          type: types.FETCH_ALL_CATEGORIES_SUCCESS,
          response: normalize(res, arrayOfPosts)
        }),
      err =>
        dispatch({
          type: types.FETCH_ALL_CATEGORIES_FAILURE,
          message: err.message
        })
    )
  )
