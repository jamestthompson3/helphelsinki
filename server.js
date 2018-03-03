const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      PORT = 80,
      path = require('path'),
      _ = require('lodash'),
      strUtils = require('./Utils/StringUtils'),
      commands = require('./Utils/atCommands'),
      BrainJSClassifier = require('natural-brain'),
      classifier = new BrainJSClassifier()


const CATEGORIES = {
            'MOVING': strUtils.movingTree,
            'TRANSPORTATION': strUtils.transitTree,
            'IMMIGRATION': strUtils.immigrationTree,
            'LOGISTICS': strUtils.logisticsTree
      }

classifier.addDocument('i am moving to Helsinki', 'MOVING')
classifier.addDocument('i want to move to Finland', 'MOVING')
classifier.addDocument('what do i need to move to Finland', 'MOVING')
classifier.addDocument('do i need a visa to work in finland?', 'IMMIGRATION')
classifier.addDocument('how do i get a residence permit?', 'IMMIGRATION')
classifier.addDocument('how do you buy a bus pass?', 'TRANSPORTATION')
classifier.addDocument('whats the fastest way to the airport?', 'TRANSPORTATION')
classifier.addDocument('how late do the buses run?', 'TRANSPORTATION')
classifier.addDocument('when is the last metro?', 'TRANSPORTATION')
classifier.addDocument('which trains go downtown?', 'TRANSPORTATION')
classifier.addDocument('is the tram free?', 'TRANSPORTATION')
classifier.addDocument('how do i use public transportation in Helsinki?', 'TRANSPORTATION')
classifier.addDocument('where do i get a verokortti?', 'LOGISTICS')
classifier.addDocument('where do i get a tax card?', 'LOGISTICS')
classifier.addDocument('how do i open a bank account?', 'LOGISTICS')
classifier.addDocument('how do i get a Finnish phone number?', 'LOGISTICS')

classifier.train()


app.use(express.static(path.join(__dirname, '/front/build')))
app.get('*',(req, res) => res.sendFile(path.join(__dirname, '/front/build', 'index.html')))
io.on('connection',socket => {
      socket.emit('message', {text: 'What can I do for you today?', origin: 'server'})
      socket.on('message', message => {
            socket.emit('message', message)
            message.text[0] === '@'
            ? commands.detectCommand(message).then(data => socket.emit('message', {text: data, origin: 'server'}))
            : _.flow(
                message => classifier.classify(message.text),
                classified => socket.emit('message', { text: CATEGORIES[classified](strUtils.splitMessage(message)), origin: 'server' })
            )(message)
      })
})

http.listen(PORT, () => console.log(`listening on port ${PORT}`))


// TODO:
// CITY BIKE INFO https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20nearest(lat%3A60.1731473%20lon%3A24.9224112%2C%20filterByPlaceTypes%3A%20BICYCLE_RENT)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%2C%0A%20%20%20%20%20%20%20%20place%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D
// Search closest bike station
// get ID
// Search all stations, get where id === ID
// Current station, check if bikes avaialble
// If yes, return coords/directions
// If no, find next closest.


// TODO2:
// Send geoloc from client
// send nearest from server.
