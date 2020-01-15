function toDataURL(url, callback) {
  var httpRequest = new XMLHttpRequest()
  httpRequest.onload = function() {
    var fileReader = new FileReader()
    fileReader.onloadend = function() {
      callback(fileReader.result)
    }
    fileReader.readAsDataURL(httpRequest.response)
  }
  httpRequest.open('GET', url)
  httpRequest.responseType = 'blob'
  httpRequest.send()
}

export default toDataURL
