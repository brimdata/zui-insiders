import { InsidersPackager } from "./insiders-packager.js"

const appDir = process.argv[2]
if (!appDir) {
    console.log("Missing arg: provide the relative path to the app dir")
    process.exit(1)
}

const pkg = new InsidersPackager(appDir)
pkg.injectAppPackageJSON()
