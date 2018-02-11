import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PagingLinks = ({ total, isHome, activeIndex }) => (
  <div>
    {[...Array(total)].map((val, idx) => {
      const currentIndex = idx + 1
      const to = isHome && currentIndex === 1 ? '/' : `/p/${currentIndex}`

      return activeIndex === currentIndex ? (
        <span style={{ padding: '5px' }} key={currentIndex}>
          {currentIndex}
        </span>
      ) : (
        <Link style={{ padding: '5px' }} to={to} key={currentIndex}>
          {currentIndex}
        </Link>
      )
    })}
  </div>
)

PagingLinks.propTypes = {
  isHome: PropTypes.bool,
  total: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired
}
