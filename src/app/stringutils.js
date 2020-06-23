export const containsLettersOf = function (word, letters) {
	if (word === null || word.length === 0) {
		return false;
	}
	var workingWord = word;
	for (var i = 0; i < letters.length; i++) {
		var index = workingWord.indexOf(letters.charAt(i));
		if (index === -1) {
			return false;
		} else {
			workingWord = workingWord.replace(letters.charAt(i), "");
		}
	}
	return true;
}

export const shuffleString = function (word) {
	if (word === null) {
		return "";
	}
	var shuffled = "";
	var workingWord = word;
	for (var i = 0; i < word.length; i++) {
		const index = Math.floor(Math.random() * workingWord.length);
		shuffled = shuffled.concat(workingWord.charAt(index));
		workingWord = workingWord.replace(workingWord.charAt(index), "");
	}
	return shuffled;
}

export const allWordsContainedIn = function (word, dictionary, minLength) {
	var contained = [];
	for (var i = 0; i < dictionary.length; i++) {
		const candidate = dictionary[i];
		if (candidate.length >= minLength && containsLettersOf(word, candidate)) {
			contained.push(candidate);
		}
	}
	return contained;
}