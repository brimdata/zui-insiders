import semver from "semver"
import fs from "fs-extra"
import url from "node:url"

const stableVersion = process.argv[2]
const DEBUG = process.argv[3] === "--debug"
const p = (...args) => {
    if (DEBUG) console.log("‣", ...args)
}

if (!stableVersion) {
    p("Missing argument: provide the stable version as the only argument")
    process.exit(1)
}

if (!semver.valid(stableVersion)) {
    p("Invalid version: ", stableVersion)
    process.exit(1)
}

const packageFile = url.fileURLToPath(new URL("package.json", import.meta.url).toString())
const meta = fs.readJSONSync(packageFile)
const devVersion = meta.version

let nextVersion
if (semver.gt(stableVersion, devVersion)) {
    p("Strategy:        Use stable (stable > dev)")
    nextVersion = stableVersion
} else {
    p("Strategy:        Increment dev (stable <= dev)")
    nextVersion = semver.inc(devVersion, "prerelease")
}

p("Stable version: ", stableVersion)
p("Dev version:    ", devVersion)
p("Next version:   ", nextVersion)
console.log(nextVersion)
