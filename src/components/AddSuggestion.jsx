const React = require('react') // eslint-disable-line no-unused-vars
    , AddButton = require('../components/AddButton')
    , Autosuggest = require('../components/Autosuggest')

const AddSuggestion = (
  { input
  , suggestions
  , onChange
  , onSuggestionSelected
  , onAdd = null
  }) => (
  <li className="mb1 relative">
    { onAdd === null
        ? <AddButton color="#dddddd" />
        : <AddButton onClick={onAdd} />
    }
    <Autosuggest
      input={input}
      suggestions={suggestions}
      onChange={onChange}
      onSuggestionSelected={onSuggestionSelected}
    />
  </li>
)

AddSuggestion.propTypes =
  { input: React.PropTypes.string.isRequired
  , suggestions: React.PropTypes.array.isRequired
  , onChange: React.PropTypes.func.isRequired
  , onSuggestionSelected: React.PropTypes.func.isRequired
  , onAdd: React.PropTypes.func
  }

module.exports = AddSuggestion