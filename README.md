[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
# WP-React
A react, redux & react-router wordpress theme.

**Under active development and for experimental use only**

## Includes
* react v16
* react-router v4
* react-redux
* redux
* redux-thunk
* normalizr
* react-hot-loader

## Setup
1. `git clone https://github.com/cesaraaron/wp-react.git`
2. `cd wp-react`
2. `npm install && npm start`


If you want to build for *production:* `npm build`.
Note though that you'll need to have a Wordpress 4.7+ installation or the [WP-REST-API](https://wordpress.org/plugins/json-rest-api/) plugin installed.

> `npm start` run the webpack-dev-server with [wptest/demo](http://wptest.io/demo) as proxy. If you want to use other wp installation add an .env file at the root directory with the key WP_URL pointing at it. e.g: WP_URL=http://localhost:8080/


