import {store} from '../redux/store';
import {setTime, setMaxLength} from '../redux/reducers/videoTimeReducer';

export const setVideoTime = time => {
  store.dispatch(setTime(time));
};
export const getVideoTime = () => {
  const time = store.getState().videoTimeReducer.time;
  return time;
};
export const setVideoMaxLength = time => {
  store.dispatch(setMaxLength(time));
};
export const getVideoMaxLength = () => {
  const time = store.getState().videoTimeReducer.maxLength;
  return time;
};
