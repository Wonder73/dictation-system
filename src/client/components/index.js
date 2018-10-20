import asyncComponent from './asyncComponent.js';

const CheckWords = asyncComponent(() => import('./check-words'));
const App = asyncComponent(() => import('./app/app'));
const DictationConfig = asyncComponent(() => import('./dictation-config/dictation-config'));
const DictationStart = asyncComponent(() => import('./dictation-start/dictation-start'));
const userRecord = asyncComponent(() => import('./user/record/record'));
const userWords = asyncComponent(() => import('./user/words/words'));

const AdminSide = asyncComponent(() => import('./admin/side/side'));
const AdminHeader = asyncComponent(() => import('./admin/header/header'));
const AdminExhibit = asyncComponent(() => import('./admin/exhibit/exhibit'));
const AdminChart = asyncComponent(() => import('./admin/chart/chart'));

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
