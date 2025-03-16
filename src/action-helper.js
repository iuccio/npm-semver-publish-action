function calculateVersionType(currentCommitMsg) {
  if (currentCommitMsg.toLowerCase().includes('[PATCH]'.toLocaleLowerCase())) {
    return 'patch'
  }
  if (currentCommitMsg.toLowerCase().includes('[MAJOR]'.toLowerCase())) {
    return 'major'
  }
  return 'minor'
}

module.exports = { calculateVersionType }
