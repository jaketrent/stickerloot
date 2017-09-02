import React from 'react'
import ReactDOM from 'react-dom'
import { rehydrate } from 'glamor'

import Index from '@shared/index'

console.log('wow!6')
rehydrate(window._glam)
ReactDOM.render(<Index />, document.getElementById('app'))
