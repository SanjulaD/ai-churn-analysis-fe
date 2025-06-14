interface Logger {
  error: (message: string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
  log: (message: string) => void;
}

const createLogger = (): Logger => {
  const isDev = import.meta.env.DEV;
  const isLoggingDisabled = import.meta.env.VITE_DISABLE_LOGGING === 'true';

  if (isLoggingDisabled) {
    return {
      error: () => {},
      warn: () => {},
      info: () => {},
      debug: () => {},
      log: () => {},
    };
  }

  return {
    error: (message: string) => {
      console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    },
    warn: (message: string) => {
      console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
    },
    info: (message: string) => {
      if (isDev) {
        console.info(`[INFO] ${new Date().toISOString()}: ${message}`);
      }
    },
    log(message: string): void {
      console.log(`[LOG]: ${message}`);
    },
    debug: (message: string) => {
      if (isDev) {
        console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`);
      }
    },
  };
};

const Logger = createLogger();

export default Logger;
