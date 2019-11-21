# Photo site
*Repository of my photo site developed during the tooling cours. Designed to be deployed later*

## Installation:
1. Clone the repository on your computer
2. Open the directory in any modern IDE
3. Check "Node.js" is installed on your machine with npm via ```node --version```
4. Install npm dependencies via your terminal via ```npm install```

You're now ready to go !

## Commands:
**build:11ty :**
Build the site via SSG 11ty in quiet mode
```text
npx eleventy --quiet
```

**build:sass :**
Build the stylesheet from sass to css in compressed mode
```text
node-sass ./src/assets/scss/main.scss ./dist/assets/css/main.css --output-style compressed
```

**build:js :**
   Bundle all js files and transpil the file
   ```text
   webpack --config webppackConfig.js
   ```

**del:dist :**
Delete the specified folder "dist"
```text
del-cli ./dist
```

**build :**
Delete the dist folder then build sass, js and 11ty in parallel
```text
npm-run-all del:dist -p build:**
```

**watch:sass :**
Generate css from sass when file changed
```text
onchange ./src/assets/scss/**/* -- npm run build:sass
```

**watch:11ty :**
Generate the site from 11ty when file changed
```text
onchange ./src/**/* -e ./src/assets/scss/**/* -- npm run build:11ty
```

**serve :**
Start the browserSync watching the dist folder
```text
browser-sync start --server dist --files "dist/**/*"
```

**watch :**
Build the site entirely then serve the site and watch the changes
```text
npm-run-all build -p serve watch:**
```