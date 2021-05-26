const authConfig = {
  SECRET_KEY: process.env.SECRET_KEY || 'secret key',
  EXPIRES_IN: process.env.EXPIRES_IN || '1d',
};

export { authConfig };
