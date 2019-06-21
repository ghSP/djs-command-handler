const path = require('path');
const fs = require('fs');

/**
 * @example
 * const CH = new CommandHandler({
 *  folder: __dirname + '/commands/',
 *  prefixes: ['$', '>'], // This is possible due to the Array.from(...)
 * });
 */

class CommandHandler {
  constructor(config = {}) {
    this.folder = config.folder || path.join(__dirname + '/commands/');
    this.prefixes = Array.from(config.prefixes) || ['!'];
    this.prefixes.sort((a, b) => a.length < b.length);
    CommandHandler.loadFrom(this.folder);
  }

  static loadFrom(folder) {
    const commands = new Map();
    const aliases = new Map();

    const files = fs.readdirSync(folder).filter(f => f.endsWith('.js'));

    if (files.length === 0) throw new Error('No files to load!');

    console.info(`Proceeding to load ${files.length} commands`);

    files.forEach(f => {
      const file = require(`${folder}${f}`);
      const command = new file();
      commands.set(command.name, command);
      command.aliases.forEach(alias => {
        aliases.set(alias, command.name);
      });
      console.info(`Loaded: ${command.name}`);
    });

    console.info('\nLoaded All Commands!');
    this.commands = commands;
    this.aliases = aliases;
  }

  /**
   *
   * @param {string} str String
   */
  getCommand(str) {
    if (!str) return null;

    let prefix = null;

    this.prefixes.forEach(p => {
      if (str.startsWith(p)) {
        prefix = p;
      }
    });

    if (prefix === null) return null;

    const command = str.slice(prefix.length);

    const cmd =
      this.commands.get(command) ||
      this.commands.get(this.aliases.get(command));

    if (cmd) {
      return cmd;
    }

    return null;
  }
}

module.exports = CommandHandler;
exports.Default = new CommandHandler();
