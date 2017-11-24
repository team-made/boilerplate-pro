const functions = require('firebase-functions')
const axios = require('axios')
const Cloner = require('./cloner')

exports.hyperClone = functions.http.onRequest((request, response) => {
  const body = JSON.parse(request.body)
  console.log('body', body)

  const clone = new Cloner(
    body.repoName,
    body.githubUsername,
    body.githubToken,
    body.name,
    body.owner
  )

  async function start () {
    console.log('clone file', dirContent)
    response.send('done!')
  }

  start()
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.getTravis = functions.https.onRequest((request, response) => {
//   axios
//     .get('https://api.travis-ci.org/repos/danraybernard/senior-enrichment')
//     .then(res => {
//       console.log(res.data)
//       return res.data
//     })
//     .then(data => response.send(data))
//     .catch(err => response.send('ERROR', err))
// })

exports.authTravis = functions.https.onRequest((request, response) => {
  const body = JSON.parse(request.body)
  console.log('DATA token:', body.token)
  const config = {
    headers: {
      Accept: 'application/vnd.travis-ci.2+json',
      'User-Agent': 'MyClient/1.0.0',
      Host: 'api.travis-ci.org',
      'Content-Type': 'application/json'
    }
  }
  axios
    .post(
      'https://api.travis-ci.org/auth/github',
      { github_token: body.token },
      config
    )
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .then(data => response.send(data))
    .catch(err => response.send('ERROR', err))
})
