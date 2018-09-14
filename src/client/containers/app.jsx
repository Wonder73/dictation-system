import { connect } from 'react-redux';

import { App } from '../components';
import { insert, select } from '../store/actions';

export default connect(
  (state) => ({words: state.dictationSystem}),
  { insert, select }
)(App);
