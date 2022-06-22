import semver from "semver"

const date = new Date()
function suffix(date) {
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    ].join(".")
}

const a = `1.1.1-dev.${suffix(new Date(2022, 0, 1))}`
const b = `1.1.1-dev.${suffix(new Date(2022, 0, 2))}`

console.log(semver.gte(b, a))
