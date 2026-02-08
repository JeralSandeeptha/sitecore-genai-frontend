const isProduction = import.meta.env.NODE_ENV === 'production';

const getEnv = (key: string): string | undefined => {
  if (isProduction) {
    return window._env_?.[key];
  } else {
    return import.meta.env[key as keyof ImportMetaEnv];
  }
};

export const envConfig = {
  VITE_API_URL: getEnv('VITE_API_URL') || 'http://localhost:6001',
  MODE: getEnv('MODE') || 'development',
  VITE_DOMAIN: getEnv('VITE_DOMAIN'),
};