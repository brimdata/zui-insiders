import { Octokit } from "@octokit/rest"

const gh = new Octokit()

const release = await gh.rest.repos.getLatestRelease({
    owner: "brimdata",
    repo: "zui-insiders"
})

console.log(release.data.tag_name.slice(1)) // Remove the v
