import { InsidersPackager } from "./packager.js"

const p = (...args) => console.log("‣", ...args)
const pkg = new InsidersPackager("../brim")

pkg.injectAppPackageJSON()
pkg.saveVersion()
