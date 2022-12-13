class Logger {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  private print(message: string) {
    console.log(`[${this.prefix}] ${message}`);
  }

  log(message: string) {
    this.print(`[LOG]: ${message}`);
  }

  warn(message: string) {
    this.print(`[WARN]: ${message}`);
  }

  critical(message: string) {
    this.print(`[CRITICAL]: ${message}`);
  }
}

const logger = new Logger("UnityRhythmCS");

export { logger as Logger };
