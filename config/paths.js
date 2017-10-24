const path = require('path')
const root = process.cwd()
const src = path.join(root, 'src')
const dist = path.join(root, 'dist')

module.exports = {
  root,
  src,
  dist
}
