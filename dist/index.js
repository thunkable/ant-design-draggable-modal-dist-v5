
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ant-design-draggable-modal.cjs.production.min.js')
} else {
  module.exports = require('./ant-design-draggable-modal.cjs.development.js')
}
