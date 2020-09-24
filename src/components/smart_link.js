import React from 'react'
import { Link } from 'react-router-dom'

class SmartLink extends React.Component {
  render() {
    const { to } = this.props
    // * check if given href is absolute or relative
    const isRelative = RegExp(/^\/.*/, 'g').test(to)
    if (isRelative) return this.link()
    const { host } = window.location

    // eslint-disable-next-line no-useless-escape
    const linkRegExp = RegExp(`^http(?:s)?:\/\/(?:www.)?(?:${host})(.*)$`, 'g')

    const result = linkRegExp.exec(to)
    if (result) {
      // * [1] - first group - relative path
      const internalLink = result[1] || '/'
      return this.link(internalLink)
    }

    return this.aLink()
  }

  aLink() {
    const {
      className,
      onClick,
      children,
      to,
      target,
      style,
      innerRef
    } = this.props
    return (
      <a
        href={to}
        ref={innerRef}
        onClick={onClick}
        className={className}
        target={target}
        style={style}
      >
        {children}
      </a>
    )
  }

  link(internalLink) {
    const {
      className,
      target,
      onClick,
      children,
      to,
      style,
      innerRef
    } = this.props
    return (
      <Link
        to={internalLink || to}
        ref={innerRef}
        onClick={onClick}
        className={className}
        target={target}
        style={style}
      >
        {children}
      </Link>
    )
  }
}

SmartLink.defaultProps = {}

export default React.forwardRef((props, ref) => (
  <SmartLink innerRef={ref} {...props} />
))
