import { connect } from 'react-redux';

import App from '../components/app/app.jsx';
import { add } from '../store/actions';

export default connect(
  state => ({demo: state.demo, demo2: state.demo2}),
  {add}
)(App);
