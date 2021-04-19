import mongoose from 'mongoose';
require('dotenv').config();
import config from 'config-lite';
const chalk = require('chalk');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};
// const dbConnection = express();
// const db = process.env.DB_CONN;

mongoose.connect(config.url, options);
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connection;

// .then(() => console.log(`Conexión con MongoDB es OK!`))
// .catch(err => console.log(err));

dbConnection.once('open', () => {
  console.log(chalk.cyan('Conectado con éxito a la base de datos'));
});

dbConnection.on('error', function(error) {
  console.error(chalk.red('Error en la conexión de MongoDb: ' + error));
  mongoose.disconnect();
});

dbConnection.on('close', function() {
  console.log(
    chalk.redBright(
      'La base de datos está desconectada, vuelva a conectarse a la base de datos'
    )
  );
  mongoose.connect(config.url, options);
});
export default dbConnection;
