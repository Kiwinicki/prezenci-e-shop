/**
 * @param  {string}
 * @returns {Array}
 */
const generateSearchKeywords = (str) => {
	const whitespacesAndcommas = /\s|,/;

	const wordsArr = str
		.toLowerCase()
		.split(whitespacesAndcommas)
		.filter((el) => el.length > 1);

	const keywordsArr = wordsArr.map((word) => {
		const keywordsFromOneWord = [];
		// loop starts from 2 because i don't need 1 char strings
		for (let i = 2; i <= word.length; i++) {
			keywordsFromOneWord.push(word.slice(0, i));
		}
		return keywordsFromOneWord;
	});

	const uniqueKeywordsArr = [...new Set(...keywordsArr)];

	return uniqueKeywordsArr;
};

export default generateSearchKeywords;
