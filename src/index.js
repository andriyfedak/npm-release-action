const path = require('path')
const core = require('@actions/core');
const {GitHub, context} = require('@actions/github');

function getCurrentVerison() {
  const {version} = require(path.join(process.env.GITHUB_WORKSPACE, 'package.json'));
  core.exportVariable("NPM_PKG_VERSION", version);
  return version
}

async function getCurrentRelease() {
  console.log(context.GITHUB_TOKEN);
  // octokit = new GitHub(context.GITHUB_TOKEN);
  // const { owner, repo } = context.repo;
  // const release = await octokit.getLatestRelease({
  //   owner,
  //   repo
  // });
  // core.exportVariable("NPM_CURRENT_VERSION", version);
  // return release;
  return '1.0.0'
}

(async () => {
  try {
    const currentRelease = await getCurrentRelease();
    const curenttVersion = getCurrentVerison();

    console.log('Current tag: ',currentTag);
    console.log('Current version: ', currentVersion);
    console.log('Samever: ', currentVersion === currentTag);

  } catch (error) {
    core.setFailed(error.message);
  }
})()

