import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const  router = useRouter()
  const { asPath} =router;
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  console.log(asPath, props.link)
  const className =
   (asPath.includes(props.link) && props.link !== '/' || asPath === props.link)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;
  return (
    <Link {...props} scroll={false}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
}

export default ActiveLink