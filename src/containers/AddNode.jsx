const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , {JSONLDValue} = require('immutable-jsonld')
    , ResourceChooser = require('../components/ResourceChooser')
    , {rdfs, xsd} = require('../namespaces')
    , { getInput
      , getSelectedSuggestion
      , getIndividualSuggestions
      , getChange
      } = require('../selectors')
    , {updateChange, acceptChange, cancelChange} = require('../actions')

const setLabel = (node, label) => node.set(
  rdfs('label'),
  List.of(JSONLDValue({'@type': xsd('string'), '@value': label}))
)

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getIndividualSuggestions(state)
  , selectedSuggestion: getSelectedSuggestion(state)
  , change: getChange(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateChange, acceptChange, cancelChange}, dispatch)

const mergeProps = (
  {input, suggestions, selectedSuggestion, change},
  {updateChange, acceptChange, cancelChange},
  {path}) => (

  { input
  , suggestions
  , selectedSuggestion
  , cancelChange

  , onChange: e => updateChange(
      path.butLast(),
      setLabel(change, e.target.value),
      false,
      e.target.value)

  , onSuggestionSelected: (_, {suggestion}) => updateChange(
      path.butLast(),
      change
        .remove(rdfs('label'))
        .set('@id', suggestion.id),
      false,
      suggestion.label,
      suggestion)

  , onAccept: () => acceptChange(path.butLast(), change)
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(ResourceChooser)
