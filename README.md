# Zui Insiders

The purpose of this repository is to build a nightly version of the app based on the main branch of the zui repo. 

### What is Zui Insiders?

A stand-alone app for early adopters to get the latest features that are coming to Zui. Here is a summary of it's features:

* Can run side-by-side with Zui stable
* Has it's own data directory
* Receives frequent updates built off the `main` branch of the `brimdata/zui` repo
* Subscribes to this repository's releases for automatic updates
* May occasionally break

### How It Works



This happens in the Github Action workflow named `release.yml`. It runs the following steps:

1. Checkout the `main` branch of `brimdata/zui`
2. Inject the package.json file with properties for Zui Insiders
3. Build the app
4. Create a new release with the build artifacts
5. Bump the version of this repo's package.json

### Injecting package.json

We use [Electron Builder](https://www.electron.build/) to build the app. It will look at the app's package.json to set things like the name, version, and repository. One of the scripts in this repo is called "inject".

````
yarn inject <path_to_app_dir>
````

It will set the app's package.json to the correct values for the next Insider's release.

Example:

```
brimdata/zui-insiders % yarn inject ../zui
‣ Injecting app's package.json with: {
  name: 'zui-insiders',
  productName: 'Zui - Insiders',
  repository: 'https://github.com/brimdata/zui-insiders',
  description: 'Zui for early adoptors with frequent updates.',
  version: '0.30.1-2'
}
```

In this example, I have the zui-insiders repo as a sibling of the zui repo on my file system.

```
brimdata/zui
brimdata/zui-insiders
```

When I ran yarn inject and passed the path the app directory, it created this diff in the zui repo.

```diff
--- a/package.json
+++ b/package.json
@@ -1,11 +1,11 @@
 {
-  "name": "zui",
+  "name": "zui-insiders",
-  "productName": "Zui",
+  "productName": "Zui - Insiders",
-  "description": "Zui Desktop App",
+  "description": "Zui for early adoptors with frequent updates.",
-  "repository": "https://github.com/brimdata/zui",
+  "repository": "https://github.com/brimdata/zui-insiders",
-  "version": "0.30.0",
+  "version": "0.30.1-0",
   "main": "dist/js/electron/main.js",
   ...
```

Now the app will be built with desired properties. 

We also run electron-builder with a special configuration file that overrides the icons and the release strategy. This file lives in the main `zui`repo.

```
yarn electron-builder -c electron-builder-insiders.json
```

And that's how it's built.

### Versioning

The algorithm for choosing the version of each release is as follows.

```
if stableVersion > lastInsidersVersion
	use the stable version
else
	increment the lastInsidersVersion by one "prerelease"
```

Incrementing by one "prerelease" means first bumping the patch number, then adding a numerical suffix that increments by one each time.

```js
semver.inc(version, "prerelease")
/* version     returns
   0.30.0      0.30.1-0
   0.30.1-0    0.30.1-1
   0.30.1-1    0.30.1-2
   and so on ...
*/
```

It's important to rember that in the semver precedence, version `0.1.0` is greater than version `0.1.0-0`.



Based on VSCode's Insiders.
