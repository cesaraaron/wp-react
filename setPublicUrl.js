const fs = require('fs')
const path = require('path')
const invariant = require('invariant')
const homepage = require('./package').homepage || ''

const setPublicUrlVar = ({ cwd, writeFileSync, envContents }) => {
  invariant(typeof cwd === 'string', `"cwd" must be a string`)
  invariant(typeof envContents === 'string', `"env must be a string`)
  invariant(
    typeof writeFileSync === 'function',
    `"writeFileSync" must be a function`
  )

  const folderName = cwd.replace(/\/.*\//, '')
  const publicUrl = path.join('wp-content/themes', folderName, '/build')
  const envPath = path.join(cwd, '.env.production.local')

  try {
    if (/PUBLIC_URL/.test(envContents)) {
      // env.production.local exists and it has the PUBLIC_URL key
      const match = envContents.match(/PUBLIC_URL\s*=.*/g)[0]
      const newEnvProduction = envContents.replace(
        match,
        `PUBLIC_URL=${publicUrl}`
      )
      writeFileSync(envPath, newEnvProduction)
    } else {
      // env.production.local exists but there isn't PUBLIC_URL key so
      // insert it at the beginning of the file.
      writeFileSync(envPath, `PUBLIC_URL=${publicUrl}\n${envContents}`)
    }
  } catch (e) {
    if (/no such file/i.test(e.message)) {
      // no env.production.local exists so create one and add the public url
      writeFileSync(envPath, `PUBLIC_URL=${publicUrl}`)
    } else {
      throw new Error(e.message)
    }
  }
}

const setHomePageVar = ({ cwd, writeFileSync, envContents }) => {
  invariant(typeof cwd === 'string', `"cwd" must be a string`)
  invariant(typeof envContents === 'string', `"env must be a string`)
  invariant(
    typeof writeFileSync === 'function',
    `"writeFileSync" must be a function`
  )

  const envPath = path.join(cwd, '.env.production.local')

  try {
    if (/CREATE_REACT_HOMEPAGE/.test(envContents)) {
      // env.production.local exists and it has the CREATE_REACT_HOMEPAGE key
      const match = envContents.match(/CREATE_REACT_HOMEPAGE\s*=.*/g)[0]
      const newEnvProduction = envContents.replace(
        match,
        `CREATE_REACT_HOMEPAGE=${homepage}`
      )
      writeFileSync(envPath, newEnvProduction)
    } else {
      // env.production.local exists but there isn't CREATE_REACT_HOMEPAGE key so
      // insert it at the beginning of the file.
      writeFileSync(
        envPath,
        `CREATE_REACT_HOMEPAGE=${homepage}\n${envContents}`
      )
    }
  } catch (e) {
    if (/no such file/i.test(e.message)) {
      // no env.production.local exists so create one and add the public url
      writeFileSync(envPath, `PUBLIC_URL=${homepage}`)
    } else {
      throw new Error(e.message)
    }
  }
}

const envPath = path.join(process.cwd(), '.env.production.local')
const envContents = fs.readFileSync(envPath).toString()

setPublicUrlVar({
  cwd: process.cwd(),
  writeFileSync: fs.writeFileSync,
  envContents
})

setHomePageVar({
  cwd: process.cwd(),
  writeFileSync: fs.writeFileSync,
  envContents
})
