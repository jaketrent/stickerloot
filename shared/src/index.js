import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React from 'react'

import CurrentLanguage from './ui/current-language'
import I18n from './ui/i18n'
import TopNav from './ui/topnav'

const Content = glamorous.div({
  padding: '20px'
})

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
