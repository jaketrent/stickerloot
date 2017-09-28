import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

const defaultLang = 'en'

const parseQuery = query =>
  query
    .substring(1)
    .split('&')
    .reduce((acc, pair) => {
      const [key, value] = pair.split('=')
      acc[key] = value
      return acc
    }, {})

class CurrentLanguage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      currentLang: parseQuery(props.location.search).lang || defaultLang
    }
    this.handleCurrentLangSelect = this.handleCurrentLangSelect.bind(this)
  }
  getChildContext() {
    return { currentLang: this.state.currentLang }
  }
  handleCurrentLangSelect(lang) {
    this.setState({ currentLang: lang }, _ =>
      this.props.history.push(this.props.location.pathname + '?lang=' + lang)
    )
  }
  render() {
    return this.props.children(this.handleCurrentLangSelect)
  }
}
CurrentLanguage.childContextTypes = {
  currentLang: PropTypes.string.isRequired
}
export default withRouter(CurrentLanguage)
