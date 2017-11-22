const functions = require('firebase-functions')
const axios = require('axios')

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
  console.log('type: ', typeof request.body, 'req:', request.body, 'DATA token:', Object.keys(request.body)[0])
  const token = Object.keys(request.body)[0]
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
      { github_token: token },
      config
    )
    .then(res => {
      console.log('res', res)
      response.status(200).send(res)
    })
    .catch(err => response.status(500).send('ERROR', err))
})
