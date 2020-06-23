export const pickOne = function(array) {
	if (array.length === 0) {
		return null;
	} else {
		return array[Math.floor(Math.random() * array.length)];
	}
}