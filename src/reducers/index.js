const {JSONLDNode} = require('immutable-jsonld')
    , {Map, List} = require('immutable')
    , {combineReducers} = require('redux')
    , { UPDATE_CLASSES
      , UPDATE_PROPERTIES
      , UPDATE_INDIVIDUALS
      , DELETE_IN
      , UPDATE_INPUT
      , UPDATE_SELECTED_SUGGESTION
      , UPDATE_CHANGE
      , ACCEPT_CHANGE
      , CANCEL_CHANGE
      , NO_CHANGE
      } = require('../actions')

const node = (node = JSONLDNode(), action) => {
  switch (action.type) {

    case DELETE_IN:
      return node.deleteIn(action.path)

    case ACCEPT_CHANGE:
      return action.change === NO_CHANGE
        ? node : node.setIn(action.path, action.change)

    default:
      return node
  }
}

const classes = (classes = Map(), action) => {
  switch (action.type) {
    case UPDATE_CLASSES:
      return action.classes

    default:
      return classes
  }
}

const properties = (properties = Map(), action) => {
  switch (action.type) {
    case UPDATE_PROPERTIES:
      return action.properties

    default:
      return properties
  }
}

const individuals = (individuals = Map(), action) => {
  switch (action.type) {
    case UPDATE_INDIVIDUALS:
      return action.individuals

    default:
      return individuals
  }
}

const editpath = (editpath = List(), action) => {
  switch (action.type) {

    case DELETE_IN:
    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return List()

    case UPDATE_CHANGE:
       return action.path

    default:
      return editpath
  }
}

const change = (change = NO_CHANGE, action) => {
  switch (action.type) {

    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return NO_CHANGE

    case UPDATE_CHANGE:
      return action.change

    default:
      return change
  }
}

const input = (input = '', action) => {
  switch (action.type) {

    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return ''

    case UPDATE_INPUT:
    case UPDATE_CHANGE:
      return action.input || ''

    case UPDATE_SELECTED_SUGGESTION:
      return action.suggestion.label ? action.suggestion.label : input

    default:
      return input
  }
}

const selectedSuggestion = (selectedSuggestion = {}, action) => {
  switch (action.type) {

    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return {}

    case UPDATE_SELECTED_SUGGESTION:
    case UPDATE_CHANGE:
      return action.suggestion

    default:
      return selectedSuggestion
  }
}

const editingProperties = (editingProperties = false, action) => {
  switch (action.type) {

    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return false

    case UPDATE_CHANGE:
      return action.editingProperties

    default:
      return editingProperties
  }
}

const idMinter = (idMinter = null) => idMinter

module.exports = combineReducers(
  { node
  , classes
  , properties
  , individuals
  , editpath
  , change
  , input
  , selectedSuggestion
  , editingProperties
  , idMinter
  }
)

