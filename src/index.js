const path = require('path')
const core = require('@actions/core');
const {GitHub, context} = require('@actions/github');

function getCurrentVerison() {
  const {version} = require(path.join(process.env.GITHUB_WORKSPACE, 'package.json'));
  core.exportVariable("NPM_CURRENT_VERSION", version);
  return version
}

async function getCurrentRelease() {
  octokit = new GitHub(process.env.GITHUB_TOKEN);
  const { owner, repo } = context.repo;
  const release = await octokit.repos.getLatestRelease({
    owner,
    repo
  });
  core.exportVariable("NPM_RELEASE_VERSION", version);
  return release;
}

(async () => {
  try {
    const currentRelease = await getCurrentRelease();
    const curenttVersion = await getCurrentVerison();

    console.log('Current tag: ',currentTag);
    console.log('Current version: ', currentVersion);
    console.log('Samever: ', currentVersion === currentTag);

  } catch (error) {
    core.setFailed(error.message);
  }
})()

