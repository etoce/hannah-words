let wordList = [];
let xhttp = new XMLHttpRequest();
export const getDictionary = function () {
	//console.log(xhttp.status);
	if (wordList.length > 0 && xhttp.status === 200) {
		return wordList;
	} else {
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				wordList = xhttp.responseText.split("\n").map((currentValue) => currentValue.trim());
				//console.log(xhttp.responseText.length);
			}
		}
		xhttp.open("GET", "data/sowpods.txt", true);
		xhttp.send();
		/*wordList = xhttp.responseText.split("\n").map((currentValue) => {
			return currentValue.trim();
		});*/
		//console.log(xhttp.responseText);
		//console.log(wordList.length + " words have been loaded.");

		return wordList;
	}
}

let wordListByLength = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
export const getNLetterDictionary = function (n) {
	if (wordListByLength[n].length > 0) {
		return wordListByLength[n];
	} else {
		const nDic = wordList.filter(word => word.length === n);
		wordListByLength[n] = nDic;
		return nDic;
	}
}



