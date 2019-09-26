const Typeorm = require('typeorm')

/**
 * The connector to use Typeorm with cherry
 * You can register it as a plugin using this following code
 * @example
 * const Cherry = require('@lundOrg/cherry')
 * const CherryTypeormConnector = require('@lundOrg/cherry-typeorm-connector')
 *
 * const cherry = new Cherry()
 * // cherry.configure(your_routes, [], your_options) <= TO UPDATE LATER
 * cherry.registerPlugin(CherryTypeormConnector)
 * cherry.start(options)
 */
class CherryTypeormConnector {
  /**
   * The connector to use Typeorm with cherry
   */
  constructor () {
    this.connection = null
    this.options = {}
  }

  /**
   * Get the type of plugin
   * @return {string}
   */
  static getIdentifier () {
    return 'DatabaseEngine'
  }

  /**
   * Check if there are at least the minimum options required
   * @param {object} options The options to connect to the database
   */
  checkOptions (options) {
    if (Array.isArray(options)) {
      options.forEach((option) => {
        this.checkOptions(option)
      })
    } else {
      [
        'type',
        'host',
        'port',
        'username',
        'password',
        'database',
        'synchronize'
      ].forEach((key) => {
        if (typeof options[key] === 'undefined' || options[key] === null) {
          throw new Error(`The parameter ${key} is required in the database options for Typeorm`)
        }
      })
    }
    this.options = options
  }

  /**
   * Connect to the database
   */
  async connectDatabase () {
    if (Array.isArray(this.options)) {
      this.connection = await Typeorm.createConnections(this.options)
    } else {
      this.connection = await Typeorm.createConnection(this.options)
    }
  }

  /**
   * Post actions after the connection
   * Not required for Typeorm but allows the user to hook this moment in the process
   * @return {Promise}
   */
  async postConnectionProcess () {
    if (Array.isArray(this.options)) {
      return this.options.map((option, index) => {
        if (typeof option.postConnectionProcess !== 'undefined' && option.postConnectionProcess) {
          return option.postConnectionProcess(this.connection[index], option)
        } else {
          return null
        }
      })
    } else if (this.options.postConnectionProcess) {
      return this.options.postConnectionProcess(this.connection, this.options)
    }

    return Promise.resolve(1)
  }

  /**
   * Retrieve the typeorm connection
   * @return {Object}
   */
  getConnection () {
    return this.connection
  }

  /**
   * Disconnect the database
   * @return {Promise}
   */
  async closeConnection () {
    if (Array.isArray(this.connection)) {
      return Promise.all(
        this.connection.map((co) => {
          return co ? co.close() : Promise.resolve(true)
        })
      )
    } else {
      return this.connection ? this.connection.close() : Promise.resolve(true)
    }
  }
}

module.exports = CherryTypeormConnector
