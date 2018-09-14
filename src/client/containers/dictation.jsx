import { connect } from 'react-redux';

import { Dictation } from '../views';

export default connect(
  state => ({words: state.dictationSystem})
)(Dictation);
