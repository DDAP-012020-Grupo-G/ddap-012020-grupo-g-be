const { expect } = require('chai')
const { describe, it, equal, to } = require('mocha')
var fs = require('file-system')

describe('Files in controllers folder', () => {
  it('has .controller.js suffix', (done) => {
    var allFilesOk = true
    fs.recurseSync('app/controllers', function(filepath, relative, filename) { 
      allFilesOk = allFilesOk && filename.includes('.controller.js')
    })
    expect(allFilesOk).to.equal(true)
    done()

  })
})

describe('Files in models folder', () => {
  it('has .model.js suffix', (done) => {
    var allFilesOk = true
    fs.recurseSync('app/models', function(filepath, relative, filename) { 
      allFilesOk = allFilesOk && filename.includes('.model.js')
    })
    expect(allFilesOk).to.equal(true)
    done()

  })
})

describe('Files in services folder', () => {
  it('has .service.js suffix', (done) => {
    var allFilesOk = true
    fs.recurseSync('app/services', function(filepath, relative, filename) { 
      allFilesOk = allFilesOk && filename.includes('.service.js')
    })
    expect(allFilesOk).to.equal(true)
    done()

  })
})

describe('Files in api-tests folder', () => {
  it('has .controller.test.js suffix', (done) => {
    var allFilesOk = true
    fs.recurseSync('tests/api-tests', function(filepath, relative, filename) { 
      allFilesOk = allFilesOk && filename.includes('.controller.test.js')
    })
    expect(allFilesOk).to.equal(true)
    done()

  })
})