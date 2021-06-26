const authConfig = {
  SECRET_KEY: process.env.SECRET_KEY || 'secret key',
  EXPIRES_IN: process.env.EXPIRES_IN || '1d',
  SECRET_KEY_REFRESH: process.env.SECRET_KEY_REFRESH || 'refresh_secret',
  EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH || '2d',
  EXPIRES_IN_REFRESH_DAYS: Number(process.env.EXPIRES_IN_REFRESH_DAYS) || 2,
};

export { authConfig };
