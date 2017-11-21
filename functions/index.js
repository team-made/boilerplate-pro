// require('firebase/firestore')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const axios = require('axios')
const express = require('express')
// const cookieParser = require('cookie-parser')()
const cors = require('cors')({ origin: true })
const app = express()

const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token')
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !req.cookies.__session
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    )
    res.status(403).send('Unauthorized')
  }
  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    console.log('Found "Authorization" header')
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    console.log('Found "__session" cookie')
    // Read the ID Token from cookie.
    idToken = req.cookies.__session
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken)
      req.user = decodedIdToken
      next()
    })
    .catch(error => {
      console.error('Error while verifying Firebase ID token:', error)
      res.status(403).send('Unauthorized')
    })
}

app.use(cors)
// app.use(cookieParser)
// app.use(validateFirebaseIdToken)

app.post('*', (request, response) => {
  const { token } = request.body
  console.log('req: ', request.body)
  // const config = {
  //   headers: {
  //     'Accept': 'application/vnd.travis-ci.2+json',
  //     'User-Agent': 'MyClient/1.0.0',
  //     'Host': 'api.travis-ci.org',
  //     'Content-Type': 'application/json'
  //   }
  // }
  // const data = {
  //   github_token: token
  // }

  axios
    .put(
      'https://api.travis-ci.org/hooks',
      { hook: { id: 16284034, active: true } },
      {
        headers: {
          Authorization: 'token _-9IKX8v3b8wI5yO2H059A',
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      console.log('RES', res)
      response.send(res)
    })
    .catch(err => console.error(err) || response.send(err))

  // axios.post(`https://api.travis-ci.org/auth/github`, data, config).then(result => {
  //   cors(request, response, () => {
  //     response.send(result.data)
  //   })
  // })
})

exports.travisRequest = functions.https.onRequest(app)

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   cors(request, response, () => {
//     response.send('Hello from Firebase!')
//   })
// })
