import { createSlice } from '@reduxjs/toolkit';
import { getDictionary, getNLetterDictionary } from './../../app/data';
import { pickOne } from "./../../app/util";
import { containsLettersOf, shuffleString, allWordsContainedIn } from "./../../app/stringutils";

export const wordTwistSlice = createSlice({
	name: 'wordTwist',
	initialState: {
		word: shuffleString(pickOne(getNLetterDictionary(6))),
		answers: [],
		timeLeft: 60,
		lastAnswer: "",
		correctAnswers: [],
		score: 0,
		roundSuccessful: false
	},
	reducers: {
		newGame: (state, action) => {
			state.word = shuffleString(pickOne(getNLetterDictionary(6)));
			state.answers = [];
			state.timeLeft = 60;
			state.lastAnswer = "";
			state.correctAnswers = allWordsContainedIn(state.word, getDictionary(), 3);
			state.score = 0;
			state.roundSuccessful = false;
		},
		tryAnswer: (state, action) => {
			const wordToTry = action.payload.wordToTry;
			console.log("Trying answer " + wordToTry);
			if (wordToTry.length >= 3 && containsLettersOf(state.word, wordToTry) && state.answers.indexOf(wordToTry) < 0) {
				if (getDictionary().indexOf(wordToTry) >= 0) {
					state.answers.push(wordToTry);
					state.score += wordToTry.length;
					if (wordToTry.length >= state.word.length) {
						state.roundSuccessful = true;
					}
				} else {
					console.log(wordToTry + " is not in the dictionary");
				}
			}
			state.lastAnswer = action.payload.wordToTry;
		},
		shuffle: (state, action) => {
			state.word = shuffleString(state.word);
		},
    	tick: (state, action) => {
			if (state.timeLeft > 0) {
				state.timeLeft -= 1;
			}
		},
		nextRound: (state, action) => {
			state.word = shuffleString(pickOne(getNLetterDictionary(6)));
			state.answers = [];
			state.timeLeft = 60;
			state.lastAnswer = "";
			state.correctAnswers = allWordsContainedIn(state.word, getDictionary(), 3);
			state.roundSuccessful = false;
		}
  	},
});

export const { newGame, tryAnswer, shuffle, tick, nextRound } = wordTwistSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};*/

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWord = state => {
	if (state.wordTwist.word !== null) {
		return state.wordTwist.word;
	} else {
		return "";
	}
};
export const selectAnswers = state => state.wordTwist.answers;
export const selectLastAnswer = state => state.wordTwist.lastAnswer;
export const selectCorrectAnswers = state => state.wordTwist.correctAnswers;
export const selectTimeLeft = state => state.wordTwist.timeLeft;
export const selectScore = state => state.wordTwist.score;
export const selectRoundSuccessful = state => state.wordTwist.roundSuccessful;

export default wordTwistSlice.reducer;
