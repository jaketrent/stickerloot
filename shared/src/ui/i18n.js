import PropTypes from 'prop-types'
import React from 'react'

import languages from './languages'

const I18n = (props, context) => languages[context.currentLang][props.id]

I18n.propTypes = {
  id: PropTypes.string.isRequired
}
I18n.contextTypes = {
  currentLang: PropTypes.string
}
export default I18n
