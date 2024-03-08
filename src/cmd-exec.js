const exec = require('@actions/exec')
const core = require('@actions/core')

let output = ''

const options = {}
options.listeners = {
  stdout: data => {
    output = data.toString()
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

async function execNpmPublish(versioningType) {
  const RELEASE_COMMIT_MSG = 'new release [skip ci]'
  const verType = getVersioningType(versioningType)
  await exec.exec(
    'npm',
    ['version', verType, '--force', '-m', RELEASE_COMMIT_MSG],
    options
  )
  core.debug(`npm = ${output}`)
  console.log(`npm = ${output}`)
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

module.exports = { getCommitMessage, getCurrentBranch, execNpmPublish }
