import React from 'react'
import ReactDOM from 'react-dom'
import { rehydrate } from 'glamor'

import Component from '../../shared/dist/component'

console.log('client!', window._glam)
rehydrate(window._glam)
ReactDOM.render(<Component />, document.getElementById('app'))
