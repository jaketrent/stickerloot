import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React from 'react'

import TopNav from './ui/topnav'

const Content = glamorous.div({
  padding: '20px'
})

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

const languages = {
  en: {
    start: 'To start',
    welcome: 'Welcome!'
  },
  es: {
    start: "Let's beginno",
    welcome: 'Bienvenido'
  }
}
class I18n extends React.Component {
  render() {
    return <span>{languages[this.context.currentLang][this.props.id]}</span>
  }
}
I18n.propTypes = {
  id: PropTypes.string.isRequired
}
I18n.contextTypes = {
  currentLang: PropTypes.string
}

const Index = props => (
  <CurrentLanguage>
    {onCurrentLangSelect => (
      <div>
        <TopNav
          gameIds={props.serverState.gameIds}
          onCurrentLangSelect={onCurrentLangSelect}
        />
        <Content>
          <h1>
            <I18n id="welcome" />
          </h1>
          <h2>
            <I18n id="start" />
          </h2>
          <p>
            Whack the pinata with exceeding force. 3 hits will crack open the
            pinata. When cracked open, the pinata will shower you with stickers.
          </p>
          <p>Trade a set of stickers in for more whacks at the pinata.</p>
          <p>
            When you are out of swings and out of sets of stickers, the party
            will come to an end.
          </p>
          <p>Select 'New' in the menu above. Round uno, fight!</p>
          <h2>To stop</h2>
          <p>Modify this code until it breaks.</p>
        </Content>
      </div>
    )}
  </CurrentLanguage>
)
Index.propTypes = {
  serverState: PropTypes.shape({
    gameIds: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default Index
