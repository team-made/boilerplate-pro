const functions = require('firebase-functions')
// const algoliasearch = require('algoliasearch')
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //

// const ALGOLIA_ID = functions.config().algolia.app_id
// const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key

// const ALGOLIA_INDEX_NAME = 'boilerplates'
// const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

// // Update the search index every time a blog post is written.
// exports.onNoteCreated = firestore.document('notes/{noteId}').onCreate(event => {
//   // Get the note document
//   const note = event.data.data()

//   // Add an "objectID" field which Algolia requires
//   note.objectID = event.params.postId

//   // Write to the algolia index
//   const index = client.initIndex(ALGOLIA_INDEX_NAME)
//   return index.saveObject(note)
// })
