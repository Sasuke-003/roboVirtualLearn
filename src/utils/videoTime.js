import {store} from '../redux/store';
import {setTime} from '../redux/reducers/videoTimeReducer';

export const setVideoTime = time => {
  store.dispatch(setTime(time));
};
export const getVideoTime = () => {
  const time = store.getState().videoTimeReducer.time;
  return time;
};
