const places = [
  'helsinki',
  'finland',
  'turku',
  'tampere',
  'espoo'
]

const actions = [
  'move',
  'moving',
  'immigrate',
  'work',
  'working'
]

const properVerbs = {
  move: 'moving',
  immigrate: 'immigrating',
  work: 'working'
}

const transLogistics = [
  'pass',
  'card',
  'ticket',
  'rate',
  'free',
  'fee'
]

const logistics = [
  'bank',
  'account',
  'vero',
  'tax'
]

const resources = {
  transitCard: 'https://www.hsl.fi/en/tickets-and-fares/travel-card',
  transitRoutes: 'https://www.reittiopas.fi/-/-/lahellasi',
  bankAccount: 'Here are some things you will need to open a bank account in Finland: \n * passport \n * tax card \n * maistraatti paper',
  migri: 'Here is information about moving to Finland: \n <http://migri.fi/en/contact-information>',
  vero: 'Here is information related to tax cards: \n <https://www.vero.fi/en/individuals/>'
}

exports.places = places
exports.actions = actions
exports.properVerbs = properVerbs
exports.resources = resources
exports.logistics = logistics
exports.transLogistics = transLogistics

