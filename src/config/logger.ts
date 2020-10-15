import { Logger } from "tslog";

const typeLog = process.env.NODE_ENV !== ''? 'pretty': "json"

class Log {
  constructor(protected log: Logger = new Logger({ type: typeLog, displayLoggerName: false})) {
  }
  public error(message: string, error:any): void {
    this.log.error(message, {error});
  }

  public info(message: string, info?: any): void {
    const args =  info ? { info }: '';
    this.log.info(message, args);
  }

  public warn(message: string, warn?:any): void {
    const args =  warn ? { warn }: '';
    this.log.warn(message, {args});
  }

  public debug(message: string, debug?:any): void {
    const args =  debug ? { debug }: '';
    this.log.debug(message, {args});
  }
}

export default new Log();