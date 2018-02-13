import React from 'react'
import PropTypes from 'prop-types'
import { connectWithFetchContainer } from './components/FetchContainer'
import { getAllCategories } from './reducers'
import * as types from './actions/types'
import { fetchAllCategories } from './actions'
import { Link } from 'react-router-dom'
import SearchBox from './components/SearchBox'

export const CategoryList = ({ data }) => (
  <div>
    {data.map(cat => (
      <Link
        style={{ display: 'block', padding: '5px 0px' }}
        to={`/category/${cat.slug}`}
        key={cat.id}
      >
        {cat.name}
      </Link>
    ))}
  </div>
)

CategoryList.propTypes = {
  data: PropTypes.array.isRequired
}

export const Sidebar = ({ data }) => (
  <div>
    <SearchBox />
    <CategoryList data={data} />
  </div>
)

Sidebar.propTypes = {
  data: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  data: getAllCategories(state, types.ALL_CATEGORIES)
})

export default connectWithFetchContainer(mapStateToProps, undefined, {
  type: types.ALL_CATEGORIES,
  onMount: ({ dispatch }) => dispatch(fetchAllCategories())
})(Sidebar)
