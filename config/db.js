const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();

function db() {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.o9vgx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  );
  mongoose.connection.on('open', () => {
    console.log('connected to remote db successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.log('connection failed: ', err.message);
  });
}

module.exports = db;
