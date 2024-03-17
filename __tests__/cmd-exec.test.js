const cmd = require('../src/cmd-exec')
const exec = require('@actions/exec')
const execMock = jest.spyOn(exec, 'exec').mockImplementation()

describe('command exec', () => {
  it('should exec git push', async () => {
    //given
    execMock.mockImplementation()
    //when
    const res = cmd.execGitPush()
    //then

    expect(exec.exec).toHaveBeenCalled()
  })

  it('should exec npm publish', async () => {
    //given
    execMock.mockImplementation()
    //when
    const res = cmd.execNpmPublish()
    //then

    expect(exec.exec).toHaveBeenCalled()
  })
  it('should exec npm version', async () => {
    //given
    execMock.mockImplementation()
    //when
    const res = cmd.execNpmVersion('patch')
    //then

    expect(exec.exec).toHaveBeenCalled()
  })

  it('should exec commit message', async () => {
    //given
    execMock.mockImplementation()
    //when
    const res = cmd.getCommitMessage()
    //then

    expect(exec.exec).toHaveBeenCalled()
  })

  it('should exec get current branch', async () => {
    //given
    execMock.mockImplementation()
    //when
    const res = cmd.getCurrentBranch()
    //then

    expect(exec.exec).toHaveBeenCalled()
  })

  it('should exec get last tag', async () => {
    //given
    execMock.mockImplementation()
    //when
    const res = cmd.getLastTag()
    //then

    expect(exec.exec).toHaveBeenCalled()
  })
})
