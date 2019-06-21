module.exports = class command {
  constructor() {
    this.name = 'smile';
    this.aliases = ['happy'];
    this.description = '?smile';
  }

  async run(client, message, args) {
    message.react('😄');
  }
};
