
const keywords = require('./KeyWordArrays'),
      _ = require('lodash')

const splitMessage = message => message.text.split(' ').map(word => word.replace(/\?|\.|\!/, ''))
const transitTree = _.flow(
  message => message.map(word => keywords.transLogistics.includes(word) ? word : null).filter(word => word !== null),
  filteredArray => filteredArray.length === 0
  ? `For route and schedule information,[I found this](${keywords.resources['transitRoutes']})`
  : `For pass and ticket information, [I found this](${keywords.resources['transitCard']})`
)
const logisticsTree = _.flow(
  message => message.map(word => keywords.logistics.includes(word) ? word : null).filter(word => word !== null),
  filteredArray => filteredArray.length >= 0 ? keywords.resources['bankAccount'] : "sorry bro. I don't know that."
)

exports.splitMessage = splitMessage
exports.transitTree = transitTree
exports.logisticsTree = logisticsTree
