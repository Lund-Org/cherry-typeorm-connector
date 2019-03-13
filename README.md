# Cherry Typeorm Connector

[![Build Status](https://travis-ci.com/Lund-Org/cherry-typeorm-connector.svg?branch=master)](https://travis-ci.com/Lund-Org/cherry-typeorm-connector)

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
const CherryPugConnector = require('@lund-org/cherry-typeorm-connector')

const cherry = new Cherry()
cherry.configure(routes, [], options) // TO UPDATE WHEN REFACTO IS DONE
// The following line is the important one
cherry.registerPlugin(CherryPugConnector)
cherry.start(options)
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/Lund-Org/cherry-typeorm-connector/blob/master/LICENSE)
