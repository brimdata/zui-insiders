import path from "node:path"
import fs from "fs-extra"

const p = (...args) => console.log("‣", ...args)
function updateJSONFile(file, key, value) {
    const json = fs.readJSONSync(file)
    json[key] = value
    fs.writeJSONSync(file, json, { spaces: 2 })
}

const file = process.argv[2]
const key = process.argv[3]
const filePath = path.join(process.cwd(), file)

const json = fs.readJSONSync(file)
console.log(json[key])
