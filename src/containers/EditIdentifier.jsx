const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , {JSONLDValue} = require('immutable-jsonld')
    , ResourceChooser = require('../components/ResourceChooser')
    , {RDFS, XSD} = require('../namespaces')
    , {getEditInput, getSuggestions, getEditChange} = require('../selectors')
    , {updateChange, acceptChange, cancelChange} = require('../actions')

const setLabel = (node, label) => node.set(
  RDFS.label,
  List.of(JSONLDValue({'@type': XSD.string, '@value': label}))
)

const mapStateToProps = state => (
  { value: getEditInput(state)
  , suggestions: getSuggestions(state)
  , change: getEditChange(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateChange, acceptChange, cancelChange}, dispatch)

const mergeProps = (
  {value, suggestions, change},
  {updateChange, acceptChange, cancelChange},
  {path}) => (

  { value
  , suggestions

  , onChange: e => updateChange(
      path.butLast(),
      setLabel(change, e.target.value),
      e.target.value)

  , onSuggestionSelected: (_, {suggestion}) => updateChange(
      path.butLast(),
      change
        .remove(RDFS.label)
        .set('@id', suggestion.id),
      suggestion.label,
      suggestion)

  , onAccept: () => acceptChange(path.butLast(), change)
  , onCancel: () => cancelChange()
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(ResourceChooser)
