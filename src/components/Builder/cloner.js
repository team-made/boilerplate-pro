import axios from 'axios'
export default class GHCloner {
  constructor (destRepo, destUser, userToken, sourceRepo, sourceUser) {
    this.status = 'initializing'
    this.destinationRepo = destRepo
    this.destinationUser = destUser
    this.userToken = userToken
    this.sourceRepo = sourceRepo
    this.sourceUser = sourceUser
    console.log(
      `cloner initialized: [Dest Repo] ${this
        .destinationRepo} [Dest User] ${this
        .destinationUser} [User Token] ${this.userToken} [Sour Repo] ${this
        .sourceRepo} [Sour User] ${this.sourceUser}`
    )
    this.status = 'initialized'
  }

  async getGit (path) {
    console.log('inside of getGit')
    this.status = `fetching: ${path}`
    try {
      let result = await axios.get(
        `https://api.github.com/${path}?access_token=${this.userToken}`
      )
      this.status = `fetched: ${path}`
      return result
    } catch (err) {
      console.log(`error in getGit: ${err}`)
    }
  }
  async putGit (path, data) {
    console.log('inside of putGit')
    const config = {
      headers: {
        Authorization: `token ${this.userToken}`,
        'User-Agent': 'BoilerPlatePro'
      }
    }
    try {
    } catch (err) {
      console.log(`error in putGit: ${err}`)
    }
  }

  async getContents (path = '') {
    console.log('inside of getContents')
    const basePath = `repos/${this.sourceUser}/${this
      .sourceRepo}/contents/${path}`
    try {
      const get = await this.getGit(basePath)
      const result = await get.data
      return result
    } catch (err) {
      console.log(`error in getContents: ${err}`)
    }
  }

  async cloneFile () {
    console.log('inside of cloneFile')
    try {
      this.putGit()
    } catch (err) {
      console.log(`error in cloneFile: ${err}`)
    }
  }
}
