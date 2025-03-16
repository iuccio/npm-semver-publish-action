const helper = require('../src/action-helper')

describe('index', () => {
  it('should retrun major with [major]', async () => {
    // when
    const res = helper.calculateVersionType('Best ever feature [major]')
    // then

    expect(res).toEqual('major')
  })

  it('should retrun major with [MAJOR]', async () => {
    // when
    const res = helper.calculateVersionType('Best ever feature [major]')
    // then

    expect(res).toEqual('major')
  })

  it('should retrun patch with [patch]', async () => {
    // when
    const res = helper.calculateVersionType('Best ever feature fix [patch]')
    // then

    expect(res).toEqual('patch')
  })

  it('should retrun patch with [PATCH]', async () => {
    // when
    const res = helper.calculateVersionType('Best ever feature fix [patch]')
    // then

    expect(res).toEqual('patch')
  })

  it('should retrun minor', async () => {
    // when
    const res = helper.calculateVersionType('Best ever feature update')
    // then

    expect(res).toEqual('minor')
  })
})
