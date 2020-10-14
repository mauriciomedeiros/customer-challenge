import { Logger } from "tslog";

class Log {
  constructor(protected log: Logger = new Logger()) {
  }
  public error(message: string, error: any): void {
    this.log.error(message, {error});
  }

  public info(message: string, info: any): void {
    this.log.info(message, {info});
  }

  public warn(message: string, warn: any): void {
    this.log.warn(message, {warn});
  }

  public debug(message: string, error: any): void {
    this.log.debug(message, {error});
  }
}

export default new Log();