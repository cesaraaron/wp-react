const argv = require('yargs').argv
const path = require('path')
const rootPath = process.cwd()
const src = path.join(rootPath, 'src')
const dist = path.join(rootPath, 'dist')

module.exports = {
  entry: {
    index: [path.join(src, 'index.js')]
  },
  paths: {
    root: rootPath,
    src,
    dist
  },
  watch: !!argv.watch,
  babel: {
    presets: ['env', 'react']
  }
}
