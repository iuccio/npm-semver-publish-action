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
    const targetBranch = await core.getInput('target-branch', {
      required: true
    })
    core.info(`current target branch = ${targetBranch}`)
    console.log(`current target branch = ${targetBranch}`)
    const currentBranch = await cmd.getCurrentBranch()
    const currentCommitMsg = await cmd.getCommitMessage()
    if (String.toString(targetBranch) === String.toString(currentBranch)) {
      core.info('Start versioning..')
      console.log('Start versioning..')
      if (currentCommitMsg.includes(PATCH_MSG)) {
        core.info('Executing new PATCH release...')
        console.log('Executing new PATCH release...')
        await cmd.execNpmVersion(PATCH_MSG)
      } else if (currentCommitMsg.includes(MAJOR_MSG)) {
        await cmd.execNpmVersion(MAJOR_MSG)
        core.info('Executing new MAJOR release...')
        console.log('Executing new MAJOR release...')
      } else {
        core.info('Executing new MINOR release...')
        console.log('Executing new MINOR release...')
        await cmd.execNpmVersion()
      }
      core.info('Executing npm publish...')
      console.log('Executing npm publish...')
      await cmd.execNpmPublish()
      core.info('Executing git pushing...')
      console.log('Executing git pushing...')
      await cmd.execGitPush()
    } else {
      core.info(`current ${currentBranch} - target branch = ${targetBranch}`)
      console.log(`current ${currentBranch} - target branch = ${targetBranch}`)
      core.info(
        `A new release version is only bumped on branch: ${targetBranch}`
      )
      console.log(
        `A new release version is only bumped on branch: ${targetBranch}`
      )
    }
    // Set outputs for other workflow steps to use
    core.setOutput('version', 'v.0.0.1')
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = { run }
