const slugifyString = (str) => {
	const slug = str
		.normalize("NFD")
		.replace(/([\u0300-\u036f]|[^0-9a-zA-Z -])/g, "")
		.replace(/ +|-+/gi, "-")
		.replace(/(^[^\w]+|[^\w]+$)/, "")
		.trim()
		.toLowerCase();
	return slug;
};

export default slugifyString;
