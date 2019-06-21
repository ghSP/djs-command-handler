declare class Handler {
  constructor(config: { folder: string; prefix?: string[] }): void;

  folder: string;
  prefix: string[];

  commands: Map<string, object>;
  aliases: Map<string, string>;

  load(folder: string): void;
  get(string: string | undefined): object;
}

export = Handler;
