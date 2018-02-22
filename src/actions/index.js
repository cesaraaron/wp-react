import WPAPI from 'wpapi'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './schema'
import * as selectors from '../reducers'
import * as types from './types'
import invariant from 'invariant'

const invalidPageNumberError = val =>
  `Expect pageNumber to be a number > 0. But got '${val}'`
const invalidStringError = (varName, value) =>
  `Expect ${varName} to be valid string. But got: '${value}'`

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

export const getEndpoint = ({ location, homepage }) => ({
  type: types.GET_ENDPOINT,
  homepage,
  location
})

export const fetchPostsByCategorySlug = (slug, pageNumber) => {
  invariant(String(slug), invalidStringError('categorySlug', slug))
  invariant(Number(pageNumber) > 0, invalidPageNumberError(pageNumber))

  return createOnFetch(types.POSTS_BY_CATEGORY, (api, dispatch) =>
    api
      .categories()
      .slug(slug)
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
        res =>
          dispatch({
            type: types.FETCH_POSTS_BY_CATEGORY_SUCCESS,
            response: normalize(res, arrayOfPosts),
            _paging: res._paging,
            pageNumber
          }),
        err =>
          dispatch({
            type: types.FETCH_POSTS_BY_CATEGORY_FAILURE,
            message: err.message
          })
      )
  )
}

export const fetchPostsByPageNumber = pageNumber => {
  invariant(Number(pageNumber) > 0, invalidPageNumberError(pageNumber))

  return createOnFetch(types.POSTS, (api, dispatch) =>
    api
      .posts()
      .page(pageNumber)
      .then(
        res =>
          dispatch({
            type: types.FETCH_POSTS_SUCCESS,
            response: normalize(res, arrayOfPosts),
            _paging: res._paging,
            pageNumber
          }),
        err =>
          dispatch({ type: types.FETCH_POSTS_FAILURE, message: err.message })
      )
  )
}

export const fetchSingleBySlug = slug => {
  invariant(String(slug), invalidStringError('slug', slug))

  return createOnFetch(types.SINGLE, (api, dispatch) =>
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
}

export const fetchCommentsByPostId = postId => {
  invariant(typeof postId === 'number', `Invalid postId`)

  return createOnFetch(types.COMMENTS, (api, dispatch) =>
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
}

export const fetchAllCategories = () =>
  createOnFetch(types.ALL_CATEGORIES, (api, dispatch) =>
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

export const fetchPostsBySearchQuery = (query = '', pageNumber) => {
  invariant(Number(pageNumber) > 0, invalidPageNumberError(pageNumber))

  return createOnFetch(types.SEARCH_QUERY, (api, dispatch) =>
    api
      .posts()
      .search(query)
      .page(pageNumber)
      .then(
        res => {
          dispatch({
            type: types.FETCH_POSTS_BY_SEARCH_QUERY_SUCCESS,
            response: normalize(res, arrayOfPosts),
            _paging: res._paging,
            pageNumber
          })
        },
        err =>
          dispatch({
            type: types.FETCH_POSTS_BY_SEARCH_QUERY_FAILURE,
            message: err.message
          })
      )
  )
}

export const fetchUserWithSlug = slug =>
  createOnFetch(types.USERS, (api, dispatch) =>
    api
      .users()
      .slug(slug)
      .then(
        res => {
          dispatch({
            type: types.FETCH_USERS_SUCCESS,
            response: normalize(res, arrayOfPosts)
          })
        },
        err =>
          dispatch({
            type: types.FETCH_USERS_FAILURE,
            message: err.message
          })
      )
  )

export const fetchPostsForAuthor = (id, pageNumber) => {
  invariant(Number(pageNumber) > 0, invalidPageNumberError(pageNumber))

  return createOnFetch(types.POSTS_BY_AUTHOR, (api, dispatch) =>
    api
      .posts()
      .author(id)
      .then(
        res =>
          dispatch({
            type: types.FETCH_POSTS_BY_AUTHOR_SUCCESS,
            response: normalize(res, arrayOfPosts),
            _paging: res._paging,
            pageNumber
          }),
        err =>
          dispatch({
            type: types.FETCH_POSTS_BY_AUTHOR_FAILURE,
            message: err.message
          })
      )
  )
}

export const fetchUserWithSlugAndThenItsPosts = (slug, pageNumber) => (
  dispatch,
  getState
) =>
  dispatch(fetchUserWithSlug(slug)).then(() => {
    const [user] = selectors.getUserWithSlug(getState(), slug)
    return user
      ? dispatch(fetchPostsForAuthor(user.id, pageNumber))
      : dispatch({
          type: types.FETCH_POSTS_BY_AUTHOR_FAILURE,
          message: '404 user not found'
        })
  })

export const fetchPageWithSlug = slug =>
  createOnFetch(types.PAGE, (api, dispatch) =>
    api
      .pages()
      .slug(slug)
      .then(
        res =>
          dispatch({
            type: types.FETCH_PAGE_SUCCESS,
            response: normalize(res, arrayOfPosts),
            _paging: res._paging
          }),
        err =>
          dispatch({ type: types.FETCH_PAGE_FAILURE, message: err.message })
      )
  )
