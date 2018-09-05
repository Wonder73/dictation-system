import { connect } from 'react-redux';

import { add2 } from '../store/actions';
import Home from '../components/home/home';

export default connect(
  state => ({demo2: state.demo2}),
  { add2 }
)(Home);
