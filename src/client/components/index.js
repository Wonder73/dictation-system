// import asyncComponent from './asyncComponent.js';

// const CheckWords = asyncComponent(() => import('./check-words'));
// const App = asyncComponent(() => import('./app/app'));
// const DictationConfig = asyncComponent(() => import('./dictation-config/dictation-config'));
// const DictationStart = asyncComponent(() => import('./dictation-start/dictation-start'));
// const userRecord = asyncComponent(() => import('./user/record/record'));
// const userWords = asyncComponent(() => import('./user/words/words'));

// const AdminSide = asyncComponent(() => import('./admin/side/side'));
// const AdminHeader = asyncComponent(() => import('./admin/header/header'));
// const AdminExhibit = asyncComponent(() => import('./admin/exhibit/exhibit'));
// const AdminChart = asyncComponent(() => import('./admin/chart/chart'));

import DictationConfig from './dictation-config/dictation-config';
import Loadable from 'react-loadable';
import LoadingComponent from './loading.jsx';

/* const DictationConfig = Loadable({
  loader: () => import('./dictation-config/dictation-config'),
  loading: LoadingComponent
}); */
const CheckWords = Loadable({
  loader: () => import('./check-words'),
  loading: LoadingComponent
});
const App = Loadable({
  loader: () => import('./app/app'),
  loading: LoadingComponent
});
const DictationStart = Loadable({
  loader: () => import('./dictation-start/dictation-start'),
  loading: LoadingComponent
});
const userRecord = Loadable({
  loader: () => import('./user/record/record'),
  loading: LoadingComponent
});
const userWords = Loadable({
  loader: () => import('./user/words/words'),
  loading: LoadingComponent
});

const AdminSide = Loadable({
  loader: () => import('./admin/side/side'),
  loading: LoadingComponent
});
const AdminHeader = Loadable({
  loader: () => import('./admin/header/header'),
  loading: LoadingComponent
});
const AdminExhibit = Loadable({
  loader: () => import('./admin/exhibit/exhibit'),
  loading: LoadingComponent
});
const AdminChart = Loadable({
  loader: () => import('./admin/chart/chart'),
  loading: LoadingComponent
});

export {
  CheckWords,
  App,
  DictationConfig,
  DictationStart,
  userRecord,
  userWords,

  AdminSide,
  AdminHeader,
  AdminExhibit,
  AdminChart,
};
