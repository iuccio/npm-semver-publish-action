/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const main = require('../src/main')
const cmd = require('../src/cmd-exec')

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug').mockImplementation()
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
const getCurrentBranchMock = jest
  .spyOn(cmd, 'getCurrentBranch')
  .mockImplementation()
const getCommitMessageMock = jest
  .spyOn(cmd, 'getCommitMessage')
  .mockImplementation()
const execNpmPublish = jest.spyOn(cmd, 'execNpmPublish').mockImplementation()
const execNpmVersion = jest.spyOn(cmd, 'execNpmVersion').mockImplementation()
const execGitPush = jest.spyOn(cmd, 'execGitPush').mockImplementation()

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')
describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('execute action', async () => {
    //given
    getInputMock.mockImplementation(name => {
      return 'master'
    })
    getCurrentBranchMock.mockImplementation(name => {
      return 'master'
    })
    getCommitMessageMock.mockImplementation(name => {
      return 'bug fixing [PATCH]'
    })
    execNpmPublish.mockImplementation(name => {
      return 'v.0.0.1'
    })
    execNpmVersion.mockImplementation({})
    execGitPush.mockImplementation({})
    //when
    await main.run()

    //then
    expect(runMock).toHaveReturned()
  })
})
