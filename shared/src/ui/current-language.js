import PropTypes from 'prop-types'
import React from 'react'

class CurrentLanguage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { currentLang: 'en' }
    this.handleCurrentLangSelect = this.handleCurrentLangSelect.bind(this)
  }
  getChildContext() {
    return { currentLang: this.state.currentLang }
  }
  handleCurrentLangSelect(lang) {
    this.setState({ currentLang: lang })
  }
  render() {
    return this.props.children(this.handleCurrentLangSelect)
  }
}
CurrentLanguage.childContextTypes = {
  currentLang: PropTypes.string.isRequired
}
export default CurrentLanguage
