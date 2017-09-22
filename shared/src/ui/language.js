import glamorous from 'glamorous'
import React from 'react'

const bgColor = '#caaa65'

const Language = glamorous.div({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#caaa65',
  color: '#fff',
  padding: '0.5em 1em',
  borderRadius: '4px'
})

const LangOpt = glamorous.a({
  padding: '0 2px',
  fontWeight: 'bold',
  color: '#fff',
  textDecoration: 'none',
  transition: 'all 300ms',
  textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
  ':hover': {
    color: '#49c63b'
  }
})

export default _ =>
  <Language>
    <LangOpt href="/">en</LangOpt>
    /
    <LangOpt href="/">es</LangOpt>
  </Language>
