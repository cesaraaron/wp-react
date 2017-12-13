[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
# WP-React
A react, redux & react-router wordpress theme.

**Under active development and for experimental use only**

# Includes
* react v16
* react-router v4
* react-redux
* redux
* redux-thunk
* normalizr
* react-hot-loader

# Setup
Download the repo and install dependencies:
1. `git clone https://github.com/cesaraaron/wp-react.git`
2. `cd wp-react`
3. `npm install`

## `npm start`
To start a local development server with [wptest/demo](http://wptest.io/demo) as proxy.

If you want to use other wp installation add an .env file at the root directory with the key WP_URL pointing at it. e.g: WP_URL=http://localhost:8080/


## `npm build`
Build for *production*.
Note though that you'll need to have a Wordpress 4.7+ installation or the [WP-REST-API](https://wordpress.org/plugins/json-rest-api/) plugin installed.

You will also need to have any but the default permalink structure on your wordpress installation. [See here](https://codex.wordpress.org/Settings_Permalinks_Screen) for details


# Folder structure
```
wp-react/
├── config/          # → Webpack configuration
├── dist/            # → Webpack output
├── src/             # → The theme
│   ├── actions/     # → Redux actions
│   ├── components   # → React components
│   ├── reducers/    # → Redux reducers
│   ├── utils/       # → App utilities
│   ├── App.js       # → The routes of the app
│   └── index.js     # → Entry point of webpack
└── style.css        # → Wordpress theme metadata
```
> The react components of the first level of `src/` use a similar sorting of files as the underscores starter theme.

# What is not working (yet)
* Search page.
* Archives page.
* Authors page.
* Menus.
* Commenting.
* No css.
* Lots of other things...

# Contributing
Pull requests are welcome. Have a question? a request? file an issue!.
