# Command Handler

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
const CH = new CommandHandler({       // This example uses the default path in the config.
  folder: __dirname + '/commands/',
  prefixes: ['?', '>'],  // NOTE: prefixes may not contain spaces
});

```