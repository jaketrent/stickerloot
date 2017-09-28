import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React from 'react'

const bgColor = '#caaa65'

const LanguageDiv = glamorous.div({
  display: 'inline-flex',
  alignItems: 'center'
})

const LangOpt = glamorous.button(
  {
    padding: '4px 8px',
    fontSize: '1em',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'all 300ms',
    border: 'none',
    cursor: 'pointer',
    textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
    color: '#fff',
    ':hover': { backgroundColor: '#E41D47' },
    ':first-child': {
      borderRadius: '4px 0 0 4px'
    },
    ':last-child': {
      borderRadius: '0 4px 4px 0'
    }
  },
  ({ isActive }) =>
    isActive
      ? {
          backgroundColor: '#49c63b'
        }
      : {
          backgroundColor: '#caaa65'
        }
)

const langs = ['en', 'es']

const Language = (props, context) => (
  <LanguageDiv>
    {langs.map(lang => [
      <LangOpt
        key={lang}
        isActive={lang === context.currentLang}
        onClick={_ => props.onSelect(lang)}
      >
        {lang}
      </LangOpt>
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
