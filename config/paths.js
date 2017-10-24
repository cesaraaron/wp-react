const path = require('path')
const root = process.cwd()
const src = path.join(root, 'src')
const dist = path.join(root, 'dist')

module.exports = {
  join: path.join,
  root,
  src,
  dist
}
