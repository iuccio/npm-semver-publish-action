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

module.exports = { getCommitMessage, getCurrentBranch }
