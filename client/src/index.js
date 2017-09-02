import React from 'react'
import ReactDOM from 'react-dom'
import { rehydrate } from 'glamor'

import Component from '@shared/component'

console.log('wow!6')
rehydrate(window._glam)
ReactDOM.render(<Component />, document.getElementById('app'))
