fs = require("fs")

const createSSL = () => {
  const key = fs.readFileSync("/encryption/private.key")
  const cert = fs.readFileSync("/encryption/primary.crt")
  const ca = fs.readFileSync("/encryption/intermediate.crt")
  return {
    key,
    cert,
    ca
  }
}

exports.createSSL = createSSL
