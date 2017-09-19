import glamorous from 'glamorous'
import React from 'react'

import TopNav from './ui/topnav'

const Content = glamorous.div({
  padding: '20px'
})

export default props =>
  <div>
    <TopNav gameIds={props.serverState.gameIds} />
    <Content>
      <h1>Welcome!</h1>
      <h2>To start</h2>
      <p>
        Whack the pinata with exceeding force. 3 hits will crack open the
        pinata. When cracked open, the pinata will shower you with stickers.
      </p>
      <p>
        Trade a set of stickers in for more whacks at the pinata.
      </p>
      <p>
        When you are out of swings and out of sets of stickers, the party will
        come to an end.
      </p>
      <p>
        Select 'New' in the menu above. Round uno, fight!
      </p>
      <h2>To stop</h2>
      <p>
        Modify this code until it breaks.
      </p>
    </Content>
  </div>
