/* global describe it */
const { expect } = require('chai')
const CherryTypeormConnector = require('../../src/connector')

describe('CherryTypeormConnector class', () => {
  const connector = new CherryTypeormConnector()
  const connector2 = new CherryTypeormConnector()
  const connector3 = new CherryTypeormConnector()

  it('Test the identifier constant', () => {
    expect(CherryTypeormConnector.getIdentifier()).to.be.equal('DatabaseEngine')
  })

  it('Test the checkOptions method', () => {
    expect(() => connector.checkOptions({
      host: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      type: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      type: 'test',
      host: 'test',
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      type: 'test',
      host: 'test',
      port: 'test',
      password: 'test',
      database: 'test',
      synchronize: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      type: 'test',
      host: 'test',
      port: 'test',
      username: 'test',
      database: 'test',
      synchronize: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      type: 'test',
      host: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      synchronize: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      type: 'test',
      host: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      database: 'test'
    })).to.throw()

    /* Working connection */

    expect(() => connector.checkOptions({
      type: 'mysql',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '',
      database: 'test_database',
      synchronize: false
    })).to.not.throw()

    connector2.checkOptions([
      {
        name: 'default2',
        type: 'mysql',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '',
        database: 'test_database',
        synchronize: false,
        postConnectionProcess: () => {
          return 2
        }
      },
      {
        name: 'default3',
        type: 'mysql',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '',
        database: 'test_database',
        synchronize: false
      }
    ])

    expect(() => connector3.checkOptions({
      name: 'default4',
      type: 'mysql',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '',
      database: 'test_database',
      synchronize: false,
      postConnectionProcess: () => {
        return 3
      }
    })).to.not.throw()
  })

  it('Test the connectDatabase (one db, no post process) method', async () => {
    try {
      return connector.connectDatabase()
    } catch (error) {
      return Promise.reject(error.message)
    }
  })

  it('Test the connectDatabase (multi db) method', async () => {
    try {
      return connector2.connectDatabase()
    } catch (error) {
      return Promise.reject(error.message)
    }
  })

  it('Test the connectDatabase (one db, with post process) method', async () => {
    try {
      return connector3.connectDatabase()
    } catch (error) {
      return Promise.reject(error.message)
    }
  })

  it('Test the postConnectionProcess method', async () => {
    const defaultResult = await connector.postConnectionProcess()
    const defaultResult2 = await connector2.postConnectionProcess()
    const defaultResult3 = await connector3.postConnectionProcess()

    expect(defaultResult).to.be.equal(1)
    expect(JSON.stringify(defaultResult2)).to.be.equal(JSON.stringify([2, null]))
    expect(defaultResult3).to.be.equal(3)
  })

  it('Test the getConnection method', () => {
    expect(connector.getConnection()).to.not.be.equal(null)
  })

  it('Test the closeConnection method', async () => {
    await Promise.all([
      connector.closeConnection(),
      connector2.closeConnection(),
      connector3.closeConnection()
    ])
  })
})
