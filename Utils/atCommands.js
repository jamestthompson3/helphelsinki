const _ = require('lodash'),
      request = require('superagent'),
      Lokka = require('lokka').Lokka,
      Transport = require('lokka-transport-http').Transport

const detectCommand = _.flow(
  message => message.split('@').filter(item => item !== ''),
  messageArray => messageArray.length > 1 ? directionsFunction() : COMMANDS[messageArray[0]]()
  )

const HSL_GRAPHQL_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
const graphQLClient = new Lokka({
  transport: new Transport(HSL_GRAPHQL_URL)
})

/* const refreshStationCache = () => {
  graphQLClient.query(`
    {
      nearest(lat:60.1731473 lon:24.9224112, filterByPlaceTypes: BICYCLE_RENT) {
        edges {
          node {
            id,
            place {
              id
            }
            distance
          }
        }
      }
    }
  `).then(result =>
    console.log('refresh called',result))
}
*/

const bikingFunction = () => {
  // to acess data, {nearest: {edges}}) use edge.node.place.id
Promise.all([graphQLClient.query(`
  {
  nearest(lat:60.1731473 lon:24.9224112, filterByPlaceTypes: BICYCLE_RENT) {
    edges {
      node {
        id,
        place {
          id
        }
        distance
      }
    }
  }
}
}
`),
graphQLClient.query(`
  {
    bikeRentalStations {
      name
      stationId
      realtime
      bikesAvailable
      id
    }
  }
}
`)
]).then(values => console.log(JSON.stringify(values[0])))
}


const getBikinginfo = () => {
graphQLClient.query(`
  {
    bikeRentalStations {
      name
      stationId
      realtime
      bikesAvailable
      id
    }
  }
}
`)
}

// https://github.com/sampsakuronen/kaupunkifillarit-web/blob/master/app.js

const eatFunction = () => null
const helpFunction = () => null
const directionsFunction = () => null
const COMMANDS = {
  bikes: bikingFunction,
  eat: eatFunction,
  help: helpFunction
}

exports.detectCommand = detectCommand
