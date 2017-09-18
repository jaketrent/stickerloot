import glamorous from 'glamorous'
import React from 'react'

const bgColor = '#caaa65'

const Logo = glamorous.img({
  display: 'inline-block',
  height: 'calc(100% - 8px)',
  margin: '4px 16px 4px 0'
})

const TopNav = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '75px',
  background: `linear-gradient(to right, #99814e, ${bgColor})`,
  padding: '0 16px'
})

const Link = glamorous.a({
  display: 'inline-flex',
  alignItems: 'center',
  height: '100%',
  color: '#fff',
  textDecoration: 'none',
  padding: '0 12px',
  transition: 'all 300ms',
  textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
  ':hover': {
    background: '#fff',
    color: bgColor
  }
})

export default _ =>
  <TopNav>
    <Link href="/">
      <Logo src="/static/img/logo.png" />
    </Link>
    <Link href="/new">New</Link>
    <Link href="/games/abc123">abc123</Link>
  </TopNav>
