# Cherry Typeorm Connector

[![Build Status](https://travis-ci.com/Lund-Org/cherry-typeorm-connector.svg?branch=master)](https://travis-ci.com/Lund-Org/cherry-typeorm-connector) [![Maintainability](https://api.codeclimate.com/v1/badges/4e54dd4cbf0bb911d0e2/maintainability)](https://codeclimate.com/github/Lund-Org/cherry-typeorm-connector/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4e54dd4cbf0bb911d0e2/test_coverage)](https://codeclimate.com/github/Lund-Org/cherry-typeorm-connector/test_coverage)

A plugin to use [Typeorm](https://github.com/typeorm/typeorm) as the orm in cherry 🍒

## Installation

Use the package manager [npm](http://npmjs.com) to install Cherry Typeorm Connector.

```bash
npm install @lund-org/cherry-typeorm-connector
```

To start the tests, a [docker](https://docker.com)-compose is available.

```bash
docker-compose.exe -f etc/docker-compose.yml up -d
```

## Usage

Checkout the example in the [example folder of cherry](https://github.com/Lund-Org/cherry/tree/master/example/04-orm/).
Of course, you need a cherry app to use this connector :

```javascript
const Cherry = require('@lund-org/cherry')
const CherryTypeormConnector = require('@lund-org/cherry-typeorm-connector')

const options = {
  ...
  plugins: [CherryTypeormConnector]
  ...
}

const cherry = new Cherry()
cherry.configure(options)
cherry.start(options)
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/Lund-Org/cherry-typeorm-connector/blob/master/LICENSE)
