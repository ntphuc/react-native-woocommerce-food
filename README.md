# foodapp

An app developed on React Native which connect to WordPress WooCommerce API to display products and order.

# Video Demo
-  Link demo: https://www.youtube.com/watch?v=7BkctT_0z8M

### What's included

- [React Native](https://facebook.github.io/react-native/) - Build Native Mobile Apps using JavaScript and React
- [Redux](https://nodejs.org/) - Predictable state container for JavaScript apps
- [Wix/react-native-navigation](https://github.com/wix/react-native-navigation) - A complete native navigation solution for React Native with optional redux support - nav bars, tabs, drawer, modals
- [Redux Thunk](https://github.com/gaearon/redux-thunk) - Thunk middleware for Redux
- [ESLint](http://eslint.org/) - The pluggable linting utility for JavaScript and JSX
- [Wordpress](https://wordpress.com) - The easiest way to create a website or blog
- [WooCommerce API](https://docs.woocommerce.com/document/woocommerce-rest-api/) WooCommerce (WC) 2.6+ is fully integrated with the WordPress REST API

### Requirements
- [Node](https://nodejs.org) `4.x` or newer
- [React Native](http://facebook.github.io/react-native/docs/getting-started.html) for development
- [Android Studio](https://developer.android.com/studio/index.html) for Android development
- [Xcode](https://developer.apple.com/xcode/) for iOS development
- [Android SDK](https://developer.android.com/sdk/) `23.0.1` or newer for Android development
- [Genymotion](https://www.genymotion.com/) for Android emulation
- [YARN](https://yarnpkg.com/) - for dependency management


### Installation

Clone this repo

```sh
$ git clone https://github.com/ntphuc/react-native-woocommerce-food.git
$ cd foodapp
$ yarn install or npm install
```
### Installation SERVER NODEJS for WooCommerce Rest API
- Extract file zip server.zip
- cd to folder server
- Open terminal to start server by command : $ node server.js

### CHANGE WEB_URL in project React Native app

Change value constant WEB_URL in folder src/constants/api.js
- export const WEB_URL = "http://YOUR_IP:YOUR_PORT";

### How to start
```sh
$ react-native run-android
$ react-native run-ios
```
