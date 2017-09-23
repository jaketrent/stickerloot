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
  borderRadius: '4px',
  fontSize: '1.125em'
})

const LangOpt = glamorous.button(
  {
    padding: '2px 4px',
    fontSize: '1em',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 300ms',
    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
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

const Language = (props, context) => (
  <LanguageDiv>
    {langs.map((lang, i) => [
      <LangOpt
        key={lang}
        isActive={lang === context.currentLang}
        onClick={_ => props.onSelect(lang)}
      >
        {lang}
      </LangOpt>,
      i !== langs.length - 1 ? '/' : null
    ])}
  </LanguageDiv>
)
Language.propTypes = {
  onSelect: PropTypes.func.isRequired
}
Language.contextTypes = {
  currentLang: PropTypes.string
}

export default Language
