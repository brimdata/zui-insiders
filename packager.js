import path from "node:path"
import url from "node:url"
import fs from "fs-extra"
import semver from "semver"

const p = (...args) => console.log("‣", ...args)

export class InsidersPackager {
  constructor(appRoot) {
    this.root = path.dirname(url.fileURLToPath(import.meta.url))
    this.meta = this.getMeta(this.root)
    this.appRoot = path.join(process.cwd(), appRoot)
    this.appMeta = this.getMeta(this.appRoot)
  }

  get lastVersion() {
    return this.meta.version
  }

  get stableVersion() {
    return this.appMeta.version
  }

  get nextVersion() {
    if (this.strategy === "match-stable") {
      return this.stableVersion
    } else {
      return semver.inc(this.lastVersion, "prerelease")
    }
  }

  get strategy() {
    if (semver.gt(this.stableVersion, this.lastVersion)) {
      return "match-stable"
    } else {
      return "increment-dev"
    }
  }

  get injectedProperties() {
    return {
      name: this.meta.name,
      productName: this.meta.productName,
      repository: this.meta.repository,
      description: this.meta.description,
      version: this.nextVersion
    }
  }

  injectAppPackageJSON() {
    p("Injecting app's package.json with:", this.injectedProperties)
    const json = Object.assign({}, this.appMeta, this.injectedProperties)
    const path = this.getMetaPath(this.appRoot)
    fs.writeJSONSync(path, json, { spaces: 2 })
  }

  saveVersion() {
    p("Saving insiders version:", this.nextVersion)
    const json = Object.assign({}, this.meta, { version: this.nextVersion })
    const path = this.getMetaPath(this.root)
    fs.writeJSONSync(path, json, { spaces: 2 })
  }


  getMeta(root) {
    return fs.readJsonSync(this.getMetaPath(root))
  }

  getMetaPath(dir) {
    return path.join(dir, "package.json")
  }
}
