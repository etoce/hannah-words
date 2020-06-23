import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	newGame,
	tryAnswer,
	shuffle,
	tick,
	nextRound,
	selectWord,
	selectAnswers,
	selectLastAnswer,
	selectCorrectAnswers,
	selectTimeLeft,
	selectScore,
	selectRoundSuccessful
} from './wordTwistSlice';
import styles from './WordTwist.module.css';
import { getDictionary } from './../../app/data.js'


export function WordTwist() {
	const word = useSelector(selectWord);
	const answers = useSelector(selectAnswers);
	const lastAnswer = useSelector(selectLastAnswer);
	const correctAnswers = useSelector(selectCorrectAnswers);
	const timeLeft = useSelector(selectTimeLeft);
	const score = useSelector(selectScore);
	const roundSuccessful = useSelector(selectRoundSuccessful);
	//var wordToTry = useSelector(selectWordToTry);
	const dispatch = useDispatch();
	const [wordToTry, setWordToTry] = useState("");
	const dictionary = getDictionary();

	//dispatch(newGame);
	const [timerStarted, setTimerStarted] = useState(false);

	useEffect(() => {
		let interval = null;
		if (!timerStarted) {
			interval = setInterval(() => {
				dispatch(tick());
			}, 1000);
			setTimerStarted(true);
		} else {
			clearInterval(interval);
		}
		
	})

	const doTryButton = function () {
		dispatch(tryAnswer({wordToTry: wordToTry.trim().toLowerCase()}));
		setWordToTry("");
	}

	const handleKeyPress = function (event) {
		if (event.key === "Enter") {
			doTryButton();
		} else if (event.key === " ") {
			dispatch(shuffle());
			setWordToTry("");
		}
	}

	const wordLetters = word.split("").map((character, index) =>
		<div key={"letter-" + index} className={styles.character}>
			{character}
		</div>
	)

	/*const answerList = correctAnswers.map((answerString) => 
		<div key={answerString}>{answerString}</div>
	);*/

	var scoreJSX = "";
	if (word !== null && word !== "") {
		scoreJSX = <div>Score: {score}</div>;
	}

	var message = "";
	if (word !== null && word !== "") {
		if (lastAnswer === "") {
			message = "Make words with the letters you see and type them in the box below.";
		} else if (answers.indexOf(lastAnswer) >= 0) {
			message = "\"" + lastAnswer + "\" is a valid answer!";
		} else if (lastAnswer.length < 3) {
			message = "\"" + lastAnswer + "\" is not at least three letters long!";
		} else if (dictionary.indexOf(lastAnswer) < 0) {
			message = "\"" + lastAnswer + "\" is not in the dictionary!";
		} else {
			message = "\"" + lastAnswer + "\" doesn't have the right letters!"
		}
	}
	
	
	
	if (lastAnswer !== "") {
		if (answers.indexOf(lastAnswer) >= 0) {
			if (lastAnswer.length >= 6) {
				message = "You found the six-letter word! You qualify for the next round!";
			} else {
				message = "\"" + lastAnswer + "\" is a valid word!";
			}
		} else if (dictionary.indexOf(lastAnswer) < 0) {
			message = "\"" + lastAnswer + "\" is not in the dictionary!";
		} else if (lastAnswer.length < 3) {
			message = "\"" + lastAnswer + "\" is not at least three letters long!";
		} else {
			message = "\"" + lastAnswer + "\" doesn't have the right letters!"
		}
	}

	var timeJSX = "";
	if (word !== null && word !== "") {
		if (timeLeft > 0) {
			timeJSX = <div>Time left: {timeLeft}</div>
		} else {
			if (roundSuccessful) {
				timeJSX = <div>Time's up! You qualify for the next round!</div>
			} else {
				timeJSX = <div>Time's up! Game over! Your score: {score}</div>
			}
		}
	}


	var inputJSX = "";
	if (word !== null && word !== "") {
		if (timeLeft > 0) {
			inputJSX = <input id="wordtwist-input" type="text" value={wordToTry} onChange={event => setWordToTry(event.target.value)} onKeyPress={event => handleKeyPress(event)}/>
		}
	}
	

	var nextRoundJSX = "";
	if ((timeLeft <= 0 || answers.length >= correctAnswers.length) && roundSuccessful) {
		nextRoundJSX = <button onClick={() => dispatch(nextRound())}>Next round</button>
	}

	const answerList = correctAnswers.slice().sort((a, b) => a.length - b.length).map((answer) => {
		if (answers.indexOf(answer) >= 0) {
			return <div className={styles.answer}>{answer}</div>
		} else {
			if (timeLeft > 0) {
				var underscores = "";
				for (var i = 0; i < answer.length; i++) {
					underscores += "_ ";
				}
				return <div className={styles.answer}>{underscores}</div>;
			} else {
				return <div className={styles.failedanswer}>{answer}</div>;
			}
		}
	});

	return (
		<div>
			<button id="wordtwist-newgame" onClick={() => dispatch(newGame())}>
				New game
			</button>
			<div id={styles.word}>
				{wordLetters}
			</div>
			{scoreJSX}
			{timeJSX}
			<div id="wordtwist-message">
				{message}
			</div>
			{inputJSX}
			{nextRoundJSX}
			<div id={styles.answerlist}>
				{answerList}
			</div>
		</div>
  );
}
