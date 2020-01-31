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
    const version = res.data.tag_name.replace(/[a-zA-Z\s]+/, '');
    core.exportVariable("NPM_RELEASE_VERSION", version);
    return version
  })
  .catch(() => {
    core.exportVariable("NPM_RELEASE_VERSION", 'none');
    return 'none'
  });
}

function createNewRelease(version) {
  octokit = new GitHub(process.env.GITHUB_TOKEN);
  const { owner, repo } = context.repo;
  return octokit.repos.createRelease({
    owner,
    repo,
    version,
    name: `Release v${version}`
  });
}

(async () => {
  try {
    const currentRelease = await getCurrentRelease();
    const currentVersion = await getCurrentVerison();

    console.log('Current tag: ', currentRelease);
    console.log('Current version: ', currentVersion);

    if (currentRelease !== currentVersion) {
      console.log('Creating new release: ', currentVersion);
      await createNewRelease(currentVersion);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})()

