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
            <I18n id="instruct1" />
          </p>
          <p>
            <I18n id="instruct2" />
          </p>
          <p>
            <I18n id="instruct3" />
          </p>
          <p>
            <I18n id="instruct4" />
          </p>
          <h2>
            <I18n id="stop" />
          </h2>
          <p>
            <I18n id="instruct5" />
          </p>
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
