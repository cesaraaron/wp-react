import { ids, byId, isFetching } from '../posts'

it('returns and empty array', () => {
  const val = ids(undefined, {})

  expect(val).toEqual([])
})

it('returns empty object', () => {
  const val = byId(undefined, {})

  expect(val).toEqual({})
})

it('returns false', () => {
  const val = isFetching(undefined, {})

  expect(val).toEqual(false)
})
