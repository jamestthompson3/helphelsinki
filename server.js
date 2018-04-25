require("dotenv").config()
const express = require("express"),
  app = express(),
  https = require("https"),
  http = require("http").Server(app),
  io = require("socket.io")(http),
  PORT = 8080,
  path = require("path"),
  _ = require("lodash"),
  strUtils = require("./Utils/StringUtils"),
  commands = require("./Utils/atCommands"),
  BrainJSClassifier = require("natural-brain"),
  classifier = new BrainJSClassifier(),
  { createSSL } = require("./Utils/serverUtils"),
  { insertMessages } = require("./Utils/dbUtils"),
  forceSsl = require("express-force-ssl")

const CATEGORIES = {
  TRANSPORTATION: strUtils.transitTree,
  IMMIGRATION: strUtils.immigrationTree,
  LOGISTICS: strUtils.logisticsTree,
  MOVING: strUtils.immigrationTree
}

classifier.addDocument("i am moving to Helsinki", "IMMIGRATION")
classifier.addDocument("i want to move to Finland", "IMMIGRATION")
classifier.addDocument("what do i need to move to Finland", "IMMIGRATION")
classifier.addDocument("do i need a visa to work in finland?", "IMMIGRATION")
classifier.addDocument("how do i get a residence permit?", "IMMIGRATION")
classifier.addDocument("how do you buy a bus pass?", "TRANSPORTATION")
classifier.addDocument(
  "whats the fastest way to the airport?",
  "TRANSPORTATION"
)
classifier.addDocument("how late do the buses run?", "TRANSPORTATION")
classifier.addDocument("when is the last metro?", "TRANSPORTATION")
classifier.addDocument("which trains go downtown?", "TRANSPORTATION")
classifier.addDocument("is the tram free?", "TRANSPORTATION")
classifier.addDocument(
  "how do i use public transportation in Helsinki?",
  "TRANSPORTATION"
)
classifier.addDocument("where do i get a verokortti?", "LOGISTICS")
classifier.addDocument("where do i get a tax card?", "LOGISTICS")
classifier.addDocument("how do i open a bank account?", "LOGISTICS")
classifier.addDocument("how do i get a Finnish phone number?", "LOGISTICS")

classifier.train()

app.use(express.static(path.join(__dirname, "/front/build")))
app.use(forceSsl)
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/front/build", "index.html"))
)
io.of("/socket").on("connection", socket => {
  socket.emit("message", {
    text: "What can I do for you today?\n\n ",
    origin: "server"
  })
  socket.on("message", message => {
    socket.emit("message", message)
    message.text[0] === "@"
      ? commands
          .detectCommand(message)
          .then(data =>
            socket.emit("message", { text: data, origin: "server" })
          )
      : _.flow(
          message => classifier.classify(message.text),
          classified =>
            socket.emit("message", {
              text: CATEGORIES[classified](strUtils.splitMessage(message)),
              origin: "server"
            })
        )(message)
    insertMessages(
      message.text,
      message.text[0] === "@" ? "atCommand" : classifier.classify(message.text)
    )
  })
})

process.env.NODE_ENV === "production" &&
  https
    .createServer(createSSL(), app)
    .listen(PORT, () => console.log(`secure server listening on port ${PORT}`))
http.listen(PORT, () => console.log(`listening on port ${PORT}`))
