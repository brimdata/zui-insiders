import { InsidersPackager } from "./insiders-packager.js"

const appDir = process.argv[2]
if (!appDir) {
    console.log("Missing arg #1: relative path to the app dir")
    process.exit(1)
}

const latestVersion = process.argv[3]
if (!latestVersion) {
    console.log("Missing arg #2: latest version of insiders")
    process.exit(1)
}

const pkg = new InsidersPackager(appDir, latestVersion)
pkg.injectAppPackageJSON()
