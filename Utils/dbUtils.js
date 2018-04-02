require('dotenv').config()
const { Client } = require ('pg'),
      client = new Client({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB,
          password: process.env.DB_PWORD,
          port: 5432
})
client.connect()

const text = 'INSERT INTO messages(message, classification) VALUES($1, $2)'
const insertMessages = (message, classification) => client.query(text, [message, classification]).then(res => console.log('values stored!')).catch(e => console.log(e.stack))

exports.insertMessages = insertMessages
