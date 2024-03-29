const core = require('@actions/core')
const exec = require('@actions/exec')
const cmd = require('./cmd-exec')
const help = require('./action-helper')

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
    const provenance = await core.getInput('provenance', {
      required: false
    })
    const currentBranch = await cmd.getCurrentBranch()
    core.info(
      `Target branch = ${targetBranch}. Current branch = ${currentBranch}`
    )

    const currentCommitMsg = await cmd.getCommitMessage()
    if (String.toString(targetBranch) === String.toString(currentBranch)) {
      core.info('Start versioning..')
      const versioningTypeToApply = help.calculateVersionType(currentCommitMsg)
      await cmd.execNpmVersion(versioningTypeToApply)
      core.info('Executing npm publish...')
      await cmd.execNpmPublish(provenance)
      core.info('Executing git pushing...')
      await cmd.execGitPush()
    } else {
      core.info(
        `A new release version is only bumped on branch: ${targetBranch}`
      )
    }
    const newVersionTag = await cmd.getLastTag()
    core.info(`Succsessfully published new version: ${newVersionTag}`)
    // Set outputs for other workflow steps to use
    core.setOutput('version', newVersionTag)
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = { run }
