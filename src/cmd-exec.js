const exec = require('@actions/exec')
const core = require('@actions/core')

let output = ''
let myError = ''

const options = {}
options.listeners = {
  stdout: data => {
    output = data.toString()
  },
  stderr: data => {
    myError = data.toString()
  }
}

async function getCurrentBranch() {
  await exec.exec('git', ['rev-parse', '--abbrev-ref', 'HEAD'], options)
  core.debug(`current git branch namen = ${output}`)
  return output
}

async function getCommitMessage() {
  await exec.exec('git', ['log', '-1', '--pretty=format:%s'], options)
  core.debug(`current git commit msg = ${output}`)
  return output
}

async function execNpmVersion(versioningType) {
  core.debug(`executing npmVersion with = ${versioningType}`)
  const RELEASE_COMMIT_MSG = 'new release [skip ci]'
  core.info(`Executing new ${versioningType.toUpperCase()} release...`)
  await exec.exec(
    'npm',
    ['version', versioningType, '--force', '-m', RELEASE_COMMIT_MSG],
    options
  )
  core.debug(`npm = ${myError}`)
  core.debug(`npm = ${output}`)
  return output
}

async function execNpmPublish(provenance) {
  if (Boolean(provenance) === true) {
    core.debug('Executing publishing with provenance')
    await exec.exec('npm', ['publish', '--provenance'], options)
  } else {
    await exec.exec('npm', ['publish'], options)
  }
  core.debug(`new version ${output} succsessfully published`)
  core.debug(`npm = ${myError}`)
  return output
}

async function execGitPush() {
  await exec.exec('git', ['push', '--follow-tags'], options)
  core.debug(`git commit and tag succsessfully published: ${output}`)
  core.debug(`npm = ${myError}`)
  return output
}

async function getLastTag() {
  await exec.exec('git', ['describe', '--tags', '--abbrev=0'], options)
  core.debug(`git commit and tag succsessfully published: ${output}`)
  core.debug(`npm = ${myError}`)
  return output
}

async function setupGitConfig() {
  await exec.exec(
    'git',
    [
      'config',
      '--global',
      'user.email',
      '41898282+github-actions[bot]@users.noreply.github.com'
    ],
    options
  )
  await exec.exec(
    'git',
    ['config', '--global', 'user.name', 'dependabot'],
    options
  )
  core.debug(`git config user configured: ${output}`)
  core.debug(`npm = ${myError}`)
  return output
}

module.exports = {
  getCommitMessage,
  getCurrentBranch,
  execNpmVersion,
  execNpmPublish,
  execGitPush,
  getLastTag,
  setupGitConfig
}
