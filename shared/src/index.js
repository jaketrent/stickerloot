import glamorous from 'glamorous'
import React from 'react'

import TopNav from './ui/topnav'
import Pinata from './ui/pinata'

const Index = glamorous.div({ color: 'red' })

export default _ =>
  <Index>
    <TopNav />
    <Pinata />
  </Index>
