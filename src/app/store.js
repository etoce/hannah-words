import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import wordTwistReducer from '../features/wordtwist/wordTwistSlice';

export default configureStore({
  reducer: {
	counter: counterReducer,
	wordTwist: wordTwistReducer
  },
});
