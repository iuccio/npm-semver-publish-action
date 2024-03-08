const core = require('@actions/core')
const exec = require('@actions/exec')
const command = require('./command-helper')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const branch = await command.getCurrentBranch()
    const commitMsg = await command.getCommitMessage()
    //exec.exec('npm', ['version', 'patch', '--force'])
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = { run }
