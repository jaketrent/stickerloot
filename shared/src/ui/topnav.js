import glamorous, { Div } from 'glamorous'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

import Language from './language'

const bgColor = '#caaa65'

const Logo = glamorous.img({
  display: 'inline-block',
  height: 'calc(100% - 8px)',
  margin: '4px 16px 4px 0'
})

const TopNavDiv = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '75px',
  background: `linear-gradient(to right, #99814e, ${bgColor})`,
  padding: '0 16px'
})

const linkHoverStyles = {
  background: '#fff',
  color: bgColor
}
const LinkAnchor = glamorous.a(
  {
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    color: '#fff',
    textDecoration: 'none',
    padding: '0 12px',
    transition: 'all 300ms',
    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
    ':hover': linkHoverStyles
  },
  ({ isActive }) => (isActive ? linkHoverStyles : null)
)

const Link = withRouter(props => (
  <LinkAnchor {...props} isActive={props.location.pathname === props.href} />
))

const LanguageSwitcher = props => (
  <Div position="absolute" top="85px" right="20px">
    {props.children}
  </Div>
)

const TopNav = props => (
  <TopNavDiv>
    <Link href="/">
      <Logo src="/static/img/logo.png" />
    </Link>
    <Link href="/new">New</Link>
    {props.gameIds.map(id => (
      <Link key={id} href={`/games/${id}`}>
        {id}
      </Link>
    ))}
    <LanguageSwitcher>
      <Language onSelect={props.onCurrentLangSelect} />
    </LanguageSwitcher>
  </TopNavDiv>
)

TopNav.propTypes = {
  gameIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCurrentLangSelect: PropTypes.func.isRequired
}

export default TopNav
