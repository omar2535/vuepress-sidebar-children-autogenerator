# Sidebar children autogenerator for vuepress

![npm (scoped)](https://img.shields.io/npm/v/@omar2535/vuepress-sidebar-children-autogenerator)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@omar2535/vuepress-sidebar-children-autogenerator)

Creates a children object so that you won't have to do it manually

# Install

```sh
npm i @omar2535/vuepress-sidebar-children-autogenerator
```

# Usage

```js
let { generateChildren } = require('@omar2535/vuepress-sidebar-children-autogenerator');
```

then in `.vuepress/config.js`, if we had a directory structure like so:

```
.
+-- .vuepress
+-- notes
|   +-- readme.md
|   +-- course_notes
|       +-- readme.md
|       +-- PHYS100.md
|   +-- random.md
```

adding the following to the sidebar config like so:
```js
sidebar: 
{
  
  '/notes/': generateChildren('/notes/'),
}
```

would result in a replacement like:

```js
sidebar: 
{
  
  '/notes/': [
    {
      title: 'course_notes',
      path: '/notes/course_notes/',
      collapsable: true,
      children: [ '/notes/course_notes/PHYS100.md' ]
    },
    "random.md"
  ],
}
```

# Parameters
|  Param | Required?  | Default  | Result  | 
|---|:-:|---|---|
|  basePath |  True | N/A  |  Base path of folder to generate children from  |
| collapsable  |  false | true  | Whether the children will be collapsable if any subfolders were found  |
| filesToExclude  | false  | ["readme .md"]  |  Excludes file names contained in the array |
| directoreisToExclude| false | [".vuepress", "node_modules", ".git"] | Excludes folder names contained in the array |