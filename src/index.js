const path = require('path')
const core = require('@actions/core');
const { GitHub, context} = require('@actions/github');

function getCurrentVerison() {
  const { version } = require(path.join(process.env.GITHUB_WORKSPACE, 'package.json'));
  core.exportVariable("NPM_CURRENT_VERSION", version);
  return version
}

async function getCurrentRelease() {
  octokit = new GitHub(process.env.GITHUB_TOKEN);
  const { owner, repo } = context.repo;
  let release;
  try {
     const res = await octokit.repos.getLatestRelease({
      owner,
      repo
    });
    if (res.data && res.data.tag_name) {
      relese = res.data.tag_name
    }
  } catch(e) {
    relese = null;
  }
  core.exportVariable("NPM_RELEASE_VERSION", release);
  return release;
}

(async () => {
  try {
    const currentRelease = await getCurrentRelease();
    const curenttVersion = await getCurrentVerison();

    console.log('Current tag: ', currentRelease);
    console.log('Current version: ', curenttVersion);
    console.log('Samever: ', currentVersion === currentRelease);

  } catch (error) {
    console.log(error)
    core.setFailed(error.message);
  }
})()

