const path = require('path')
const core = require('@actions/core');
const github = require('@actions/github');

function getCurrentVerison() {
  const {version} = require(path.resolve(process.env.GITHUB_WORKSPACE, 'package.json'));
  core.exportVariable("NPM_PKG_VERSION", version);
  return version
}

function getCurrentTag() {
  const ref = github.context.ref;
  const tagPath = "refs/tags/";
  if (ref && ref.startsWith(tagPath)) {
    const tag = ref.substr(tagPath.length, ref.length);
    core.exportVariable("GITHUB_TAG_NAME", tag);
    return tag
  }
}

try {
  const currentTag = getCurrentTag();
  const curenttVersion = getCurrentVerison();

  console.log('Current tag: ',currentTag);
  console.log('Current version: ', currentVersion);
  console.log('Samever: ', currentVersion === currentTag);

} catch (error) {
  core.setFailed(error.message);
}