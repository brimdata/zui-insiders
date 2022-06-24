# Zui Insiders

This repo contains scripts that facilitate the builds, releases, and auto-updates for the Zui - Insiders app.

Zui Insiders is a standalone application that can live right next to the stable Zui app. It has it's own data directory on the file system to not interfere with stable Zui. The app subscribes to updates from this repo and will automatically update when a new release is published.

The main purpose of this repository is to build a nightly version of the app based on the main branch of the zui repo. It contains a Github Actions workflow called `release.yml` that does the following:

1. Checks out the main branch of the zui rep
2. Injects the package.json file with Insider properties
3. Builds a release
4. Creates a new published release in the repo
5. Uploads the build artifacts to the new release
6. Bumps the version of package.json in this repo to the version just published

### Injected Properties

The Insider's build is inte
