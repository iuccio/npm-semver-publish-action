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
  console.log(`current git branch namen = ${output}`)
  return output
}

async function getCommitMessage() {
  await exec.exec('git', ['log', '-1', `--pretty=format:%s`], options)
  core.debug(`current git commit msg = ${output}`)
  console.log(`current git commit msg = ${output}`)
  return output
}

async function execNpmVersion(versioningType) {
  const RELEASE_COMMIT_MSG = 'new release [skip ci]'
  const verType = getVersioningType(versioningType)
  await exec.exec(
    'npm',
    ['version', 'patch', '--force', '-m', RELEASE_COMMIT_MSG],
    options
  )
  core.debug(`npm = ${myError}`)
  console.log(`npm = ${myError}`)
  core.debug(`npm = ${output}`)
  console.log(`npm = ${output}`)
  return output
}

async function execNpmPublish() {
  await exec.exec('npm', ['publish'], options)
  core.debug(`new version ${output} succsessfully published`)
  console.log(`new version ${output} succsessfully published`)
  core.debug(`npm = ${myError}`)
  console.log(`npm = ${myError}`)
  return output
}

async function execGitPush() {
  await exec.exec('git', ['push', '--follow-tags'], options)
  core.debug(`git commit and tag succsessfully published: ${output}`)
  console.log(`git commit and tag succsessfully published: ${output}`)
  core.debug(`npm = ${myError}`)
  console.log(`npm = ${myError}`)
  return output
}

function getVersioningType(versioningType) {
  if (versioningType === '[PATCH]') {
    return 'patch'
  }
  if (versioningType === '[MAJOR]') {
    return 'major'
  }
  return 'minor'
}

module.exports = {
  getCommitMessage,
  getCurrentBranch,
  execNpmVersion,
  execNpmPublish,
  execGitPush
}
