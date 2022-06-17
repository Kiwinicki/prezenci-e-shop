const slugifyString = (str) => {
	const accentsAndDiacriticsRegex = /([\u0300-\u036f]|[^0-9a-zA-Z -])/g;
	const whitespacesRegex = /\s+/gi;
	const notWordCharOnStartOrEndRegex = /(^[^\w]+|[^\w]+$)/;

	const slug = str
		.normalize("NFD")
		.replace(accentsAndDiacriticsRegex, "")
		.replace(whitespacesRegex, "-")
		.replace(notWordCharOnStartOrEndRegex, "")
		.trim()
		.toLowerCase();
	return slug;
};

export default slugifyString;
