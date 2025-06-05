# BoldScholar Framework7 App

This project contains a Cordova application built with [Framework7](https://framework7.io/).

## Prerequisites

- **Node.js** – install the current LTS version from [nodejs.org](https://nodejs.org/).
- **Cordova CLI** – install globally with:
  ```bash
  npm install -g cordova
  ```

## Install Dependencies

Framework specific dependencies are listed in `www/package.json`. From the project root run:

```bash
cd www
npm install
```

This will create a `node_modules` directory inside `www/` used when building the front‑end assets.

## Run the App Locally

1. From the project root, ensure a platform is added (for example `browser`):
   ```bash
   cordova platform add browser
   ```
2. Start the application:
   ```bash
   cordova run browser
   ```
   Replace `browser` with `android` or `ios` if you have those SDKs installed.

## Build for Production

To create a production build use the Cordova CLI:

```bash
cordova build --release
```

This generates platform specific release artifacts inside `platforms/` which can then be distributed or uploaded to stores.

## Project Structure

- **`www/`** – application source files (HTML, JavaScript, CSS, images).
- **`resources/`** – splash screen and icon templates for the Cordova build process.
- **`certificates/`** – signing certificates/keystores required for releasing the app.

