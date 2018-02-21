const fs = require('fs')
const path = require('path')

const folderName = process.cwd().replace(/\/.*\//, '')
const publicUrl = path.join('wp-content/themes', folderName, '/build')
const envPath = path.join(process.cwd(), '.env.production.local')

try {
  const envProduction = fs.readFileSync(envPath).toString()
  if (/PUBLIC_URL/.test(envProduction)) {
    // env.production.local exists and it has the PUBLIC_URL key
    const match = envProduction.match(/PUBLIC_URL\s*=.*/g)[0]
    const newEnvProduction = envProduction.replace(
      match,
      `PUBLIC_URL=${publicUrl}`
    )
    fs.writeFileSync(envPath, newEnvProduction)
  } else {
    // env.production.local exists but there isn't PUBLIC_URL key so
    // insert it at the beginning of the file.
    fs.writeFileSync(envPath, `PUBLIC_URL=${publicUrl}\n${envProduction}`)
  }
} catch (e) {
  if (/no such file/i.test(e.message)) {
    // no env.production.local exists so create one and add the public url
    fs.writeFileSync(envPath, `PUBLIC_URL=${publicUrl}`)
  } else {
    throw new Error(e.message)
  }
}
