/**
 * @param  {string}
 * @returns {Array}
 */
const generateSearchKeywords = (str) => {
	const wordsArr = str
		.toLowerCase()
		.split(/\s|,/)
		.filter((el) => el.length > 1);

	const keywordsArr = [];

	wordsArr.forEach((word) => {
		// for loop starts from 2 because i don't need 1 char strings
		for (let i = 2; i <= word.length; i++) {
			keywordsArr.push(word.slice(0, i));
		}
	});

	const uniqeKeywordsArr = [...new Set(keywordsArr)];

	return uniqeKeywordsArr;
};

export default generateSearchKeywords;
