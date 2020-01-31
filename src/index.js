const path = require('path')
const core = require('@actions/core');
const { GitHub, context} = require('@actions/github');

function getCurrentVerison() {
  const { version } = require(path.join(process.env.GITHUB_WORKSPACE, 'package.json'));
  return version;
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
    return version
  })
  .catch(() => {
    return 'none'
  });
}

function createNewRelease(version) {
  octokit = new GitHub(process.env.GITHUB_TOKEN);
  const { owner, repo } = context.repo;
  return octokit.repos.createRelease({
    owner,
    repo,
    tag_name: version,
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

