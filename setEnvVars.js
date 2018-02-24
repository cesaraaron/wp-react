const fs = require('fs')
const path = require('path')
const invariant = require('invariant')
const homepage = require('./package').homepage || ''

const cwd = process.cwd()
const envPath = path.join(cwd, '.env.production.local')
let envContents = ''

try {
  envContents = fs.readFileSync(envPath).toString()
} catch (e) {
  if (!/no such file/i.test(e.message)) {
    throw new Error(e.message)
  }
}

const setPublicUrlVar = ({ cwd, envContents }) => {
  invariant(typeof cwd === 'string', `"cwd" must be a string`)
  invariant(typeof envContents === 'string', `"env must be a string`)

  const folderName = cwd.replace(/\/.*\//, '')
  const publicUrl = path.join('wp-content/themes', folderName, '/build')

  if (/PUBLIC_URL/.test(envContents)) {
    // env.production.local exists and it has the PUBLIC_URL key
    const match = envContents.match(/PUBLIC_URL\s*=.*/g)[0]
    return envContents.replace(match, `PUBLIC_URL=${publicUrl}`)
  } else {
    // env.production.local exists but there isn't PUBLIC_URL key so
    // insert it at the beginning of the file.
    return `PUBLIC_URL=${publicUrl}\n${envContents}`
  }
}

const setHomePageVar = ({ cwd, envContents }) => {
  invariant(typeof cwd === 'string', `"cwd" must be a string`)
  invariant(typeof envContents === 'string', `"env must be a string`)

  if (/REACT_APP_HOMEPAGE/.test(envContents)) {
    // env.production.local exists and it has the REACT_APP_HOMEPAGE key
    const match = envContents.match(/REACT_APP_HOMEPAGE\s*=.*/g)[0]
    return envContents.replace(match, `REACT_APP_HOMEPAGE=${homepage}`)
  } else {
    // env.production.local exists but there isn't REACT_APP_HOMEPAGE key so
    // insert it at the beginning of the file.
    return `REACT_APP_HOMEPAGE=${homepage}\n${envContents}`
  }
}

envContents = setPublicUrlVar({
  cwd,
  envContents
})

envContents = setHomePageVar({
  cwd,
  envContents
})

fs.writeFileSync(envPath, envContents)
