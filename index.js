var path = require('path')
const fs = require('fs');

function generateSidebarContents(dirPath, children, collapsable, filesToExclude, directoriesToExclude) {
  fs.readdirSync(dirPath, { withFileTypes: true }).forEach(file => {
    let fullPath = `${dirPath}${file.name}/`;
    if (file.isDirectory()) {
      if (!directoriesToExclude.includes(file.name)) {
        let dirChildren = generateSidebarContents(fullPath, [], collapsable, filesToExclude, directoriesToExclude);
        children.push({
          title: file.name,
          path: fullPath.substr(1),
          collapsable: collapsable,
          children: dirChildren
        });
      }
    } else {
      if (path.extname(file.name) === ".md" && !filesToExclude.includes(file.name.toLowerCase()) && !filesToExclude.includes(file.name)) {
        children.push(fullPath.slice(1, -1));
      }
    }
  });
  return children;
}

/**
 * Find all markdown files with path and creates a children object for the sidebar
 * @param {string} basePath the base path to the directory with children from the project's root. Example: ./notes/
 * @param {boolean} [collapsable=true] whether or not this sidebars children will be collapsable. Defaults to true
 * @param {string[]} [filesToExclude=["readme.md"]] exact file names to exclude as an array, defaults to ['readme.md']
 * @param {string[]} [directoriesToExclude] the directories that should not be added to children,
 *                                     defaults to ['.vuepress', 'node_modules', '.git']
 * @returns {object[]} children as an array
 */
function generateChildren(basePath, collapsable, filesToExclude, directoriesToExclude) {
  if (!basePath.startsWith(".")) basePath = `.${basePath}`;
  if (!basePath.endsWith('/')) basePath = `${basePath}/`

  return generateSidebarContents(basePath, [],
    collapsable || true,
    filesToExclude || ['readme.md'],
    directoriesToExclude || ['.vuepress', 'node_modules', '.git']);
}

module.exports = generateChildren;
