import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React from 'react'

const bgColor = '#caaa65'

const LanguageDiv = glamorous.div({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#caaa65',
  color: '#fff',
  padding: '0.5em 1em',
  borderRadius: '4px'
})

const LangOpt = glamorous.a(
  {
    padding: '0 2px',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 300ms',
    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
    ':hover': {
      color: '#49c63b'
    }
  },
  ({ isActive }) =>
    isActive
      ? {
          color: '#49c63b'
        }
      : { color: '#fff' }
)

const langs = ['en', 'es']

const Language = props =>
  <LanguageDiv>
    {langs.map((lang, i) => [
      <LangOpt href="/" key={lang} isActive={lang === props.currentLang}>
        {lang}
      </LangOpt>,
      i !== langs.length - 1 ? '/' : null
    ])}
  </LanguageDiv>

Language.propTypes = {
  currentLang: PropTypes.string.isRequired
}

export default Language
