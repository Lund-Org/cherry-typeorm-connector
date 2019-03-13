/* global describe it */
const { expect } = require('chai')
const CherryTypeormConnector = require('../../src/connector')

describe('CherryTypeormConnector class', () => {
  const connector = new CherryTypeormConnector()

  it('Test the identifier constant', () => {
    expect(CherryTypeormConnector.getIdentifier()).to.be.equal('DatabaseEngine')
  })

  it('Test the checkOptions method', () => {
    expect(() => connector.checkOptions({
      'host': 'test',
      'port': 'test',
      'username': 'test',
      'password': 'test',
      'database': 'test',
      'synchronize': 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      'type': 'test',
      'port': 'test',
      'username': 'test',
      'password': 'test',
      'database': 'test',
      'synchronize': 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      'type': 'test',
      'host': 'test',
      'username': 'test',
      'password': 'test',
      'database': 'test',
      'synchronize': 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      'type': 'test',
      'host': 'test',
      'port': 'test',
      'password': 'test',
      'database': 'test',
      'synchronize': 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      'type': 'test',
      'host': 'test',
      'port': 'test',
      'username': 'test',
      'database': 'test',
      'synchronize': 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      'type': 'test',
      'host': 'test',
      'port': 'test',
      'username': 'test',
      'password': 'test',
      'synchronize': 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      'type': 'test',
      'host': 'test',
      'port': 'test',
      'username': 'test',
      'password': 'test',
      'database': 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      'type': 'mysql',
      'host': 'localhost',
      'port': '3306',
      'username': 'root',
      'password': '',
      'database': 'test_database',
      'synchronize': false
    })).to.not.throw()
  })

  it('Test the connectDatabase method', async () => {
    try {
      return connector.connectDatabase()
    } catch (error) {
      return Promise.reject(error.message)
    }
  })

  it('Test the postConnectionProcess method', async () => {
    let defaultResult = await connector.postConnectionProcess()

    expect(defaultResult).to.be.equal(1)
  })

  it('Test the getConnection method', () => {
    expect(connector.getConnection()).to.not.be.equal(null)
  })

  it('Test the closeConnection method', async () => {
    return connector.closeConnection()
  })
})
