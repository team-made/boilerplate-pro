import axios from 'axios'
export default class GHCloner {
  constructor (destRepo, destUser, userToken, sourceRepo, sourceUser) {
    this.gitHubAPI = 'https://api.github.com'
    this.status = 'initializing'
    this.destinationRepo = destRepo
    this.destinationUser = destUser
    this.userToken = userToken
    this.sourceRepo = sourceRepo
    this.sourceUser = sourceUser
    this.requestHeaders = {
      headers: {
        Authorization: `token ${this.userToken}`,
        'User-Agent': 'BoilerPlatePro'
      }
    }
    console.log(
      `cloner initialized: [Dest Repo] ${this
        .destinationRepo} [Dest User] ${this
        .destinationUser} [User Token] ${this.userToken} [Sour Repo] ${this
        .sourceRepo} [Sour User] ${this.sourceUser}`
    )
    if (
      !this.destinationRepo ||
      !this.destinationUser ||
      !this.userToken ||
      !this.sourceRepo ||
      !this.sourceUser
    ) {
      throw new Error('Missing a required field in cloner.')
    }
    this.status = 'initialized'
  }

  newRepoObj () {
    return {
      name: this.destinationRepo,
      description: 'Your new repo created by https://BoilerPlate.Pro.',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true
    }
  }

  makeCommitWithData (data) {
    return {
      message: 'Initialized Repository',
      committer: {
        name: 'BoilerPlate.Pro',
        email: 'DoNotEmail@BoilerPlate.Pro'
      },
      content: `${window.btoa(data)}`
    }
  }

  async getGit (path) {
    const URI = `${this.gitHubAPI}/${path}?access_token=${this.userToken}`
    console.log(`inside of getGit --> ${URI}`)
    try {
      return await axios.get(URI)
    } catch (err) {
      console.log(`error in getGit: ${err}`)
    }
  }

  async postGit (path, data) {
    const URI = `${this.gitHubAPI}/${path}?access_token=${this.userToken}`
    console.log(`inside of postGit --> ${URI}`)
    try {
      return await axios.post(URI, data, this.requestHeaders)
    } catch (err) {
      console.log(`error in getGit: ${err}`)
    }
  }

  async putGit (path, data) {
    const URI = `${this.gitHubAPI}/${path}?access_token=${this.userToken}`
    console.log(`inside of putGit --> ${URI} `)
    try {
      return await axios.put(URI, data, this.requestHeaders)
    } catch (err) {
      console.log(`error in putGit: ${err}`)
    }
  }

  async createRepo () {
    try {
      const path = `user/repos`
      return await this.postGit(path, this.newRepoObj())
    } catch (err) {
      console.log(`err in createRepo: ${err}`)
    }
  }

  async getContents (path = '') {
    console.log('inside of getContents')
    const basePath = `repos/${this.sourceUser}/${this
      .sourceRepo}/contents/${path}`
    try {
      const get = await this.getGit(basePath)
      const result = await get.data
      return await result
    } catch (err) {
      console.log(`error in getContents: ${err}`)
    }
  }

  async readFileContents (fileName, path = '') {
    const basePath = `repos/${this.sourceUser}/${this
      .sourceRepo}/contents/${path}${fileName}`
    try {
      let result = await this.getGit(basePath)
      result = await result.data.content
      result = await window.atob(result)
      return await result
    } catch (err) {
      console.log(`error in getFileContents: ${err}`)
    }
  }

  async writeFileContents (fileName, path = '', data) {
    const commitWithData = this.makeCommitWithData(data)
    const basePath = `repos/${this.destinationUser}/${this
      .destinationRepo}/contents/${path}${fileName}`
    try {
      return await this.putGit(basePath, commitWithData)
    } catch (err) {
      console.log(`error in writeFileContents: ${err}`)
    }
  }

  async readAndWriteFile (fileName, path = '') {
    try {
      const originalFileContents = await this.readFileContents(fileName, path)
      return await this.writeFileContents(fileName, path, originalFileContents)
    } catch (err) {
      console.log(`error in readAndWriteFile: ${err}`)
    }
  }

  async cloneFile (path, filename) {
    console.log('inside of cloneFile')
    // const basePath = `repos/${this.destinationUser}/${this
    //   .destinationRepo}/contents/${fileName}`
    try {
      // this.putGit()
    } catch (err) {
      console.log(`error in cloneFile: ${err}`)
    }
  }
}
