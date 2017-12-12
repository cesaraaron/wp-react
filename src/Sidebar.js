import React from 'react'
import PropTypes from 'prop-types'
import FetchContainer from './components/FetchContainer'
import { connect } from 'react-redux'
import { getErrorMessage, getIsFetching, getData } from './reducers'
import * as types from './actions/types'
import { fetchAllCategories } from './actions'
import { Link } from 'react-router-dom'

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
    <CategoryList data={data} />
  </div>
)

Sidebar.propTypes = {
  data: PropTypes.array.isRequired
}

const SidebarContainer = ({ fetchAllCategories, data, ...rest }) => (
  <FetchContainer
    hasData={data.length > 0}
    onMount={() => fetchAllCategories()}
    render={() => <Sidebar data={data} />}
    {...rest}
  />
)

SidebarContainer.propTypes = {
  fetchAllCategories: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  data: getData(state, types.allCategories),
  errorMessage: getErrorMessage(state, types.allCategories),
  isFetching: getIsFetching(state, types.allCategories)
})

export default connect(mapStateToProps, { fetchAllCategories })(
  SidebarContainer
)
