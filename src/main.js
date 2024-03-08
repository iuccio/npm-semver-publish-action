const core = require('@actions/core')
const exec = require('@actions/exec')
const cmd = require('./cmd-exec')

const PATCH_MSG = '[PATCH]'
const MAJOR_MSG = '[MAJOR]'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const targetBranch = core.getInput('target-branch', { required: true })
    core.debug(`current target branch = ${targetBranch}`)
    console.log(`current target branch = ${targetBranch}`)
    const currentBranch = await cmd.getCurrentBranch()
    const currentCommitMsg = await cmd.getCommitMessage()

    if (targetBranch === currentBranch) {
      core.debug('Start versioning..')
      console.log('Start versioning..')
      if (currentCommitMsg.includes(PATCH_MSG)) {
        core.debug('Executing new PATCH release...')
        console.log('Executing new PATCH release...')
        await cmd.execNpmVersion(PATCH_MSG)
      } else if (currentCommitMsg.includes(MAJOR_MSG)) {
        await cmd.execNpmVersion(MAJOR_MSG)
        core.debug('Executing new MAJOR release...')
        console.log('Executing new MAJOR release...')
      } else {
        core.debug('Executing new MINOR release...')
        console.log('Executing new MINOR release...')
        await cmd.execNpmVersion()
      }
      core.debug('Executing npm publish...')
      console.log('Executing npm publish...')
      await cmd.execNpmPublish()
      core.debug('Executing git pushing...')
      console.log('Executing git pushing...')
      await cmd.execGitPush()
    } else {
      core.debug(
        `A new release version is only bumped on branch: ${targetBranch}`
      )
      console.log(
        `A new release version is only bumped on branch: ${targetBranch}`
      )
    }

    //exec.exec('npm', ['version', 'patch', '--force'])

    // Set outputs for other workflow steps to use
    core.setOutput('version', 'v.0.0.1')
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = { run }
