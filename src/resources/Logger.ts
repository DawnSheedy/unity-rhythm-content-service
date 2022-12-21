class Logger {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  private print(level: string, message: string) {
    console.log(`[${new Date().toISOString()}] ${level} [${this.prefix}] ${message}`);
  }

  log(message: string) {
    this.print('\x1b[32m[LOG]\x1b[0m', message);
  }

  warn(message: string) {
    this.print('\x1b[33m[WARN]\x1b[0m', message);
  }

  critical(message: string) {
    this.print('\x1b[31m[CRITICAL]\x1b[0m', message);
  }
}

const logger = new Logger("UnityRhythmCS");

export { logger as Logger };