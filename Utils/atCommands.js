const _ = require('lodash'),
      request = require('superagent'),
      Lokka = require('lokka').Lokka,
      Transport = require('lokka-transport-http').Transport

const detectCommand = _.flow(
  message => message.split('@'),
  messageArray => COMMANDS[messageArray[1]] == null ? directionsFunction(messageArray) : COMMANDS[messageArray[1]]()
  )

const HSL_GRAPHQL_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
const graphQLClient = new Lokka({
  transport: new Transport(HSL_GRAPHQL_URL)
})


const bikingFunction = () => graphQLClient.query(`{nearest(lat: 60.1731473 lon: 24.9224112,filterByPlaceTypes:BICYCLE_RENT) {edges {node {id,place {id}distance}}`)
.then(result => result)


const eatFunction = console.log('eatfunction')
const helpFunction = console.log('helpfunction')
const COMMANDS = {
  bike: bikingFunction,
  eat: eatFunction,
  help: helpFunction
}

exports.detectCommand = detectCommand
