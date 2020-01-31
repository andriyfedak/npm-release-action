const path = require('path')
const core = require('@actions/core');
const { GitHub, context} = require('@actions/github');

function getCurrentVerison() {
  const { version } = require(path.join(process.env.GITHUB_WORKSPACE, 'package.json'));
  core.exportVariable("NPM_CURRENT_VERSION", version);
  return version
}

function getCurrentRelease() {
  octokit = new GitHub(process.env.GITHUB_TOKEN);
  const { owner, repo } = context.repo;
  return octokit.repos.getLatestRelease({
      owner,
      repo
  })
  .then(res => {
    core.exportVariable("NPM_RELEASE_VERSION", res.data.tag_name);
    return res.data.tag_name
  })
  .catch(() => {
    core.exportVariable("NPM_RELEASE_VERSION", 'none');
    return 'none'
  });
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

