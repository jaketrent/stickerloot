import React from 'react'

import TopNav from '../ui/topnav'
import Pinata from '../ui/pinata'
import Stats from '../ui/stats'

export default props =>
  <div>
    <TopNav />
    <Pinata onSwing={props.onSwing} />
    <Stats swingsRemaining={props.swingsRemaining} stickers={props.stickers} />
  </div>
