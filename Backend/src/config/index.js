if (!process.env.PORT) {
  throw new Error('PORT is not defined in environment variables');
}

module.exports = {
  ServerConfig: {
    PORT: process.env.PORT
  }
};
