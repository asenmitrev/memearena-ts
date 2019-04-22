import { combineReducers } from 'redux';
import memes from './memes';
import ui from './ui';
import duel from './duel';
import { History } from 'history'
import { connectRouter } from 'connected-react-router'

export default (history: History) => combineReducers({
  router: connectRouter(history),
  memes,
  ui,
  duel
})