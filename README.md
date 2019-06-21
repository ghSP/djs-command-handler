# Command Handler
[![npm-shield]][npm-url] [![npmv-shield]][npm-url]

## Installation
This one is nice and simple!

With npm:
```
$ npm install @yaas/command-handler
```
With yarn:
```
$ yarn add @yaas/command-handler
```
## Usage
This is meant to simplify creating discord bots that are not single-file
```js
const CommandHandler = require('@yaas/command-handler');
const { Client } = require('discord.js');

const client = new Client();
const CH = new CommandHandler({
  folder: __dirname + '/commands/',
  prefixes: ['?', '>'],  // NOTE: prefixes may not contain spaces
});

client.on('message', message => {
  const args = message.content.split(/\s+/g);
  const command = args.shift();

  const cmd = CH.get(command);

  if(cmd === null) return;

  try {
    cmd.run(client, message, args);
  } catch {
    console.error(`There was an error running command: ${cmd.name}`);
  }
});
```

This should be your file structure:
```
- index.js
- package.json
- node_modules
  - ...
- commands
  - test.js
```

This is what `test.js` looks like:
```js
module.exports = class command {
  constructor() {
    this.name = 'test';
    this.aliases = [];
    this.description = '?test';
  }

  async run(client, message, args) {
    message.reply('Test works!');
  }
}
```

[npm-shield]: https://img.shields.io/npm/dt/@yaas/command-handler.svg?color=green&logo=npm
[npmv-shield]: https://img.shields.io/npm/v/@yaas/command-handler.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/@yaas/command-handler