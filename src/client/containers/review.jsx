import { connect } from 'react-redux';

import { Review } from '../views';

export default connect(
  state => ({words: state.dictationSystem})
)(Review);
