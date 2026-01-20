require('dotenv').config();
const app = require('./app');
const { ServerConfig } = require('./config');

app.listen(ServerConfig.PORT, () => {
  console.log(`🚀 Server started on port ${ServerConfig.PORT}`);
});
