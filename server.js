const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      PORT = 5000,
      _ = require('lodash'),
      strUtils = require('./Utils/StringUtils'),
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
classifier.addDocument('how do i use public transportation in Helsinki?', 'TRANSPORTATION')
classifier.addDocument('where do i get a verokortti?', 'LOGISTICS')
classifier.addDocument('where do i get a tax card?', 'LOGISTICS')
classifier.addDocument('how do i open a bank account?', 'LOGISTICS')
classifier.addDocument('how do i get a Finnish phone number?', 'LOGISTICS')

classifier.train()

app.get('/',(req, res) => res.send('hello'))
io.on('connection',socket => {
      socket.emit('message', {text: 'What can I do for you today?', origin: 'server'})
      socket.on('message', message => {
            socket.emit('message', message)
            messsage => message[0] === '@'
            ? socket.emit('message', {text: 'at-command detected', origin: 'server'})
            : _.flow(
                messsage => classifier.classify(message.text),
                classified => socket.emit('message', { text: CATEGORIES[classified](strUtils.splitMessage(message)), origin: 'server' })
            )(message)
      })
})

http.listen(PORT, () => console.log(`listening on port ${PORT}`))
