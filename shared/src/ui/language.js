import glamorous from 'glamorous'
import React from 'react'

const bgColor = '#caaa65'

const Language = glamorous.div({
  display: 'inline-flex',
  alignItems: 'center',
  color: '#fff',
  marginLeft: 'auto'
})

const LangOpt = glamorous.a({
  display: 'inline-flex',
  alignItems: 'center',
  height: '100%',
  color: '#fff',
  textDecoration: 'none',
  transition: 'all 300ms',
  textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
  padding: '0 2px',
  ':hover': {
  }
})

export default _ =>
  <Language>
      <LangOpt href="/">en </LangOpt>|<LangOpt href="/"> es</LangOpt>
  </Language>
