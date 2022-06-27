/**
 * This will write the release-notes to a file.
 */

import fs from "fs-extra"
import path from "node:path"

const p = (...args) => console.log("‣", ...args)
const dest = process.argv[2]
if (!dest) {
    console.log("Missing arg: provide the destination for the release notes file")
    process.exit(1)
}

const content = `
You've been updated to the latest version of Zui Insiders. 

Published on ${new Date().toLocaleDateString()}.

For a summary of changes, reference the (commits)[https://github.com/brimdata/brim/commits/main] on the main branch of brimdata/zui.
`

const file = path.join(process.cwd(), dest)
fs.writeFileSync(file, content)

p("Wrote to File: ", file)
p("Content:", content)
