const isProd = import.meta.env.MODE === 'production';

const logger = {
  log: (...args: unknown[]) => {
    if (!isProd) console.log('[LOG]:', ...args);
  },
  info: (...args: unknown[]) => {
    if (!isProd) console.info('[INFO]:', ...args);
  },
  warn: (...args: unknown[]) => {
    if (!isProd) console.warn('[WARN]:', ...args);
  },
  error: (...args: unknown[]) => {
    if (!isProd) console.error('[ERROR]:', ...args);
  },
};

export default logger;
