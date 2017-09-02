import glamorous from 'glamorous'
import React from 'react'

const Logo = glamorous.img({})

const TopNav = glamorous.div({})

export default _ =>
  <TopNav>
    <Logo src="/static/img/logo.png" />
  </TopNav>
