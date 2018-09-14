import { connect } from 'react-redux';

import { Write } from '../views'
import { insert } from '../store/actions';

export default connect(
  (state) => ({words: state.dictationSystem}),
  { insert }
)(Write);
