const dummyHtml =
'<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head><body><h1>MY USER APP</h1></body><footer></footer></html>'
const dummyApiJSON = JSON.stringify({
  name: 'Rubils',
  description: 'A template.'
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
export const apiJSONFileCreator = function () {
  let contentObj = {
    message: 'f(apiJSON):testing github api file creation',
    committer: {
      name: 'Mitchell Stewart',
      email: 'mitchellwstewart@gmail.com'
    },
    content: `${window.btoa(dummyApiJSON)}`
  }
  return contentObj
}
