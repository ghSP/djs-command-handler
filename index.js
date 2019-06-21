const fs = require('fs');

module.exports = class Handler {
  constructor(config) {
    if (!config.folder) throw new Error('Folder necessary! config.folder');

    this.commands = new Map();
    this.aliases = new Map();

    this.folder = config.folder;
    this.prefix = config.prefix || ['!'];
    this.prefix.sort((a, b) => a.length < b.length);

    this.load(this.folder);
  }

  load(folder) {
    const files = fs.readdirSync(folder);
    files.filter(f => f.endsWith('.js'));

    files.forEach(f => {
      const file = require(folder + f);
      const cmd = new file();
      this.commands.set(cmd.name, cmd);
      cmd.aliases.forEach(alias => {
        this.aliases.set(alias, cmd.name);
      });
    });
    console.info('Loaded All Commands! TOTAL: ' + files.length);
  }

  get(string) {
    if (!string || typeof string !== 'string') return null;

    let prefix = false;
    let cmd = '';
    this.prefix.forEach(p => {
      if (string.indexOf(p) === 0) {
        prefix = p;
        cmd = string.slice(prefix.length);
      }
    });

    if (prefix === null) return null;

    const file =
      this.commands.get(cmd) ||
      this.commands.get(this.aliases.get(cmd)) ||
      null;

    if (file) {
      return file;
    } else {
      return null;
    }
  }
};
