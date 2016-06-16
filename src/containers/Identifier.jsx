const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {getEditPath} = ('../selectors')
    , ShowIdentifier = require('./ShowIdentifier')
    , EditIdentifier = require('./EditIdentifier')

const Identifier = ({path, editable, deletable}) => editable
  ? <EditIdentifier path={path} />
  : <ShowIdentifier path={path} deletable={deletable} />

Identifier.propTypes = {
  path: React.PropTypes.instanceOf(List).isRequired,
  editable: React.PropTypes.bool,
  deletable: React.PropTypes.bool
}

const mapStateToProps = (state, {path, deletable = true}) => (
  { path
  , editable: path.butLast().equals(getEditPath(state))
  , deletable
  }
)

module.exports = connect(mapStateToProps)(Identifier)