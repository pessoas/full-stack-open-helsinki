const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  password: process.env.MONGO_PASS,
  mongoUrl: process.env.MONGODB_URI,
  PORT: process.env.PORT
}
