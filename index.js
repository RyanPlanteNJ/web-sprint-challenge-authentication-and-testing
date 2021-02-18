require('dotenv').config();

const server = require('./api/server.js');

console.log(`DB_ENV = ${process.env.DB_ENV}`);

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
