const dummyHtml =
'<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head><body><h1>MY USER APP</h1></body><footer></footer></html>'
const dummyAppJSON = JSON.stringify({
  name: 'Rubils',
  description: 'A template.'
})
const dummyYaml = JSON.stringify({

  'language': 'node_js',
  'node_js': 'node',
  'cache': {
    'directories': [
      'node_modules'
    ]
  },
  'script': [
    'npm build'
  ],
  'group': 'stable',
  'dist': 'trusty',
  'os': 'linux'

})

export const indexHTMLFileCreator = function (content) {
  let contentObj = {
    message: 'feat(HTML):testing github api file creation',
    committer: {
      name: 'Mitchell Stewart',
      email: 'mitchellwstewart@gmail.com'
    },
    content: `${window.btoa(dummyHtml)}`
  }
  return contentObj
}
export const appJSONFileCreator = function () {
  let contentObj = {
    message: 'f(appJSON):testing github app file creation',
    committer: {
      name: 'Mitchell Stewart',
      email: 'mitchellwstewart@gmail.com'
    },
    content: `${window.btoa(dummyAppJSON)}`
  }
  return contentObj
}
export const yamlFileCreator = function (content) {
  let contentObj = {
    message: 'feat(Yml): testing github api file creation',
    committer: {
      name: 'Mitchell Stewart',
      email: 'mitchellwstewart@gmail.com'
    },
    content: `${window.btoa(dummyYaml)}`
  }
  return contentObj
}
