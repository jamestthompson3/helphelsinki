const _ = require('lodash'),
      request = require('superagent'),
      Lokka = require('lokka').Lokka,
      Transport = require('lokka-transport-http').Transport


const detectCommand = (message) => {
 return Object.keys(COMMANDS).includes(message.text.replace(/\@/, ''))
? COMMANDS[message.text.replace(/\@/,'')](message)
: new Promise((res, rej) => res ? "I'm sorry, I don't understand what you mean." : console.log('error'))
}

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

const bikingFunction = (message) => {
return Promise.all([graphQLClient.query(`
  {
  nearest(lat:${message.lat} lon:${message.lon}, filterByPlaceTypes: BICYCLE_RENT, maxDistance: 500) {
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
      bikesAvailable
      name
      id
      lat
      lon
    }
  }
}
`)
]).then(values => _.flow(
  values => _.flatten(values[0].nearest.edges.map(i => values[1].bikeRentalStations.filter(station => station.id === i.node.place.id))), // .filter(i => i.bikesAvailable >= 0) ),
  filteredArray => filteredArray.length > 0 ? `[${filteredArray[0].name} station](https://maps.google.com/?q=${filteredArray[0].lat},${filteredArray[0].lon}) has ${filteredArray[0].bikesAvailable} bikes available` : 'sorry, no bikes available within 500m')(values)
  ).catch(err => console.log(err))

}

const eatFunction = () => null
const helpFunction = () => {
   const helpPromise = new Promise((res, rej) => res("I'm here to make being in Helsinki easier!\n\nIf you're moving to Helsinki from abroad, you can ask questions such as how can I get a bank account?\n\n If you live in Helsinki, you can find info about transit.\n\n If you have an idea to make this better, let us know at info@helpsinki.fi"))
   return helpPromise
}
const directionsFunction = () => null
const COMMANDS = {
  bikes: bikingFunction,
  eat: eatFunction,
  help: helpFunction
}

exports.detectCommand = detectCommand
